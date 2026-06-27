"use client";

import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imgUpload";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // লোডিং স্টেট (Best Practice)

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // রিকোয়েস্ট শুরু হলে বাটন ডিজেবল করার জন্য

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const imageFile = userData.image;

    if (!imageFile || imageFile.size === 0) {
      console.error("No file selected");
      setLoading(false);
      return;
    }

    try {
      // ১. ইমেজ আপলোড
      const imageUploadData = await imageUpload(imageFile);

      // ২. সাইন-আপ প্রসেস
      const { data, error } = await authClient.signUp.email({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        image: imageUploadData.url,
        phone: userData.phone,
        role: userData.role,
        gender: userData.gender,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      // ৩. এরর হ্যান্ডেলিং (খুবই গুরুত্বপূর্ণ)
      if (error) {
        alert(error.message); // অথবা কোনো সুন্দর টোস্ট নোটিফিকেশন দেখান
        setLoading(false);
        return;
      }

      // ৪. সফল হলে রিডাইরেক্ট (Best Practice)
      router.push("/");
      router.refresh(); // সেশন আপডেট নিশ্চিত করার জন্য
    } catch (err) {
      console.error("Something went wrong:", err);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 transition-colors duration-200"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* globals.css এর .card ইউটিলিটি ক্লাস ব্যবহার করা হয়েছে */}
      <Form
        className="card w-full max-w-md flex flex-col gap-5 p-8 transition-colors duration-200"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-1 mb-2">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Create Account
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Join WeCare to connect with doctors and health profiles.
          </p>
        </div>

        <TextField isRequired name="name" type="text" className="w-full">
          <Label style={{ color: "var(--text-primary)" }}>Full Name</Label>
          <Input placeholder="John Doe" className="mt-1" />
          <FieldError />
        </TextField>

        <TextField isRequired name="email" type="email" className="w-full">
          <Label style={{ color: "var(--text-primary)" }}>Email</Label>
          <Input placeholder="john@example.com" className="mt-1" />
          <FieldError />
        </TextField>

        <TextField isRequired name="phone" type="number" className="w-full">
          <Label style={{ color: "var(--text-primary)" }}>Phone</Label>
          <Input placeholder="+8801xxxxxxxxx" className="mt-1" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          className="w-full"
        >
          <Label style={{ color: "var(--text-primary)" }}>Password</Label>
          <Input placeholder="Enter your password" className="mt-1" />
          <Description
            className="text-xs mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <TextField isRequired name="image" type="file" className="w-full">
          <Label style={{ color: "var(--text-primary)" }}>
            Profile Picture
          </Label>
          <input
            accept="image/*"
            name="image"
            type="file"
            className="mt-1 block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 dark:file:bg-zinc-800 file:text-zinc-700 dark:file:text-zinc-300 hover:file:opacity-80 transition-all cursor-pointer"
          />
          <FieldError />
        </TextField>

        <Select className="w-full" placeholder="Select one" name="gender">
          <Label style={{ color: "var(--text-primary)" }}>Gender</Label>
          <Select.Trigger className="mt-1 w-full">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="male" textValue="male">
                Male
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="female" textValue="female">
                Female
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="other" textValue="other">
                Other
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <RadioGroup defaultValue="patient" name="role" className="w-full">
          <Label style={{ color: "var(--text-primary)" }}>Role</Label>
          <div className="flex gap-6 mt-2">
            <Radio value="patient">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <span style={{ color: "var(--text-primary)" }}>Patient</span>
              </Radio.Content>
            </Radio>
            <Radio value="doctor">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <span style={{ color: "var(--text-primary)" }}>Doctor</span>
              </Radio.Content>
            </Radio>
          </div>
        </RadioGroup>

        <div className="flex gap-3 mt-4 w-full">
          {/* globals.css এর .btn-primary ইউটিলিটি ক্লাস ব্যবহার করা হয়েছে */}
          <Button
            type="submit"
            isLoading={loading} // 👈 লোডিং স্টেটে স্পিনার দেখাবে
            isDisabled={loading} // 👈 পরপর ক্লিক করা আটকাবে
            className="btn-primary flex-1 flex items-center justify-center gap-2 shadow-lg"
          >
            <Check className="w-4 h-4" />
            Submit
          </Button>
          <Button
            type="reset"
            variant="secondary"
            className="px-5 rounded-xl border text-sm font-medium transition-colors"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-primary)",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            Reset
          </Button>
        </div>

        {/* Footer Link */}
        <p
          className="text-center text-sm mt-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}
