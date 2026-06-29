
import Navbar from "@/components/navbar/Navbar";
import { getUserSession } from "@/lib/core/session";


export default async function MainLayout({ children }) {
  const user = await getUserSession();
  
  return (
    <>
      {/* // show navbar in signup and signin page */}
      <Navbar/>
      <main className="flex-1">{children}</main>
      {/* //  show Footer in signup and signin page */}
      {/* <Footer /> */}
    </>
  );
}
