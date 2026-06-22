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
