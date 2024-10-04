import PageNavbar from "@/components/PageNavbar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageNavbar />
      {children}
    </>
  );
}
