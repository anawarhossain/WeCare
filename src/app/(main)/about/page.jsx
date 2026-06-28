// app/about/page.jsx
// ✅ Server Component — public page, no auth required

import AboutCTA from "@/components/about-us/AboutCTA";
import AboutHero from "@/components/about-us/AboutHero";
import AboutStats from "@/components/about-us/AboutStats";
import AboutStory from "@/components/about-us/AboutStory";
import AboutTeam from "@/components/about-us/AboutTeam";
import AboutValues from "@/components/about-us/AboutValues";
import { getUserSession } from "@/lib/core/session";



export const metadata = {
  title: "About Us | WeCare",
  description:
    "Learn about WeCare — Bangladesh's trusted healthcare platform connecting patients with verified specialists since 1998.",
};

export default async function AboutPage() {

    const session = await getUserSession();
    console.log(session);

  return (
    <main style={{ backgroundColor: "var(--bg-base)" }}>
      {/* 1. Hero — headline, CTA buttons, floating stat cards */}
      <AboutHero />

      {/* 2. Stats — animated counter (500+ doctors, 50k+ patients…) */}
      <AboutStats />

      {/* 3. Our Story — founding narrative + milestone timeline */}
      <AboutStory />

      {/* 4. Values — 6-card grid (Accessibility, Trust, Innovation…) */}
      <AboutValues />

      {/* 5. Team — 4 leadership cards with hover social links */}
      {/* <AboutTeam /> */}

      {/* 6. CTA Banner — Register Now / Browse Doctors */}
      <AboutCTA session={session} />
    </main>
  );
}
