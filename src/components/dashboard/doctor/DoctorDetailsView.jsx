const DetailItem = ({ label, value, className = "" }) => (
  <div>
    <dt className="text-sm font-medium text-(--text-secondary)">{label}</dt>
    <dd className={`text-base font-semibold mt-0.5 ${className}`}>
      {value || "N/A"}
    </dd>
  </div>
);

const formatDate = (dateString) =>
  dateString ? new Date(dateString).toLocaleDateString() : "N/A";

export default function DoctorDetailsView({ doctorData }) {
  if (!doctorData) {
    return (
      <div className="card p-8 text-center space-y-3">
        <p className="text-(--text-muted) text-lg">
          No Professional Profile Found
        </p>
        <p className="text-sm text-(--text-secondary) max-w-md mx-auto">
          You haven&apos;t created your professional profile yet. Click the
          button above to get started.
        </p>
      </div>
    );
  }

  const isVerified =
    doctorData.verificationStatus?.toLowerCase() === "verified";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Info Card */}
      <div className="card md:col-span-2 p-6 space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-(--color-primary) border-b border-(--border-default) pb-2 mb-4">
            Expertise & Qualifications
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem
              label="Specialization"
              value={doctorData.specialization}
            />
            <DetailItem
              label="Qualifications"
              value={doctorData.qualifications}
            />
            <DetailItem
              label="Experience"
              value={
                doctorData.experience ? `${doctorData.experience} Years` : null
              }
            />
            <DetailItem
              label="Consultation Fee"
              value={doctorData.consultationFee}
              className="text-(--color-success-text)"
            />
          </dl>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-(--color-primary) border-b border-(--border-default) pb-2 mb-4">
            Chamber & Availability
          </h2>
          <dl className="space-y-4">
            <DetailItem
              label="Hospital / Chamber"
              value={doctorData.hospitalName}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailItem
                label="Available Days"
                value={doctorData.availableDays}
              />
              <DetailItem
                label="Available Slots"
                value={doctorData.availableSlots}
              />
            </div>
          </dl>
        </section>
      </div>

      {/* Sidebar */}
      <div className="card p-6 flex flex-col justify-between space-y-6">
        <div>
          <h3 className="text-sm font-medium text-(--text-secondary) mb-2">
            Status
          </h3>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${isVerified ? "badge-success" : "badge-warning"}`}
          >
            {doctorData.verificationStatus || "Pending"}
          </span>
        </div>

        <div className="border-t border-(--border-default) pt-4 space-y-2 text-xs text-(--text-muted)">
          <div className="flex justify-between">
            <span>Profile Created:</span>
            <span>{formatDate(doctorData.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated:</span>
            <span>{formatDate(doctorData.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
