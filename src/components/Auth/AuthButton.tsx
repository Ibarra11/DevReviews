export default function AuthButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="bg-blue-700 text-white py-3 px-4 w-full rounded">
      {children}
    </button>
  );
}
