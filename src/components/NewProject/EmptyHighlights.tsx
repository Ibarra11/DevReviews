import Image from "next/image";

export default function EmptyHighlights({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <div className="relative flex gap-8 items-center justify-center">
      <Image
        aria-hidden="true"
        alt=""
        src={"/empty_highlight.svg"}
        width={400}
        height={400}
      />
      <div>
        <p className="text-lg font-bold mb-1">Nothing to see for now</p>
        <p className="mb-4 text-base">
          Add some interesting highlights of your project
        </p>
        <button onClick={handleClick} className="bg-gray-300 py-2 px-6 rounded">
          Add Highlight
        </button>
      </div>
    </div>
  );
}
