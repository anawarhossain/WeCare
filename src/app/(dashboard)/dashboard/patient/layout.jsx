import { requireRole } from "@/lib/core/session";
import React from "react";
export const dynamic = "force-dynamic";

const PatientLayout = async ({ children }) => {
  await requireRole("patient");
  return children;
};

export default PatientLayout;
