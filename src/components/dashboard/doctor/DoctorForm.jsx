"use client";

import { TextField, Label, Input, TextArea, TextAreaRoot } from "@heroui/react";

const fields = [
  {
    name: "specialization",
    label: "Specialization",
    placeholder: "e.g. Cardiologist",
  },
  {
    name: "qualifications",
    label: "Qualifications",
    placeholder: "e.g. MBBS, MD",
  },
  {
    name: "experience",
    label: "Experience (Years)",
    placeholder: "e.g. 10",
    type: "number",
  },
  {
    name: "consultationFee",
    label: "Consultation Fee",
    placeholder: "e.g. 1000 BDT",
  },
];

export default function DoctorForm({ formData, onChange }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ name, label, placeholder, type }) => (
          <TextField
            key={name}
            className="w-full"
            name={name}
            variant="secondary"
            type={type}
          >
            <Label>{label}</Label>
            <Input
              value={String(formData[name] || "")}
              onChange={onChange}
              placeholder={placeholder}
            />
          </TextField>
        ))}
      </div>

      <TextField className="w-full" name="hospitalName" variant="secondary">
        <Label>Hospital / Chamber</Label>
        <Input
          value={formData.hospitalName || ""}
          onChange={onChange}
          placeholder="e.g. Dhaka Medical College & Hospital"
        />
      </TextField>

      {/* ✨ প্রফেশনাল বায়ো সেকশন (টাইপ করলে বড় হবে + টেনে বড় করা যাবে) */}
      <div className="w-full flex flex-col gap-1">
        <label
          className="text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Professional Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio || ""}
          onChange={onChange}
          placeholder="Tell patients about your medical background, expertise, or philosophy of care..."
          rows={4} // শুরুতে ৪ লাইনের সাইজ থাকবে
          className="w-full mt-1 p-3 rounded-xl border text-sm transition-all outline-none
               resize-y min-h-40 max-h-100
               bg-transparent text-(--text-primary) border-(--border-default)
               focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary)"
        />
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField className="w-full" name="availableDays" variant="secondary">
          <Label>Available Days</Label>
          <Input
            value={formData.availableDays || ""}
            onChange={onChange}
            placeholder="e.g. Sat, Mon, Wed"
          />
        </TextField>

        <TextField className="w-full" name="availableSlots" variant="secondary">
          <Label>Available Slots</Label>
          <Input
            value={formData.availableSlots || ""}
            onChange={onChange}
            placeholder="e.g. 04:00 PM - 08:00 PM"
          />
        </TextField>
      </div> */}
    </div>
  );
}
