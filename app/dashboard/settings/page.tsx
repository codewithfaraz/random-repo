"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Mail,
  Lock,
  Bell,
  Moon,
  Sun,
  Shield,
  LogOut,
  Save,
  RefreshCw,
  Github,
  Globe,
  ChevronRight,
  CreditCard,
  UserPlus,
  Trash2,
  ShoppingBag,
  Plus,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "account", label: "Account", icon: <Lock size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    { id: "billing", label: "Billing", icon: <CreditCard size={16} /> },
    { id: "danger", label: "Danger Zone", icon: <Trash2 size={16} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Settings</h1>
          <p className="text-sm text-[var(--text-tertiary)]">Manage your account preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sidebar Tabs */}
        <nav className="lg:col-span-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-violet-500/10 text-violet-400 shadow-inner shadow-violet-500/10"
                    : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <ChevronRight size={14} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Tab Content */}
        <div className="lg:col-span-9">
          {/* ─── Profile Tab ─────────────────────────── */}
          {activeTab === "profile" && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
              <h2 className="mb-6 text-lg font-bold tracking-tight text-[var(--text-primary)]">Profile Information</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Display Name</label>
                  <input
                    type="text"
                    defaultValue="HermesAdmin"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="E-commerce store administrator managing products, orders, and customer relationships."
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Role</label>
                  <input
                    type="text"
                    defaultValue="Super Admin"
                    disabled
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)]/50 px-4 py-3 text-sm text-[var(--text-tertiary)] outline-none"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button className="rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-6 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]">
                  Reset
                </button>
                <button className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40 flex items-center gap-2">
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ─── Account Tab ─────────────────────────── */}
          {activeTab === "account" && (
            <div className="space-y-6">
              {/* Change Password */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
                <h2 className="mb-6 flex items-center gap-2 text-lg font-bold tracking-tight text-[var(--text-primary)]">
                  <Lock size={20} className="text-violet-400" />
                  Change Password
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40 flex items-center gap-2">
                    <Lock size={15} />
                    Update Password
                  </button>
                </div>
              </div>

              {/* 2FA */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">Two-Factor Authentication</h3>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative flex h-6 w-12 items-center rounded-full border transition-colors ${
                      darkMode ? "border-violet-500 bg-violet-500" : "border-[var(--border)] bg-[var(--hover-bg)]"
                    }`}
                  >
                    <div
                      className={`absolute h-4 w-4 rounded-full bg-white shadow-md transition-transform ${darkMode ? "translate-x-6" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>
              </div>

              {/* Connected Accounts */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Connected Accounts</h3>
                <div className="space-y-3">
                  {[
                    { icon: <Mail size={16} />, label: "Email", value: "admin@store.com", connected: true },
                    { icon: <Github size={16} />, label: "GitHub", value: "Connected", connected: true },
                    { icon: <Globe size={16} />, label: "Google", value: "Not connected", connected: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--text-tertiary)]">{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                          <p className="text-xs text-[var(--text-tertiary)]">{item.value}</p>
                        </div>
                      </div>
                      {item.connected ? (
                        <button className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all">Disconnect</button>
                      ) : (
                        <button className="rounded-lg border border-violet-500/30 px-3 py-1.5 text-xs font-semibold text-violet-400 hover:bg-violet-500/10 transition-all">Connect</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Notifications Tab ─────────────────── */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">Notification Preferences</h3>
                {[
                  { label: "Email Notifications", desc: "Receive updates via email", checked: emailNotifications, onChange: setEmailNotifications },
                  { label: "Push Notifications", desc: "Get notified in the browser", checked: pushNotifications, onChange: setPushNotifications },
                ].map((n) => (
                  <div key={n.label} className="mb-4 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-4">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{n.label}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => n.onChange(!n.checked)}
                      className={`relative flex h-6 w-12 items-center rounded-full border transition-colors ${
                        n.checked ? "border-violet-500 bg-violet-500" : "border-[var(--border)] bg-[var(--hover-bg-strong)]"
                      }`}
                    >
                      <div
                        className={`absolute h-4 w-4 rounded-full bg-white shadow-md transition-transform ${n.checked ? "translate-x-6" : "translate-x-0.5"}`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Notification Log */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">Recent Notifications</h3>
                {[
                  { title: "New Order #ORD-7821", desc: "Sarah Mitchell purchased Premium Headphones", time: "2 min ago", icon: <ShoppingBag size={16} /> },
                  { title: "Product Low Stock", desc: "USB-C Hub is running low (3 remaining)", time: "15 min ago", icon: <Bell size={16} /> },
                  { title: "Monthly Report Ready", desc: "April sales report is available for download", time: "1 hr ago", icon: <Mail size={16} /> },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-white/[0.02]">
                    <span className="mt-0.5 shrink-0 text-[var(--text-tertiary)]">{n.icon}</span>
                    <div>
                      <p className="text-sm text-[var(--text-primary)]">{n.title}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{n.desc}</p>
                    </div>
                    <span className="ml-auto text-[10px] text-[var(--text-tertiary)] shrink-0">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Billing Tab ────────────────────────── */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">Current Plan</h3>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">Pro Plan — $29/month</p>
                  </div>
                  <button className="rounded-xl border border-violet-500/30 px-4 py-2 text-xs font-semibold text-violet-400 hover:bg-violet-500/10 transition-all">
                    Manage Plan
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-4">
                  <div>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Current Period</p>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Apr 1 – Apr 30, 2025</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase">Next Billing</p>
                    <p className="text-sm font-medium text-[var(--text-primary)]">May 1, 2025</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">Payment Methods</h3>
                <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} className="text-violet-400" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">Visa ending in 4242</p>
                      <p className="text-xs text-[var(--text-tertiary)]">Expires 12/2025</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">Default</span>
                </div>
                <button className="mt-3 flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-violet-400 transition-colors">
                  <Plus size={14} /> Add Payment Method
                </button>
              </div>

              {/* Billing History */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/[0.03] p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">Billing History</h3>
                <div className="space-y-2">
                  {[
                    { month: "March 2025", amount: "$29.00", status: "Paid" },
                    { month: "February 2025", amount: "$29.00", status: "Paid" },
                    { month: "January 2025", amount: "$29.00", status: "Paid" },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-white/[0.02]">
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{b.month}</p>
                        <p className="text-xs text-[var(--text-tertiary)]">Pro Plan</p>
                      </div>
                      <span className="text-sm font-bold text-emerald-400">{b.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Danger Zone Tab ─────────────────────── */}
          {activeTab === "danger" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-red-400 mb-2">Delete Account</h3>
                <p className="text-xs text-[var(--text-tertiary)] mb-4">This action is irreversible. All data, orders, and settings will be permanently removed.</p>
                <div className="flex gap-3">
                  <input type="text" placeholder="Type account name to confirm" className="flex-1 rounded-xl border border-red-500/30 bg-[var(--hover-bg)] px-4 py-2.5 text-sm text-red-400 placeholder:text-red-400/40 outline-none focus:ring-1 focus:ring-red-500/20" />
                  <button className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 transition-all flex items-center gap-2">
                    <Trash2 size={15} />
                    Delete Account
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-6 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-amber-400 mb-2">Export & Download Data</h3>
                <p className="text-xs text-[var(--text-tertiary)] mb-4">Download a copy of all your data including orders, customers, and settings.</p>
                <button className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-6 py-2.5 text-sm font-semibold text-amber-400 hover:bg-amber-500/20 transition-all flex items-center gap-2">
                  <DownloadIcon />
                  Export All Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Download SVG Icon ───────────────────────────────
function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}