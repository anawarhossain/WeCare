"use server";

import { requireRole } from "@/lib/core/session";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function createCheckoutSession(bookingPayload) {
  try {
    const origin = (await headers()).get("origin");

    const patientData = await requireRole("patient");

    // bookingPayload.patientId = patientData.id;
    // bookingPayload.patientName = patientData.name;
    // bookingPayload.patientEmail = patientData.email;
    // bookingPayload.patientPhone = patientData.phone;


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: patientData.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Consultation with ${bookingPayload.doctorName}`,
              description: `Date: ${bookingPayload.appointmentDate} | Time: ${bookingPayload.time}`,
            },
            
            unit_amount: Math.round(bookingPayload.fee * 100), // Stripe সেন্ট (cents) এ হিসাব করে
          },
          
          quantity: 1,
        },
      ],
      mode: "payment",
      // বুকিং ডাটা স্ট্রাইপ মেটাডাটাতে অবজেক্ট আকারে পাস করা হচ্ছে
      metadata: {
        doctorId: bookingPayload.doctorId,
        slotId: bookingPayload.slotId,
        appointmentDate: bookingPayload.appointmentDate,
        time: bookingPayload.time,
        fee: bookingPayload.fee.toString(),
        patientId: patientData.id,
        patientName: patientData.name,
        patientEmail: patientData.email,
        patientPhone: patientData.phone,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/doctor/${bookingPayload.doctorId}`,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    throw new Error("Payment initialization failed");
  }
}
