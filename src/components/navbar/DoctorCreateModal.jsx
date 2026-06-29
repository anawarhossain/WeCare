"use client";

import { useState } from "react";
import { Modal, Button, Surface } from "@heroui/react";
import { useRouter } from "next/navigation";
import { createDoctor } from "@/lib/actions/doctors";
import DoctorForm from "../dashboard/doctor/profile-manage/DoctorForm";

const EMPTY_FORM = {
  specialization: "",
  specializationsInput: "",
  awardsInput: "",
  qualifications: "",
  experience: "",
  consultationFee: "",
  hospitalName: "",
  bio: "",
};

export default function DoctorCreateModal({ open, setOpen, userId }) {
    
  const router = useRouter();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = {
        ...formData,
        specializations: formData.specializationsInput
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),

        awards: formData.awardsInput
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),

        verificationStatus: "Pending",
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      delete payload.specializationsInput;
      delete payload.awardsInput;

      await createDoctor(payload);

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
            <Modal.Header>
              <Modal.Heading>Create Professional Profile</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <DoctorForm formData={formData} onChange={handleChange} />
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary"
              >
                {loading ? "Creating..." : "Create Profile"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
