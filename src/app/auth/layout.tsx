import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-5xl mx-auto py-20">
      <div className="flex h-[700px]">
        <div className="flex-1 flex flex-col justify-center items-center space-y-8 bg-blue-400 p-4 rounded-l-md">
          <div className="space-y-2 text-white text-center">
            <h1 className="text-4xl font-bold">DevReviews</h1>
            <p className="text-base">
              Your Go-To Platform for Project Enhancement!
            </p>
          </div>
          <Image
            width={400}
            height={400}
            aria-hidden="true"
            src={"/learning.svg"}
            alt=""
          />
        </div>
        <div className="flex items-center bg-white  flex-1  py-4 px-8 rounded-r-md">
          {children}
        </div>
      </div>
    </main>
  );
}
