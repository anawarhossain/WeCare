"use client";

import { useState, useRef, useEffect } from "react";
import DoctorHero from "./DoctorHero";
import AboutTab from "./AboutTab";
import BookingTab from "./BookingTab";
import ReviewsTab from "./ReviewsTab";
import BookingSidebar from "./BookingSidebar";
import BookingModal from "./BookingModal";
import { createCheckoutSession } from "@/app/actions/stripe";
import { checkFavoriteStatus } from "@/lib/api/favorites";
import { toggleFavoriteDoctor } from "@/lib/actions/favorites";

const TABS = [
  { id: "about", label: "About" },
  { id: "booking", label: "Available Slots" },
  { id: "reviews", label: "Reviews" },
];

export default function DoctorDetailsClient({
  doctor,
  id,
  reviews,
  currentUser,
}) {
  const [activeTab, setActiveTab] = useState("about");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const tabSectionRef = useRef(null);
  const [notes, setNotes] = useState("");

  const switchTab = (tabId) => setActiveTab(tabId);

  // পেজ লোড হলে ফেভারিট স্ট্যাটাস চেক করার এফেক্ট
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      // ইউজার লগইন করা থাকলে এবং ডাক্তারের আইডি থাকলে চেক করবে
      const userId = currentUser?.id || currentUser?._id;
      if (userId && doctor?.id) {
        const res = await checkFavoriteStatus(userId, doctor.id);
        setIsFavorite(res?.isFavorite || false);
      }
    };
    fetchFavoriteStatus();
  }, [currentUser, doctor?.id]);

  const handleBookClick = () => {
    switchTab("booking");
    setTimeout(() => {
      tabSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  // ফেভারিট হ্যান্ডলার ফাংশনটি কমপ্লিট করা হলো
  const handleFavoriteDoctor = async () => {
    const userId = currentUser?.id || currentUser?._id;

    if (!userId) {
      alert("Please sign in to add this doctor to your favorites.");
      return;
    }

    try {
      // অপটিমিস্টিক আপডেট (ইউজার ইন্টারফেস দ্রুত রেসপন্স করার জন্য আগেভাগেই স্টেট চেঞ্জ করা)
      setIsFavorite((prev) => !prev);

      const res = await toggleFavoriteDoctor(userId, doctor.id, {
        name: doctor.name,
        image: doctor.image,
        specialization: doctor.specialization,
      });

      // সার্ভারের আসল রেসপন্স দিয়ে স্টেটটি নিশ্চিত করা
      setIsFavorite(res.isFavorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      // এরর হলে আগের স্টেটে ফেরত যাওয়া
      setIsFavorite((prev) => !prev);
      alert("Something went wrong. Please try again.");
    }
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
      notes: notes,
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
      <DoctorHero
        doctor={doctor}
        onBookClick={handleBookClick}
        onFavoriteClick={handleFavoriteDoctor}
        isFavorite={isFavorite}
      />

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
          {activeTab === "reviews" && (
            <ReviewsTab
              doctor={doctor}
              doctorId={id}
              reviews={reviews}
              currentUser={currentUser}
            />
          )}
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
          notes={notes}
          setNotes={setNotes}
        />
      )}
    </>
  );
}
