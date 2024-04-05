export default function CommunityPage() {
  return (
    <div className="space-y-12">
      <div className="flex-1">
        <h2 className="text-3xl text-gray-800 font-bold">Community</h2>
        <p className="text-sm text-gray-500">Explore other peoples projects</p>
      </div>
      <div className="max-w-2xl w-full mx-auto space-y-6">
        <CommunityProject />
        <CommunityProject />
        <CommunityProject />
        <CommunityProject />
        {/* <div className="block w-[320px] h-[250px] bg-gray-500 rounded"></div> */}
      </div>
    </div>
  );
}

function CommunityProject() {
  return (
    <div className="flex-1 space-y-6 p-4 rounded-lg shadow bg-gray-100">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="size-10 rounded-full bg-gray-500"></div>
          <div>
            <p className="text-sm leading-none font-bold text-gray-700">
              Alan Ibarra
            </p>
            <time className="text-xs leading-none text-gray-400">
              4 Minutes ago
            </time>
          </div>
        </div>
        {/* <button className="p-2 bg-gray-300 text-gray-700">Follow</button> */}
      </div>
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gray-700">Central Valley News</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          assumenda aliquam veritatis distinctio quo officia officiis corrupti
          expedita fuga labore consequuntur veniam magnam nesciunt voluptatum,
          nisi laboriosam ea incidunt maiores dolorum! Minima suscipit quidem
          accusantium molestiae animi corrupti, tempore atque est ullam nulla
          quasi, officia doloremque laboriosam minus. Nobis, libero?
        </p>
        <div className=" h-[400px] w-full rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
