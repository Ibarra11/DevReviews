"use server";
import "server-only";
import { getUser } from "@/lib/auth";
import { CreateProject, Project } from "@/types";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

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
  console.log(media);
  console.log(highlights);
  project.media = media;
  project.highlights = highlights;

  return project;
}
