import { FaMoneyBills } from "react-icons/fa6";
import { MdEventAvailable, MdSupportAgent } from "react-icons/md";

export default function BookingSidebar({ doctor, selectedSlot, onConfirm }) {
  const hasSelection = selectedSlot?.time && selectedSlot?.date;

  return (
    <div className="sticky top-24 space-y-4">
      {/* Booking Summary Card */}
      <div
        className="p-6 rounded-2xl border shadow-sm"
        style={{
          backgroundColor: "var(--bg-muted)",
          borderColor: "var(--border-default)",
        }}
      >
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Booking Summary
        </h3>

        {!hasSelection ? (
          /* Empty state */
          <div className="text-center py-8">
            <span
              className=" text-5xl mb-3 block"
              style={{ color: "var(--text-muted)" }}
            >
              <MdEventAvailable className="mx-auto" />
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Select an available slot from the calendar to proceed with
              booking.
            </p>
          </div>
        ) : (
          /* Filled state */
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Selected Date
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedSlot.date}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Time Slot
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedSlot.time}
                </span>
              </div>
              <div
                className="flex justify-between items-center pt-3 border-t"
                style={{ borderColor: "var(--border-default)" }}
              >
                <span
                  className="text-base font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Total Fee
                </span>
                <span
                  className="text-xl font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  ${doctor.consultationFee}
                </span>
              </div>
            </div>

            <button
              onClick={onConfirm}
              className="w-full py-3 rounded-xl font-semibold text-base shadow hover:brightness-95 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: "var(--color-success)",
                color: "#ffffff",
              }}
            >
              Confirm & Pay
              <span className=" text-xl">
                <FaMoneyBills />
              </span>
            </button>

            <p
              className="text-center text-xs px-2"
              style={{ color: "var(--text-muted)" }}
            >
              Free cancellation up to 24 hours before the appointment.
            </p>
          </div>
        )}
      </div>

      {/* Support card */}
      <div
        className="p-5 rounded-2xl border text-center"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-default)",
        }}
      >
        <p
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Need immediate help?
        </p>
        <button
          className="flex items-center justify-center gap-1 mx-auto font-semibold text-lg hover:opacity-80 transition-opacity"
          style={{ color: "var(--color-primary)" }}
        >
          <span className="">
            <MdSupportAgent />
          </span>
          Contact Support
        </button>
      </div>
    </div>
  );
}
