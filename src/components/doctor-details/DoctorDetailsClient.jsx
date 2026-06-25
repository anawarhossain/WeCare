"use client";

import { useState, useRef } from "react";
import DoctorHero from "./DoctorHero";
import AboutTab from "./AboutTab";
import BookingTab from "./BookingTab";
import ReviewsTab from "./ReviewsTab";
import BookingSidebar from "./BookingSidebar";
import BookingModal from "./BookingModal";

const TABS = [
  { id: "about", label: "About" },
  { id: "booking", label: "Available Slots" },
  { id: "reviews", label: "Reviews" },
];

export default function DoctorDetailsClient({ doctor }) {
  const [activeTab, setActiveTab] = useState("about");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const tabSectionRef = useRef(null);

  const switchTab = (tabId) => setActiveTab(tabId);

  const handleBookClick = () => {
    switchTab("booking");
    setTimeout(() => {
      tabSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleConfirmPay = () => {
    // Navigate to payment page or handle payment flow
    // router.push(`/payment?doctorId=${doctor.id}&...`);
    alert("Redirecting to payment... (wire up your payment flow here)");
    setShowModal(false);
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
          onConfirm={handleConfirmPay}
        />
      )}
    </>
  );
}
