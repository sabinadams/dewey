export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 w-2/3 mx-auto pt-10 pb-10">
      {children}
    </div>
  );
}
