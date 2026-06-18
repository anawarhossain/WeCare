
import Navbar from "@/components/navbar/Navbar";


export default function MainLayout({ children }) {
  return (
    <>
      {/* // show navbar in signup and signin page */}
      {/* <Navbar/> */}
      <main className="flex-1">{children}</main>
      {/* //  show Footer in signup and signin page */}
      {/* <Footer /> */}
    </>
  );
}
