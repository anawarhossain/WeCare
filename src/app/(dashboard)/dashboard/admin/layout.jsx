import { requireRole } from "@/lib/core/session";
import React from "react";

const PatientLayout = async ({ children }) => {
  await requireRole("admin");
  return children;
};

export default PatientLayout;
