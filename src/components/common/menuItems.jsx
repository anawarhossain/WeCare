import { LuLayoutDashboard } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import {
  MdOutlinePayments,
  MdOutlinePendingActions,
  MdOutlineReviews,
} from "react-icons/md";
import { FaFilePrescription } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiAdminLine, RiUserHeartLine, RiUserStarLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";

export const patientMenuItems = [
  {
    label: "Dashboard",
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

export const adminMenuItems = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: <LuLayoutDashboard />,
  },
  {
    label: "Manage Doctors",
    href: "/dashboard/admin/doctors",
    icon: <RiUserStarLine />,
  },
  {
    label: "Manage Patients",
    href: "/dashboard/admin/patients",
    icon: <RiUserHeartLine />,
  },
  {
    label: "Appointments Overview",
    href: "/dashboard/admin/appointments",
    icon: <SlCalender />,
  },
  {
    label: "Payments Overview",
    href: "/dashboard/admin/payments",
    icon: <MdOutlinePayments />,
  },
  {
    label: "Admin Profile",
    href: "/dashboard/admin/profile",
    icon: <RiAdminLine />,
  },
];
