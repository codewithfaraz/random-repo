"use client";

import { useMemo, useState } from "react";
import {
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ArrowUpDown,
  ChevronDown,
  Mail,
  Phone,
  ShoppingBag as BagIcon,
} from "lucide-react";

// ─── Customer Data ──────────────────────────────────────
const customers = [
  { id: 1, name: "Sarah Mitchell", email: "sarah@email.com", phone: "+1 (555) 123-4567", orders: 24, total: "$2,847", lastActive: "2 min ago", status: "active" },
  { id: 2, name: "James Chen", email: "jchen@email.com", phone: "+1 (555) 234-5678", orders: 41, total: "$5,129", lastActive: "15 min ago", status: "active" },
  { id: 3, name: "Emma Rodriguez", email: "erodriguez@email.com", phone: "+1 (555) 345-6789", orders: 12, total: "$1,045", lastActive: "1 hr ago", status: "inactive" },
  { id: 4, name: "Liam O'Brien", email: "liam@email.com", phone: "+1 (555) 456-7890", orders: 8, total: "$672", lastActive: "2 hrs ago", status: "active" },
  { id: 5, name: "Aisha Patel", email: "aisha@email.com", phone: "+1 (555) 567-8901", orders: 36, total: "$4,521", lastActive: "3 hrs ago", status: "active" },
  { id: 6, name: "Noah Williams", email: "noah@email.com", phone: "+1 (555) 678-9012", orders: 19, total: "$2,290", lastActive: "5 hrs ago", status: "away" },
  { id: 7, name: "Sophia Lee", email: "sophia@email.com", phone: "+1 (555) 789-0123", orders: 7, total: "$534", lastActive: "6 hrs ago", status: "inactive" },
  { id: 8, name: "Oliver Brown", email: "oliver@email.com", phone: "+1 (555) 890-1234", orders: 52, total: "$7,893", lastActive: "8 hrs ago", status: "active" },
];

const statusMap = {
  active: { label: "Active", color: "text-[var(--text-success)]", bg: "bg-emerald-400/10" },
  inactive: { label: "Inactive", color: "text-[var(--text-tertiary)]", bg: "bg-gray-400/10" },
  away: { label: "Away", color: "text-[var(--text-warning)]", bg: "bg-amber-400/10" },
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<"name" | "orders" | "total" | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let result = [...customers];
    if (statusFilter !== "All") result = result.filter((c) => c.status === statusFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    }
    if (sortField) {
      result.sort((a, b) => {
        let aVal: string | number = a[sortField!] as any;
        let bVal: string | number = b[sortField!] as any;
        if (sortField === "total") {
          aVal = parseFloat(aVal.toString().replace(/[^\d.-]/g, ""));
          bVal = parseFloat(bVal.toString().replace(/[^\d.-]/g, ""));
        }
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [searchQuery, statusFilter, sortField, sortDir]);

  const toggleSort = (field: "name" | "orders" | "total") => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  return (
    <div className="space-y-6 stagger-children">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Customers</h1>
          <p className="text-sm text-[var(--text-tertiary)]">Manage your customer base</p>
        </div>
        <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--accent)]">
          {customers.length} customers
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 rounded-full border border-[var(--border)] bg-[var(--hover-bg)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-violet-500/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-full border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2 text-sm text-[var(--text-secondary)] outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-violet-500/20"
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Away</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-[var(--surface)]/95 backdrop-blur-xl">
            <tr className="border-b border-[var(--border)]">
              {[
                { key: "name" as const, label: "Customer" },
                { key: "email" as any, label: "Email" },
                { key: "phone" as any, label: "Phone" },
                { key: "orders" as const, label: "Orders" },
                { key: "total" as const, label: "Total Spent" },
                { key: "status" as any, label: "Status" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => ["name", "orders", "total"].includes(key) && toggleSort(key as any)}
                  className={`px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] select-none transition-colors ${
                    ["name", "orders", "total"].includes(key) ? "cursor-pointer hover:text-[var(--text-primary)]" : ""
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {label}
                    {sortField === key && (
                      <ChevronDown size={10} className={`transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`} />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map((c) => {
              const st = statusMap[c.status as keyof typeof statusMap];
              const initials = c.name.split(" ").map((n) => n[0]).join("");
              const statusColors = { active: "bg-emerald-500", inactive: "bg-gray-500", away: "bg-amber-500" };
              return (
                <tr key={c.id} className="transition-colors hover:bg-[var(--hover-bg)]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${statusColors[c.status as keyof typeof statusColors]} text-[10px] font-bold text-[var(--text-primary)] shrink-0`}>
                        {initials}
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--text-tertiary)]">
                      <Mail size={13} />
                      {c.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--text-tertiary)]">
                      <Phone size={13} />
                      {c.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <BagIcon size={14} className="text-[var(--text-tertiary)]" />
                      <span className="text-sm text-[var(--text-primary)]">{c.orders}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-[var(--text-primary)]">{c.total}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${st.bg} ${st.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${statusColors[c.status as keyof typeof statusColors]}`} />
                      {st.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="rounded p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]">
                      <MoreVertical size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}