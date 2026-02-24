import Footer from "@/components/admin/Footer";
import Navbar from "@/components/admin/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </div>
    </>
  );
}
