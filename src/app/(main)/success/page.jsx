import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { paymentDataSave } from "@/lib/actions/payment"; // আপনার পেমেন্ট সেভ ফাংশন

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  // Stripe সেশন থেকে ডেটা এবং মেটাডাটা তুলে আনা
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details, metadata } = session;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    try {
      // Stripe মেটাডাটা থেকে বুকিং ও পেমেন্টের তথ্য প্রিপেয়ার করা
      const paymentPayload = {
        doctorId: metadata.doctorId,
        slotId: metadata.slotId,
        appointmentDate: metadata.appointmentDate,
        time: metadata.time,
        fee: parseFloat(metadata.fee),
        stripeSessionId: session_id,
        paymentStatus: "paid",
        // customerEmail: customer_details?.email,
        // customerCardName: customer_details?.name,
        patientId: metadata.patientId,
        patientName: metadata.patientName,
        patientEmail: metadata.patientEmail,
        patientPhone: metadata.patientPhone,
      };

      // সার্ভারে ডাটা সেভ করার জন্য আপনার API অ্যাকশনটি কল করা
      await paymentDataSave(paymentPayload);
    } catch (error) {
      console.error("Failed to save payment data to database:", error);
      // ডাটাবেজ সেভ ফেইল করলেও পেমেন্ট যেহেতু হয়ে গেছে, ইউজারকে একটি এরর মেসেজ বা ট্র্যাকিং সুবিধা দেওয়া উচিত
    }

    return (
      <section
        id="success"
        className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6"
      >
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            We appreciate your business! A confirmation email will be sent to{" "}
            <span className="font-semibold text-gray-800">
              {customer_details?.email}
            </span>
            .
          </p>
          <div className="text-left bg-gray-50 p-4 rounded-xl text-xs space-y-2 text-gray-600">
            <p>
              <span className="font-medium text-gray-800">
                Appointment Date:
              </span>{" "}
              {metadata.appointmentDate}
            </p>
            <p>
              <span className="font-medium text-gray-800">Time:</span>{" "}
              {metadata.time}
            </p>
            <p>
              <span className="font-medium text-gray-800">Amount Paid:</span> $
              {metadata.fee}
            </p>
          </div>
          <a
            href="/dashboard"
            className="mt-6 inline-block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </section>
    );
  }
}
