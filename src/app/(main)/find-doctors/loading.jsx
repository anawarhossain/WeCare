// app/doctors/loading.jsx
// এই ফাইলটা app/doctors/page.jsx-এর ঠিক পাশেই (sibling) রাখতে হবে।
// Next.js নিজেই এটা ব্যবহার করে — import করার বা manually render করার কিছু নেই।

import DoctorsGridSkeleton from "@/components/skeletons/DoctorCardSkeleton";



export default function Loading() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <DoctorsGridSkeleton count={9} />
    </main>
  );
}
