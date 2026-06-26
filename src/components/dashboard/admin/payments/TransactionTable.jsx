"use client";

import Image from "next/image";
import { useState } from "react";
import TransactionStatusBadge from "./TransactionStatusBadge";
import { BiSort } from "react-icons/bi";
import {
  MdFilterList,
  MdMoreVert,
  MdOutlineSearchOff,
  MdSwapVert,
} from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiReceipt, CiSearch } from "react-icons/ci";

const STATUSES = ["all", "accepted", "rejected", "pending", "completed"];
const PER_PAGE = 5;

export default function TransactionTable({ transactions }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [currentPage, setPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortAsc, setSortAsc] = useState(false);

  // Filter
  const filtered = transactions.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.patientName.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === "all" || t.treadmendStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    let va = a[sortField],
      vb = b[sortField];
    if (typeof va === "string") va = va.toLowerCase();
    if (typeof vb === "string") vb = vb.toLowerCase();
    if (va < vb) return sortAsc ? -1 : 1;
    if (va > vb) return sortAsc ? 1 : -1;
    return 0;
  });

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const paged = sorted.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const toggleSort = (field) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(true);
    }
    setPage(1);
  };

  const SortIcon = ({ field }) => (
    <span
      className=" text-[14px] ml-1 align-middle"
      style={{
        color:
          sortField === field ? "var(--color-primary)" : "var(--text-muted)",
      }}
    >
      {sortField === field ? (
        sortAsc ? (
          <IoIosArrowUp />
        ) : (
          <IoIosArrowDown />
        )
      ) : (
        <MdSwapVert />
      )}
    </span>
  );

  const thStyle =
    "px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest whitespace-nowrap";
  const tdStyle = "px-5 py-4 text-sm";

  return (
    <div
      className="rounded-xl border shadow-sm overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      {/* Table header controls */}
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-5 border-b"
        style={{ borderColor: "var(--border-default)" }}
      >
        <div>
          <h3
            className="text-lg font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Recent Transactions
          </h3>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            {filtered.length} record{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          {/* Search */}
          <div
            className="flex items-center gap-2 border rounded-md px-3 py-2 flex-1 sm:flex-none sm:min-w-55 transition-shadow focus-within:ring-2 focus-within:ring-(--border-focus)"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-default)",
            }}
          >
            <span
              className=" text-[18px]"
              style={{ color: "var(--text-muted)" }}
            >
              <CiSearch />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search transactions..."
              className="bg-transparent text-sm focus:outline-none w-full"
              style={{ color: "var(--text-primary)" }}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <span
                  className=" text-[16px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <IoMdClose />
                </span>
              </button>
            )}
          </div>

          {/* Status filter */}
          <div
            className="flex items-center gap-1 border rounded--md px-3 py-2"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-default)",
            }}
          >
            <span
              className=" text-[16px]"
              style={{ color: "var(--text-muted)" }}
            >
              <MdFilterList />
            </span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-sm focus:outline-none cursor-pointer capitalize"
              style={{ color: "var(--text-primary)" }}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s === "all"
                    ? "All Status"
                    : s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr style={{ backgroundColor: "var(--bg-surface)" }}>
              <th className={thStyle} style={{ color: "var(--text-muted)" }}>
                Patient
              </th>

              <th className={thStyle} style={{ color: "var(--text-muted)" }}>
                <button
                  onClick={() => toggleSort("amount")}
                  className="flex items-center"
                >
                  Amount <BiSort field="amount" />
                </button>
              </th>
              <th className={thStyle} style={{ color: "var(--text-muted)" }}>
                Date &amp; Time
              </th>
              <th
                className={`${thStyle} text-center`}
                style={{ color: "var(--text-muted)" }}
              >
                Status
              </th>
              <th
                className={`${thStyle} text-right`}
                style={{ color: "var(--text-muted)" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <span
                    className=" text-5xl block mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <MdOutlineSearchOff />
                  </span>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    No transactions match your filters.
                  </p>
                </td>
              </tr>
            ) : (
              paged.map((txn) => (
                <tr
                  key={txn._id}
                  className="border-t group transition-colors"
                  style={{
                    borderColor: "var(--border-default)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--bg-surface)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                >
                  {/* Patient */}
                  <td className={tdStyle}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0 bg-(--bg-muted)">
                        <Image
                          src={txn.patientImage}
                          alt={txn.patientName}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <span
                        className="font-medium whitespace-nowrap"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {txn.patientName}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className={tdStyle}>
                    <span
                      className="font-bold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      ${txn?.fee}
                    </span>
                  </td>

                  {/* Date */}
                  <td
                    className={tdStyle}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span>{txn.appointmentDate}</span>
                    <span
                      className="block text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {txn.time}
                    </span>
                  </td>

                  {/* Status */}
                  <td className={`${tdStyle} text-center`}>
                    <TransactionStatusBadge status={txn.treadmendStatus} />
                  </td>

                  {/* Actions */}
                  <td className={`${tdStyle} text-right`}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-2 rounded-sm transition-colors hover:bg-(--primary-50)"
                        title="View Receipt"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--color-primary)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--text-muted)")
                        }
                      >
                        <span className=" text-xl">
                          <CiReceipt />
                        </span>
                      </button>
                      <button
                        className="p-2 rounded-sm transition-colors hover:bg-(--bg-muted)"
                        title="More options"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span className=" text-xl">
                          <MdMoreVert />
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination + count footer */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t"
        style={{
          borderColor: "var(--border-default)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Showing{" "}
          <span
            className="font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {Math.min((currentPage - 1) * PER_PAGE + 1, filtered.length)}–
            {Math.min(currentPage * PER_PAGE, filtered.length)}
          </span>{" "}
          of{" "}
          <span
            className="font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {filtered.length}
          </span>{" "}
          transactions
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-sm border transition-colors disabled:opacity-30"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            <span className=" text-[18px]">
              <FaChevronLeft />
            </span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="w-8 h-8 flex items-center justify-center rounded-sm text-sm font-semibold transition-colors"
              style={{
                backgroundColor:
                  currentPage === p ? "var(--color-primary)" : "transparent",
                color: currentPage === p ? "#fff" : "var(--text-secondary)",
              }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-sm border transition-colors disabled:opacity-30"
            style={{
              borderColor: "var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            <span className=" text-[18px]">
              <FaChevronRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
