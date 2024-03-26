export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-6xl w-full mx-auto">{children}</div>;
}
