import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_WE_CARE_CONNECT_URI);
const db = client.db(process.env.MONGODB_WE_CARE_DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    // Signup-এর পর email verification পাঠাতে চাইলে:
    // requireEmailVerification: true,
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 30, // 30 days
    },
  },

  plugins: [
    jwt()
],

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "patient",
      },
      phone: {
        type: "string",
        required: true,
      },
      gender: {
        type: "string",
      },
      status: {
        type: "string",
        default: "pending",
      },
    },
  },
});
