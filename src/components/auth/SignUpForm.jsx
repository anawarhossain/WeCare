"use client";

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

// ── Main component ─────────────────────────────────────────────
export function SignUpForm() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const imageFile = data.image;
    if (!imageFile || imageFile.size === 0) {
      console.error("No file selected");
      return;
    }

    const imageUploadData = await imageUpload(imageFile);

    const profile = {
      ...data,
      image: imageUploadData.url,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log(profile);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Form className="flex  border w-96 flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="name" type="text">
          <Label>Full Name</Label>
          <Input placeholder="John Doe" />
          <FieldError />
        </TextField>

        <TextField isRequired name="email" type="email">
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField isRequired name="phone" type="number">
          <Label>Phone</Label>
          <Input placeholder="+8801xxxxxxxxx" />
          <FieldError />
        </TextField>

        <TextField isRequired minLength={8} name="password" type="password">
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <TextField isRequired name="image" type="file">
          <Label>Profile Picture</Label>
          <input accept="image/*" name="image" type="file" />
          <FieldError />
        </TextField>

        <Select className="w-fit" placeholder="Select one" name="gender">
          <Label>Gender</Label>
          <Select.Trigger>
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
                Famale
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="other" textValue="other">
                Other
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <RadioGroup defaultValue="patient" name="role">
          <Label>Role</Label>
          <div className="flex gap-4">
            <Radio value="patient">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                Patient
              </Radio.Content>
            </Radio>
            <Radio value="doctor">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                Doctor
              </Radio.Content>
            </Radio>
          </div>
        </RadioGroup>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}
