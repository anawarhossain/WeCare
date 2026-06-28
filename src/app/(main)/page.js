// app/page.jsx
// Server Component — fetches public home overview data, composes all sections

import FeaturedDoctorsSection from "@/components/homePage/FeaturedDoctorsSection";
import HeroSection from "@/components/homePage/HeroSection";
import HomeFooter from "@/components/homePage/HomeFooter";
import SpecializationsGrid from "@/components/homePage/SpecializationsGrid";
import StatsSection from "@/components/homePage/StatsSection";
import TestimonialsSection from "@/components/homePage/TestimonialsSection";
import WhyChooseUs from "@/components/homePage/WhyChooseUs";
import { getHomeOverview } from "@/lib/api/home";



export const metadata = {
  title: "WeCare - Healthcare at your fingertips",
  description: "Book appointments with top-rated doctors in minutes.",
};

export default async function Home() {
  const { stats, specializations, featuredDoctors, testimonials } =
    await getHomeOverview();

  return (
    <>
      <HeroSection doctors={featuredDoctors} patientCount={stats.patients} />
      <StatsSection stats={stats} />
      <SpecializationsGrid specializations={specializations} />
      <FeaturedDoctorsSection doctors={featuredDoctors} />
      <WhyChooseUs />
      <TestimonialsSection testimonials={testimonials} />
      <HomeFooter />
    </>
  );
}
