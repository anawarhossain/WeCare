// lib/doctors.js
// Replace this with your actual API/DB calls

const MOCK_DOCTORS = [
  {
    id: "1",
    name: "Dr. James Wilson",
    specialization: "Senior Cardiologist",
    hospital: "St. Mary's General Hospital",
    experience: 15,
    fee: 120,
    rating: 4.9,
    availableToday: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1oINXuPDxX27WefSK9tNaGMbE5z3EYM3uhLr7rbkQKlYXDaipFo2tvYB_sSwQNhjTjuShDOnI8gX_hKn2qFiPVnG768ZaIfXOo8WoihAFIJqwK894UgmcgUsgTzRPq0vlV1nsGNonBHBrds_QIhwoyp7BmH1bjRwoHHdGAtJ359ETBbMIAanoZTnYSnGf13a87zhhuQP4deYHTvRr5ptCKaKOvpRvkrseP0aUkK8A_RQ2LHKj3NANH8-qAIZsA-zPszyc4S3A0Bg",
  },
  {
    id: "2",
    name: "Dr. Elena Rodriguez",
    specialization: "Pediatric Specialist",
    hospital: "City Children's Clinic",
    experience: 8,
    fee: 95,
    rating: 4.8,
    availableToday: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6OL5ZLq78y2yy4CB1LcEwj23REB8EcwcbVNkwI9m4SESekqq3Q5sehy27Ap4Aq5uobtA-vxrjdvf2j4hHyBUS1q_53lpPSHlRl7CbzCi4Bi3IU-cXt0X9r6Bxnu1B4mi3V_ykvRCSeunP3Ps611dkpPBTaWdYaBn7XU-MGXoAP-qDSMNJSehFbywZ6cHj5iKr9FPxIqPe3pmcnMIUiRjI8dt8tosxjfvros9ucnMENfCWNw7rDcYsLXEHuP3HfpkQbtWcysPjNVE",
  },
  {
    id: "3",
    name: "Dr. Michael Chen",
    specialization: "Dermatologist",
    hospital: "Skin & Laser Center",
    experience: 12,
    fee: 150,
    rating: 5.0,
    availableToday: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzdZU-eqTMGvWxsiW04sIseJkFEzVRwLTvS_K5s7zJe8emYD26XoktMJkxMl1FzjQ0hipnpB0K33NNpHN1vM7KLrRgqAKyqf2hPTSCES403hAUandh3uz-K1XC7hPOM4FPg6RHuTnPXvhUW4bLORs-u_gIDBVpa1ZaZO5Et-8vMLw-vveWk0pk4enWBySTvJwXKK0FGWsMy5zXTlMZhtwlNS_yaTxrcMKlJ6xdAJ7gZHvpM3HLodx7qH_GqcgtDHHS7iCTgj1b0a0",
  },
  {
    id: "4",
    name: "Dr. Aisha Patel",
    specialization: "Neurologist",
    hospital: "NeuroHealth Institute",
    experience: 18,
    fee: 180,
    rating: 4.7,
    availableToday: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6OL5ZLq78y2yy4CB1LcEwj23REB8EcwcbVNkwI9m4SESekqq3Q5sehy27Ap4Aq5uobtA-vxrjdvf2j4hHyBUS1q_53lpPSHlRl7CbzCi4Bi3IU-cXt0X9r6Bxnu1B4mi3V_ykvRCSeunP3Ps611dkpPBTaWdYaBn7XU-MGXoAP-qDSMNJSehFbywZ6cHj5iKr9FPxIqPe3pmcnMIUiRjI8dt8tosxjfvros9ucnMENfCWNw7rDcYsLXEHuP3HfpkQbtWcysPjNVE",
  },
  {
    id: "5",
    name: "Dr. Robert Kim",
    specialization: "Orthopedics Surgeon",
    hospital: "BoneJoint Medical Center",
    experience: 20,
    fee: 200,
    rating: 4.6,
    availableToday: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1oINXuPDxX27WefSK9tNaGMbE5z3EYM3uhLr7rbkQKlYXDaipFo2tvYB_sSwQNhjTjuShDOnI8gX_hKn2qFiPVnG768ZaIfXOo8WoihAFIJqwK894UgmcgUsgTzRPq0vlV1nsGNonBHBrds_QIhwoyp7BmH1bjRwoHHdGAtJ359ETBbMIAanoZTnYSnGf13a87zhhuQP4deYHTvRr5ptCKaKOvpRvkrseP0aUkK8A_RQ2LHKj3NANH8-qAIZsA-zPszyc4S3A0Bg",
  },
  {
    id: "6",
    name: "Dr. Fatima Hassan",
    specialization: "Gynecologist",
    hospital: "Women's Health Clinic",
    experience: 11,
    fee: 110,
    rating: 4.9,
    availableToday: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6OL5ZLq78y2yy4CB1LcEwj23REB8EcwcbVNkwI9m4SESekqq3Q5sehy27Ap4Aq5uobtA-vxrjdvf2j4hHyBUS1q_53lpPSHlRl7CbzCi4Bi3IU-cXt0X9r6Bxnu1B4mi3V_ykvRCSeunP3Ps611dkpPBTaWdYaBn7XU-MGXoAP-qDSMNJSehFbywZ6cHj5iKr9FPxIqPe3pmcnMIUiRjI8dt8tosxjfvros9ucnMENfCWNw7rDcYsLXEHuP3HfpkQbtWcysPjNVE",
  },
  {
    id: "7",
    name: "Dr. Samuel Osei",
    specialization: "Cardiologist",
    hospital: "Heart Care Hospital",
    experience: 9,
    fee: 135,
    rating: 4.5,
    availableToday: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1oINXuPDxX27WefSK9tNaGMbE5z3EYM3uhLr7rbkQKlYXDaipFo2tvYB_sSwQNhjTjuShDOnI8gX_hKn2qFiPVnG768ZaIfXOo8WoihAFIJqwK894UgmcgUsgTzRPq0vlV1nsGNonBHBrds_QIhwoyp7BmH1bjRwoHHdGAtJ359ETBbMIAanoZTnYSnGf13a87zhhuQP4deYHTvRr5ptCKaKOvpRvkrseP0aUkK8A_RQ2LHKj3NANH8-qAIZsA-zPszyc4S3A0Bg",
  },
  {
    id: "8",
    name: "Dr. Laura Bennett",
    specialization: "Psychiatry Specialist",
    hospital: "MindBridge Wellness",
    experience: 14,
    fee: 160,
    rating: 4.8,
    availableToday: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6OL5ZLq78y2yy4CB1LcEwj23REB8EcwcbVNkwI9m4SESekqq3Q5sehy27Ap4Aq5uobtA-vxrjdvf2j4hHyBUS1q_53lpPSHlRl7CbzCi4Bi3IU-cXt0X9r6Bxnu1B4mi3V_ykvRCSeunP3Ps611dkpPBTaWdYaBn7XU-MGXoAP-qDSMNJSehFbywZ6cHj5iKr9FPxIqPe3pmcnMIUiRjI8dt8tosxjfvros9ucnMENfCWNw7rDcYsLXEHuP3HfpkQbtWcysPjNVE",
  },
];

