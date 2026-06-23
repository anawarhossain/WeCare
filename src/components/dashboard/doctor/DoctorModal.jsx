"use client";

import { useState } from "react";
import { Modal, Button, Surface } from "@heroui/react";
import DoctorForm from "./DoctorForm";
import { createDoctor, updateDoctor } from "@/lib/actions/doctors";
import { useRouter } from "next/navigation";

// ফর্ম হ্যান্ডেল করার জন্য টেম্পোরারি স্ট্রিং
const EMPTY_FORM = {
  specialization: "",
  specializationsInput: "",
  awardsInput: "",
  qualifications: "",
  experience: "",
  consultationFee: "",
  hospitalName: "",
  bio: "",
  createdAt: "",
  updatedAt: "",
};

export default function DoctorModal({ doctorData, userId, onSave }) {
  const isEditMode = !!doctorData;
  const router = useRouter();

  // ডাটাবেজের Array ডেটাকে ফর্মে দেখানোর জন্য Comma-separated String-এ রূপান্তর করার ফাংশন
  const formatInitialData = (data) => {
    if (!data) return EMPTY_FORM;
    return {
      ...data,
      specializationsInput: data.specializations
        ? data.specializations.join(", ")
        : "",
      awardsInput: data.awards ? data.awards.join(", ") : "",
    };
  };

  const [formData, setFormData] = useState(() => formatInitialData(doctorData));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" ? (value ? Number(value) : "") : value,
    }));
  };

  const handleOpenModal = () => {
    // Reset form to latest doctorData (or empty) each time the modal opens
    setFormData(formatInitialData(doctorData));
  };

  const handleSubmit = async () => {
    // সাবমিট করার আগে Comma-separated String-কে ট্রিম (trim) করে Array-তে রূপান্তর
    const finalSpecializations = formData.specializationsInput
      ? formData.specializationsInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    const finalAwards = formData.awardsInput
      ? formData.awardsInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    // ডাটাবেজে পাঠানোর জন্য অবজেক্ট তৈরি (ইনপুট ফিল্ডের লোকাল স্টেট বাদ দিয়ে)
    const { specializationsInput, awardsInput, ...cleanFormData } = formData;

    const payload = {
      ...cleanFormData,
      specializations: finalSpecializations,
      awards: finalAwards,
    };

    onSave(payload, isEditMode);

    try {
      if (isEditMode) {
        await updateDoctor(payload._id, {
          ...payload,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await createDoctor({
          ...payload,
          verificationStatus: "Pending",
          userId: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Failed to save doctor profile:", error);
    } finally {
      router.refresh();
    }
  };;

  return (
    <Modal>
      <Button
        onClick={handleOpenModal}
        className="btn-primary flex items-center gap-2 cursor-pointer"
      >
        {isEditMode ? (
          <>
            <EditIcon />
            Edit Profile
          </>
        ) : (
          <>
            <PlusIcon />
            Create Profile
          </>
        )}
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-xl font-semibold">
                {isEditMode
                  ? "Edit Professional Details"
                  : "Create Professional Profile"}
              </Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-(--text-secondary)">
                {isEditMode
                  ? "Update your professional profile information below."
                  : "Fill in the form to set up your professional profile."}
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <DoctorForm formData={formData} onChange={handleChange} />
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button
                slot="close"
                variant="secondary"
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                slot="close"
                onClick={handleSubmit}
                className="btn-primary cursor-pointer"
              >
                {isEditMode ? "Save Changes" : "Create Profile"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

// Extracted SVG icons for readability
function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
