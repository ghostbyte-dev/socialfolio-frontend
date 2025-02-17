export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      {children}
    </div>
  );
}