/**
 * Fetches doctors from the server.
 * In production: replace with your DB query or API call.
 */
export async function getDoctors() {
  // Example real API call:
  // const res = await fetch(`${process.env.API_BASE_URL}/doctors`, { cache: "no-store" });
  // return res.json();
  return MOCK_DOCTORS;
}





// doctor details
// lib/doctors.js
// Replace getDoctorById() with your real DB/API call

const MOCK_DOCTORS_DETAIL = [
  {
    id: "1",
    name: "Dr. James Wilson",
    specialization: "Senior Cardiologist",
    hospital: "St. Mary's General Hospital",
    experience: 15,
    fee: 120,
    rating: 4.9,
    reviewCount: 124,
    qualifications: "MD, FACC, Cardiology Spec.",
    availableToday: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5G3rWsOQ3yDqJEeXdRjuaykEOKYCL6yFCYp0egKjpIAnbt0v41Ld4kfpFuxItbcd1dfBHejiwCb1uPBqHNLrEa-3qi1fONhoAZseTugmezjAcSPDA4Mq6h0qbTnoKw3FCqWI1o7O3DGmMZ4D-rYFJwplA30kRMk-7vdTDs553hq41gZJpk5p9LRUs5M1j3qJSX_N_QmJPVQkJkKpLiZvPrH6dmuKWHAJlTprXseXaaKDx2L6fw1LxCg3-yv6eHUWTMuRfJCqOXDg",
    bio: [
      "Dr. James Wilson is a world-renowned Senior Cardiologist at St. Mary's General Hospital with over 15 years of dedicated experience in clinical cardiology and interventional procedures. His expertise lies in preventative cardiology, heart failure management, and advanced diagnostic imaging.",
      "A graduate of Johns Hopkins University School of Medicine, Dr. Wilson completed his residency and fellowship at the Mayo Clinic. He is a Fellow of the American College of Cardiology (FACC) and has published over 40 research papers on cardiovascular health.",
      "Patients appreciate Dr. Wilson for his meticulous approach to care and his ability to explain complex conditions in an understandable manner. He believes in a holistic approach to heart health, integrating lifestyle modifications with the latest medical advancements.",
    ],
    specializations: [
      "Interventional Cardiology",
      "Preventive Medicine",
      "Heart Valve Disease",
    ],
    awards: [
      "Best Cardiologist 2022",
      "Research Excellence Award",
      "Healthcare Innovation Prize",
    ],
    slots: {
      morning: ["09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM"],
      afternoon: ["02:00 PM", "02:45 PM", "03:30 PM", "04:15 PM"],
    },
    reviews: [
      {
        id: "r1",
        name: "Robert Harrison",
        date: "October 12, 2024",
        rating: 5,
        comment:
          "Dr. Wilson is absolutely fantastic. He took the time to listen to all my concerns and explained my treatment plan in great detail. I've never felt so comfortable with a cardiologist before. The clinic staff were also very professional.",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBJkLsA3uoMpbnekcUMKaC9akn10L45xnEWDTBNCOjW4wpgTPONa0qm3DIfR1ocFYOF8xtJnBuWVJlUnDY1KD8UMroWxqz3YRsdLN2deH3GS65N5T1q_RVx9y_yrgTwdZi4B_WrW4pCBGlct0yKP3XZsq9Q3rQAVEnX5dTQuqzWGvEnCrWY35VBjHVZIrdJ3Y-kr5ucCExv-TPA8_rSIyjOPUqRA9Qz0fDLrm6y2xta3WbvHARjQwkKwTgBZEhpJViF7MtFdNKKQmk",
      },
      {
        id: "r2",
        name: "Sarah Mitchell",
        date: "September 28, 2024",
        rating: 4,
        comment:
          "Great experience. Very knowledgeable and thorough. The only reason for 4 stars is that I had to wait about 15 minutes past my appointment time, but once I was in, Dr. Wilson gave me his undivided attention.",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDnP7atwIYyHyzCPbI1ADCR7fxvzJnsiXcpuMVGRxPHtf43i29VIMZmkYqiJMCoPfiuV8mm2VIMZmkYqiJMCoPfiuV8mm2VIMZmkYqiJMCoPfiuV8mm2VqiJMCoPfiuV8mm2V",
      },
    ],
  },
];

export async function getDoctorById(id) {
  // In production, replace with:
  // const res = await fetch(`${process.env.API_BASE_URL}/doctors/${id}`, { cache: "no-store" });
  // if (!res.ok) return null;
  // return res.json();
  return MOCK_DOCTORS_DETAIL.find((d) => d.id === id) ?? null;
}

export async function getAllDoctorIds() {
  return MOCK_DOCTORS_DETAIL.map((d) => ({ id: d.id }));
}

