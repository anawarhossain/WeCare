"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Surface } from "@heroui/react";
import { createDoctor } from "@/lib/actions/doctors";
import DoctorForm from "@/components/dashboard/doctor/profile-manage/DoctorForm";

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

export default function CreateDoctorProfilePage({ searchParams }) {
  const router = useRouter();

  // 2. use() হুক দিয়ে searchParams Promise-টি আনর‍্যাপ করুন
  const resolvedSearchParams = use(searchParams);
  const userId = resolvedSearchParams?.userId;

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      // সফলভাবে অ্যাকাউন্ট বা প্রোফাইল তৈরি হলে ড্যাশবোর্ডে ব্যাক করবে
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-(--text-primary)">
          Create Professional Profile
        </h1>
        <p className="text-sm text-(--text-muted)">
          Please fill up the form to activate your professional profile.
        </p>
      </div>

      <Surface
        variant="default"
        className="p-6 rounded-2xl border border-(--border-default)"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <DoctorForm formData={formData} onChange={handleChange} />

          <div className="flex justify-end gap-3 pt-4 border-t border-(--border-default)">
            <Button
              variant="secondary"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Creating..." : "Create Profile"}
            </Button>
          </div>
        </form>
      </Surface>
    </div>
  );
}
