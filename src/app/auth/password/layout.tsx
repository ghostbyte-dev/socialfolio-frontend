export default function PasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      {children}
    </div>
  );
}
