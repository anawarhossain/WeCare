import EditProfileButton from "@/components/common/EditProfileButton";
import Image from "next/image";

export default function ProfileCard({ user }) {
  // ডাটা ডেস্ট্রাকচারিং এবং ফলব্যাক ভ্যালু সেট করা
  const {
    name = user?.name || "User Name",
    role = user?.role,
    status = user?.status || "pending",
    image = user?.image || null,
    phone = user?.phone || "Phone Number",
    gender = user?.gender || "male",
    _id = user?._id,
  } = user || {};

  // স্ট্যাটাস অনুযায়ী ব্যাজের কালার নির্ধারণ
  const statusColors = {
    verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const currentStatusStyle =
    statusColors[status.toLowerCase()] || statusColors.pending;

  return (
    <div className="w-full  bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 transition-all duration-300 hover:shadow-md">
      {/* বাম পাশের অংশ: ইমেজ এবং ইনফরমেশন */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full">
        {/* প্রোফাইল ইমেজ উইথ ক্যামেরা আইকন ওভারলে */}
        <div className="relative w-28 h-28 shrink-0">
          <div className="w-full h-full rounded-full p-1 border-4 border-teal-100 overflow-hidden bg-slate-50">
            <Image
              src={image}
              alt={name || "Profile Image"}
              className="w-full h-full object-cover rounded-full"
                          loading="lazy"
                          fill
            />
          </div>
          {/* ক্যামেরা আইকন (ছবির ডিজাইন অনুযায়ী) */}
          <div className="absolute bottom-1 right-1 bg-teal-800 text-white p-2 rounded-full border-2 border-white shadow-sm cursor-pointer hover:bg-teal-700 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </div>
        </div>

        {/* টেক্সট ইনফরমেশন */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1.5 pt-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              {name || "No Name Set"}
            </h2>

            {/* স্ট্যাটাস ব্যাজ */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${currentStatusStyle}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-currentColor animate-pulse" />
              {status}
            </span>
          </div>

          {/* রোল / ডেজিগনেশন */}
          <p className="text-base font-medium text-slate-500 capitalize">
            Senior {role}
          </p>

          {/* ফোন এবং জেন্ডার ইনফরমেশন */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-500 pt-1">
            {phone && (
              <div className="flex items-center justify-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-slate-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
                <span>{phone}</span>
              </div>
            )}
            {gender && (
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-slate-400 font-bold">·</span>
                <span className="capitalize">{gender}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ডান পাশের অংশ: এডিট বাটন */}
      <div className="shrink-0 pt-2 w-full sm:w-auto flex justify-center sm:justify-end">
        <EditProfileButton user={user} />
      </div>
    </div>
  );
}
