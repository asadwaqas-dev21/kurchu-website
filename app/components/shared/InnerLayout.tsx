/**
 * Inner-page layout wrapper.
 * Shares the same Header/Footer as the homepage.
 */
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
