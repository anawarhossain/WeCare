"use client";

import { useState, useRef } from "react";
import DoctorHero from "./DoctorHero";
import AboutTab from "./AboutTab";
import BookingTab from "./BookingTab";
import ReviewsTab from "./ReviewsTab";
import BookingSidebar from "./BookingSidebar";
import BookingModal from "./BookingModal";
import { createCheckoutSession } from "@/app/actions/stripe";

const TABS = [
  { id: "about", label: "About" },
  { id: "booking", label: "Available Slots" },
  { id: "reviews", label: "Reviews" },
];

export default function DoctorDetailsClient({ doctor }) {
  const [activeTab, setActiveTab] = useState("about");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const tabSectionRef = useRef(null);

  const switchTab = (tabId) => setActiveTab(tabId);

  const handleBookClick = () => {
    switchTab("booking");
    setTimeout(() => {
      tabSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleConfirmBooking = async () => {
    const bookingPayload = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      hospitalName: doctor.hospitalName,
      slotId: selectedSlot.slotId,
      appointmentDate: selectedSlot.date,
      time: selectedSlot.time,
      fee: doctor.consultationFee,
    };

    try {
      setLoading(true);
      // ১. স্ট্রাইপ পেমেন্ট সেশন তৈরি করা
      const { url } = await createCheckoutSession(bookingPayload);

      if (url) {
        // ২. স্ট্রাইপ পেমেন্ট চেকআউট পেজে রিডাইরেক্ট করা
        window.location.href = url;
      }
      setShowModal(false);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong with the payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DoctorHero doctor={doctor} onBookClick={handleBookClick} />

      {/* Tabs Nav */}
      <div
        className="mb-6 flex border-b gap-8"
        style={{ borderColor: "var(--border-default)" }}
        ref={tabSectionRef}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className="pb-3 text-lg font-medium transition-all relative"
              style={{
                color: isActive ? "var(--color-primary)" : "var(--text-muted)",
                fontWeight: isActive ? 600 : 500,
                borderBottom: isActive
                  ? "2px solid var(--color-primary)"
                  : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Tab Content */}
        <div className="lg:col-span-8">
          {activeTab === "about" && <AboutTab doctor={doctor} />}
          {activeTab === "booking" && (
            <BookingTab
              docSlots={doctor.slots}
              onSlotSelect={setSelectedSlot}
            />
          )}
          {activeTab === "reviews" && <ReviewsTab reviews={doctor.reviews} />}
        </div>

        {/* Right: Sticky Sidebar */}
        <div className="lg:col-span-4">
          <BookingSidebar
            doctor={doctor}
            selectedSlot={selectedSlot}
            onConfirm={() => setShowModal(true)}
          />
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && (
        <BookingModal
          doctor={doctor}
          selectedSlot={selectedSlot}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmBooking}
          loading={loading}
        />
      )}
    </>
  );
}
