"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export function DoctorProfileCreateOrEditModal() {
  return (
    <Modal>
      <Button variant="secondary">You Need to Create a Profile</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="w-full" >
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Create Your Profile</Modal.Heading>
              
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField
                    className="w-full"
                    name="name"
                    type="text"
                    variant="secondary"
                  >
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="email"
                    type="email"
                    variant="secondary"
                  >
                    <Label>Email</Label>
                    <Input placeholder="Enter your email" />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="phone"
                    type="tel"
                    variant="secondary"
                  >
                    <Label>Phone</Label>
                    <Input placeholder="Enter your phone number" />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="company"
                    variant="secondary"
                  >
                    <Label>Company</Label>
                    <Input placeholder="Enter your company name" />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="message"
                    variant="secondary"
                  >
                    <Label>Message</Label>
                    <Input placeholder="Enter your message" />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close">Send Message</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
