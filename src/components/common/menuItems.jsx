import { LuLayoutDashboard } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import {
  MdOutlinePayments,
  MdOutlinePendingActions,
  MdOutlineReviews,
} from "react-icons/md";
import { FaFilePrescription } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export const patientMenuItems = [
  {
    label: "Dahsboard",
    href: "/dashboard/patient",
    icon: <LuLayoutDashboard />,
  },
  {
    label: "My Profile",
    href: "/dashboard/patient/profile",
    icon: <CgProfile />,
  },
  {
    label: "My Appointments",
    href: "/dashboard/patient/appointments",
    icon: <SlCalender />,
  },
  {
    label: "Payments History",
    href: "/dashboard/patient/payments",
    icon: <MdOutlinePayments />,
  },
  {
    label: "My Reviews",
    href: "/dashboard/patient/reviews",
    icon: <MdOutlineReviews />,
  },
];

export const doctorMenuItems = [
  {
    label: "Dashboard",
    href: "/dashboard/doctor",
    icon: <LuLayoutDashboard />,
  },
  {
    label: "Manage Schedule",
    href: "/dashboard/doctor/schedule",
    icon: <SlCalender />,
  },
  {
    label: "Appointment Requests",
    href: "/dashboard/doctor/appointment",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Prescriptions Management",
    href: "/dashboard/doctor/prescriptions",
    icon: <FaFilePrescription />,
  },
  {
    label: "Profile Management",
    href: "/dashboard/doctor/profile",
    icon: <CgProfile />,
  },
];
