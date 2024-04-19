"use client";
import React from "react";
import ProjectEditModal from "./ProjectEditModal";

export default function ProjectMedia({
  edit,
  media,
}: {
  edit?: boolean;
  media: any;
}) {
  const [activeMediaId, setActiveMediaId] = React.useState(media[0].id);
  const selectedImg = media.find((m) => m.id === activeMediaId);
  const nonSelectedImages = media.filter((m) => m.id !== activeMediaId);
  return (
    <div className="relative bg-white shadow rounded px-4 pt-12 pb-8 space-y-6">
      <h3 className="text-xl font-semibold ">Media</h3>
      <img
        className="h-[400px] w-full rounded object-cover"
        src={selectedImg}
      />
      <div className="flex  justify-center gap-4">
        {nonSelectedImages.map(({ id, src }) => (
          <img className="size-24 object-cover" key={id} src={src} />
        ))}
      </div>
      {edit && <ProjectEditModal />}
    </div>
  );
}
