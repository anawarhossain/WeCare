"use client";

import { IoMdClose } from "react-icons/io";
import { MdOutlineMedicalServices } from "react-icons/md";
import { TbProgress } from "react-icons/tb";

export default function PrescriptionViewModal({
  prescription,
  isLoading,
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 animate-fade-in"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="max-w-md w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-default)",
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center p-5 border-b"
          style={{ borderColor: "var(--border-default)" }}
        >
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Prescription
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoMdClose
              className="text-xl"
              style={{ color: "var(--text-muted)" }}
            />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <TbProgress
                className="text-3xl animate-spin"
                style={{ color: "var(--color-primary)" }}
              />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Loading prescription...
              </p>
            </div>
          ) : !prescription ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <MdOutlineMedicalServices
                className="text-4xl"
                style={{ color: "var(--text-muted)" }}
              />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                No prescription has been added for this appointment yet.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <h4
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Medicines &amp; Dosages
                </h4>
                <div
                  className="p-4 rounded-lg border whitespace-pre-line text-sm leading-relaxed"
                  style={{
                    borderColor: "var(--border-default)",
                    backgroundColor: "var(--bg-surface)",
                    color: "var(--text-primary)",
                  }}
                >
                  {prescription.medicines}
                </div>
              </div>

              {prescription.instructions && (
                <div className="space-y-1.5">
                  <h4
                    className="text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Special Instructions
                  </h4>
                  <div
                    className="p-4 rounded-lg border whitespace-pre-line text-sm leading-relaxed"
                    style={{
                      borderColor: "var(--border-default)",
                      backgroundColor: "var(--bg-surface)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {prescription.instructions}
                  </div>
                </div>
              )}

              {/* <p
                className="text-xs text-center"
                style={{ color: "var(--text-muted)" }}
              >
                Prescribed by Dr. {prescription.doctorName || "your doctor"} for{" "}
                {prescription.patientName}
              </p> */}
            </>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex justify-end p-5 border-t"
          style={{ borderColor: "var(--border-default)" }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md text-sm font-semibold shadow-sm hover:brightness-95 transition-all"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--text-on-primary)",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
