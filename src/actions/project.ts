"use server";
import "server-only";
import { getUser } from "@/lib/auth";
import { CreateProject, Project } from "@/types";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { deleteImgFromCloudinary } from "./cloudinary";

export async function createProject({
  projectInfo,
  projectMedia,
  projectHighlights,
}: CreateProject) {
  const user = await getUser();
  if (!user) {
    return redirect("/auth/login");
  }
  const { title, headline, url, github } = projectInfo;
  const project = (await db({
    query: `
      INSERT INTO Project (title, headline, url, github, user_id)
      VALUES(?,?,?,?,?)
    `,
    values: [title, headline, url, github, user.userId],
  })) as any;
  const projectMediaPromise = await Promise.all(
    projectMedia.map(async (media) => {
      await db({
        query: `INSERT INTO Media (src, project_id, user_id)
              VALUES(?,?,?)
              `,
        values: [media, project.insertId, user.userId],
      });
    })
  );

  const projectHighlightsPromise = Promise.all(
    projectHighlights.map(async ({ title, description, media }) => {
      const result = await db({
        query: `INSERT INTO Highlight (title, description, img, project_id, user_id)
            VALUES(?,?,?,?,?)
            `,
        values: [title, description, media, project.insertId, user.userId],
      });
      return result;
    })
  );
  await Promise.all([projectMediaPromise, projectHighlightsPromise]);
  return true;
}

export async function getProjects() {
  const user = await getUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const projects = await db({
    query: `SELECT * FROM Project WHERE user_id=?`,
    values: [user.userId],
  });
  return projects as Project[];
}

// /project/:id
export async function findProject({
  projectId,
  userId,
}: {
  projectId: number;
  userId: number;
}) {
  const [project] = (await db({
    query: `SELECT * FROM Project WHERE id=?`,
    values: [projectId],
  })) as any;
  if (!project) {
    return false;
  }
  if (project.user_id !== userId) {
    return false;
  }
  const mediaQuery = db({
    query: "SELECT id, src FROM Media WHERE project_id=?",
    values: [projectId],
  });
  const highlightsQuery = db({
    query:
      "SELECT id, title, description, img FROM Highlight WHERE project_id=?",
    values: [projectId],
  });

  const [media, highlights] = await Promise.all([mediaQuery, highlightsQuery]);
  project.media = media;
  project.highlights = highlights;

  return project;
}

export async function editProjectInfo(projectId: number, formData: FormData) {
  console.log(projectId);
  const { title, headline } = Object.fromEntries(formData);
  const editProjectInfoQuery = await db({
    query: `UPDATE Project
            SET title=?, headline=?
            WHERE id=?
            `,
    values: [title, headline, projectId],
  });
  console.log(editProjectInfoQuery);
  revalidatePath("/project/settings/[slug]", "page");
}

export async function editProjectSection({
  sectionId,
  projectId,
  media,
  title,
  description,
}: any) {
  const editProjectInfoQuery = await db({
    query: `UPDATE Highlight
            SET img=?, title=?, description=?
            WHERE id=?
            `,
    values: [media, title, description, sectionId],
  });
  console.log(editProjectInfoQuery);
  revalidatePath("/project/settings/[slug]", "page");
}

export async function deleteProjectSection(
  sectionId: number,
  img: string | null
) {
  const deleteProjectSectionQuery = db({
    query: `DELETE FROM Highlight WHERE id=?`,
    values: [sectionId],
  });
  await Promise.all([
    deleteProjectSectionQuery,
    img ? deleteImgFromCloudinary(img) : null,
  ]);
  // console.log(deleteProjectSection);

  revalidatePath("/project/settings/[slug]", "page");
}

export async function createProjectHighlight(
  projectId: number,
  userId: number,
  media: string,
  title: string,
  description: string
) {
  const createProjectHighlightQuery = await db({
    query: `
      INSERT INTO Highlight (title, description, img, project_id, user_id)
      VALUES(?,?,?,?,?)
    `,
    values: [title, description, media, projectId, userId],
  });
  console.log(createProjectHighlightQuery);
  revalidatePath("/project/settings/[slug]", "page");
}
