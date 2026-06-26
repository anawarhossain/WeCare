"use client";

import { Tooltip } from "@heroui/react";
import { MdAccessTime, MdOutlineFrontHand } from "react-icons/md";

export default function WaitTimeIndicator({
  queueAheadCount,
  estimatedWaitMinutes,
}) {
  // queueAheadCount null মানে appointment-টা আজকের active queue-তে নেই
  // (অতীতের, ভবিষ্যতের, বা completed/cancelled appointment)
  if (queueAheadCount === null || queueAheadCount === undefined) {
    return null;
  }

  // queue-তে কেউ নেই, মানে এখনই দেখা হবে
  if (queueAheadCount === 0) {
    return (
      <div
        className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
        style={{
          backgroundColor: "var(--color-success-bg)",
          color: "var(--color-success-text)",
        }}
      >
        <MdOutlineFrontHand className="text-sm" />
        You&apos;re next
      </div>
    );
  }

  return (
    <Tooltip
      content={`${queueAheadCount} patient${queueAheadCount === 1 ? "" : "s"} ahead of you in the queue`}
    >
      <div
        className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full cursor-help"
        style={{
          backgroundColor: "var(--color-warning-bg)",
          color: "var(--color-warning-text)",
        }}
      >
        <MdAccessTime className="text-sm" />~{estimatedWaitMinutes} min wait •{" "}
        {queueAheadCount} ahead
      </div>
    </Tooltip>
  );
}
