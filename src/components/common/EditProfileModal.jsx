"use client";

import { useState, useRef } from "react";
import { PencilToLine } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { imageUpload } from "@/lib/imgUpload";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// আপনার দেওয়া ইমেজ আপলোড ফাংশনটি এখানে ইম্পোর্ট করুন (পাথ ঠিক করে নিবেন)
// import { imageUpload } from "@/utils/imageUpload";

export default function EditProfileModal({ isOpen, onClose, user }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "male",
  });

  // ইমেজ প্রিভিউ এবং ফাইল হ্যান্ডেল করার স্টেট
  const [imagePreview, setImagePreview] = useState(user?.image || "");
  const [selectedFile, setSelectedFile] = useState(null);

  // ইনপুট চেইঞ্জ হ্যান্ডেলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ইমেজ সিলেক্ট হ্যান্ডেলার (ইনস্ট্যান্ট প্রিভিউ দেখানোর জন্য)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // ক্লায়েন্ট সাইড প্রিভিউ তৈরি করার জন্য URL.createObjectURL ব্যবহার করা হয়েছে
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // প্রিভিউ ইমেজে ক্লিক করলে হিডেন ফাইল ইনপুট ট্রিগার হবে
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // ফর্ম সাবমিট এবং ImgBB আপলোড লজিক
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = user?.image || "";

      // যদি ইউজার নতুন কোনো ছবি সিলেক্ট করে থাকে তবেই ImgBB তে আপলোড হবে
      if (selectedFile) {
        const uploadResponse = await imageUpload(selectedFile);
        if (uploadResponse && uploadResponse.url) {
          finalImageUrl = uploadResponse.url;
        }
      }

      // ফাইনাল অবজেক্ট যা ডাটাবেজে আপডেট হবে
      const updatedProfile = {
        ...formData,
        image: finalImageUrl,
        updatedAt: new Date().toISOString(),
      };

      await authClient.updateUser({
        image: updatedProfile.image,
        name: updatedProfile.name,
        phone: updatedProfile.phone,
      });

      router.refresh();
      // মোডাল ক্লোজ করার আগে ক্লিনআপ
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-white rounded-xl overflow-hidden shadow-xl">
            <Modal.CloseTrigger onClick={onClose} />

            <Modal.Header>
              <Modal.Icon className="bg-teal-50 text-teal-600">
                <PencilToLine className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Update Profile</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-slate-500">
                Click on the avatar to change the profile picture and modify
                your information.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  onSubmit={handleSubmit}
                  id="edit-profile-form"
                  className="flex flex-col gap-5"
                >
                  {/* ইন্টারঅ্যাক্টিভ ইমেজ আপলোডার এবং প্রিভিউ সেকশন */}
                  <div className="flex flex-col items-center justify-center pb-2">
                    <div
                      onClick={triggerFileInput}
                      className="relative w-24 h-24 rounded-full cursor-pointer group border-4 border-teal-100 p-0.5 overflow-hidden shadow-sm"
                      title="Click to change profile picture"
                    >
                      <Image
                        src={imagePreview || "/default-avatar.png"}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-full transition-opacity duration-200 group-hover:opacity-75"
                        fill
                      />

                      {/* হোভার করলে ক্যামেরা ওভারলে দেখাবে */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* হিডেন ফাইল ইনপুট */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <span
                      className="text-xs text-teal-600 font-medium mt-2 hover:underline cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      Change Photo
                    </span>
                  </div>

                  {/* Name Input */}
                  <TextField
                    className="w-full"
                    name="name"
                    type="text"
                    variant="secondary"
                  >
                    <Label className="text-slate-700 font-medium">Name</Label>
                    <Input
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </TextField>

                  {/* Email Input */}
                  {/* <TextField
                    className="w-full"
                    name="email"
                    type="email"
                    variant="secondary"
                  >
                    <Label className="text-slate-700 font-medium">Email</Label>
                    <Input
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </TextField> */}

                  {/* Phone Input */}
                  <TextField
                    className="w-full"
                    name="phone"
                    type="tel"
                    variant="secondary"
                  >
                    <Label className="text-slate-700 font-medium">Phone</Label>
                    <Input
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </TextField>

                  {/* Gender Input */}
                  {/* <TextField
                    className="w-full"
                    name="gender"
                    type="text"
                    variant="secondary"
                  >
                    <Label className="text-slate-700 font-medium">Gender</Label>
                    <Input
                      placeholder="male / female"
                      value={formData.gender}
                      onChange={handleChange}
                    />
                  </TextField> */}
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={onClose} variant="secondary" disabled={loading}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="edit-profile-form"
                className="bg-teal-600 text-white hover:bg-teal-700 font-medium disabled:bg-teal-400"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
