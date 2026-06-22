"use client";

import { TextField, Label, Input } from "@heroui/react";

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

      <TextField className="w-full" name="bio" variant="secondary">
        <Label>Professional Bio</Label>
        <Input
          value={formData.bio || ""}
          onChange={onChange}
          placeholder="Write something about yourself..."
        />
      </TextField>

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
