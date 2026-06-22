// ✅ Server Component

import Navbar from "@/components/navbar/Navbar";

// (auth) route group — Navbar ও Footer ছাড়া clean layout
export default function AuthGroupLayout({ children }) {
  return (
    <>
      {/* // show navbar in signup and signin page */}
      <Navbar/>
      <main>{children}</main>
      {/* //  show Footer in signup and signin page */}
    </>
  );
}
