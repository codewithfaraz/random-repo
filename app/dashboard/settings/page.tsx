"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Settings,
  Save,
  RefreshCw,
  Copy,
  Bell,
  Eye,
  EyeOff,
  Sun,
  Moon,
  MoonStar,
  Shield,
  Mail,
  Globe,
  Lock,
  Unlock,
  Wifi,
  Check,
  X,
  CreditCard,
} from "lucide-react";
import { useTheme } from "@/app/ThemeProvider";
import { ThemeToggle } from "@/app/ThemeToggle";

export default function SettingsPage() {
  const { theme } = useTheme();

  /* ── General Settings state ──────────────────────────── */
  const [storeName, setStoreName] = useState("My Awesome Store");
  const [email, setEmail] = useState("hello@store.com");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("UTC-5");

  /* ── Notification Preferences state ──────────────────── */
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [lowStock, setLowStock] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [smsNotifs, setSmsNotifs] = useState(false);

  /* ── Security state ──────────────────────────────────── */
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  /* ── API & Integrations state ────────────────────────── */
  const [apiKey] = useState("sk_live_a1b2c3d4e5f6g7h8i9j0");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [gaConnected, setGaConnected] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);

  /* ── Toast notification system ────────────────────────── */
  const [toast, setToast] = useState<{
    message: string;
    visible: boolean;
    type?: "success" | "error" | "info";
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      setToast({ message, visible: true, type });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const Toast = useMemo(
    () =>
      toast
        ? () => (
            <div
              style={{ zIndex: 9999 }}
              className="fixed bottom-6 right-6 transform rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 shadow-lg shadow-[var(--shadow-color)] transition-all animate-in fade-in slide-in-from-bottom-4"
            >
              <div className="flex items-center gap-2.5">
                {toast.type === "success" ? (
                  <Check size={16} className="text-emerald-400 flex-shrink-0" />
                ) : toast.type === "error" ? (
                  <X size={16} className="text-red-400 flex-shrink-0" />
                ) : (
                  <Bell size={16} className="text-blue-400 flex-shrink-0" />
                )}
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {toast.message}
                </p>
                <button
                  onClick={() => setToast(null)}
                  className="ml-2 rounded-full p-0.5 text-[var(--text-tertiary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )
        : null,
    [toast]
  );

  /* ── Copy API key to clipboard ────────────────────────── */
  const handleCopyApiKey = useCallback(() => {
    navigator.clipboard
      .writeText(apiKey)
      .then(() => showToast("Copied!", "success"))
      .catch(() => showToast("Failed to copy", "error"));
  }, [apiKey, showToast]);

  /* ── Save general settings ───────────────────────────── */
  const handleSaveGeneral = useCallback(() => {
    showToast("General settings saved!", "success");
  }, [showToast]);

  /* ── Save changes (main button) ──────────────────────── */
  const handleSaveChanges = useCallback(() => {
    if (newPw !== confirmPw) {
      showToast("New password and confirmation do not match", "error");
      return;
    }
    if (newPw && !currentPw) {
      showToast("Please enter your current password", "error");
      return;
    }
    showToast("Saved!", "success");
  }, [currentPw, newPw, confirmPw, showToast]);

  const themeName = theme === "dark" ? "Dark" : "Light";

  return (
    <div className="space-y-6">
      {/* Toast */}
      {Toast && Toast()}

      {/* PageHeader */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Settings
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Manage your store settings and integrations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveChanges}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {[
          {
            label: "Active Integrations",
            value: "3",
            Icon: Wifi,
            color: "text-violet-400",
          },
          {
            label: "API Keys",
            value: "1",
            Icon: Lock,
            color: "text-amber-400",
          },
          {
            label: "Notifications Enabled",
            value: "3",
            Icon: Bell,
            color: "text-emerald-400",
          },
          {
            label: "Storage Used",
            value: "4.2 GB",
            Icon: Settings,
            color: "text-sky-400",
          },
        ].map((stat) => {
          const Icon = stat.Icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--text-secondary)]">
                  {stat.label}
                </p>
                <div className="rounded-lg bg-[var(--hover-bg)] p-2">
                  <Icon
                    size={18}
                    className={`${stat.color} flex-shrink-0`}
                  />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* General Settings */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--hover-bg)]">
              <Settings size={18} className="text-[var(--text-primary)]" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              General Settings
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
              >
                <option value="UTC-5">UTC-5 (Eastern Time)</option>
                <option value="UTC-6">UTC-6 (Central Time)</option>
                <option value="UTC-7">UTC-7 (Mountain Time)</option>
                <option value="UTC-8">UTC-8 (Pacific Time)</option>
                <option value="UTC+0">UTC+0 (GMT)</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleSaveGeneral}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
            >
              <Save size={14} />
              Save General Settings
            </button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--hover-bg)]">
              <Bell size={18} className="text-[var(--text-primary)]" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Notification Preferences
            </h3>
          </div>
          <div className="space-y-4">
            <ToggleSetting
              icon={<Mail size={18} />}
              label="Email Notifications"
              description="Receive email alerts for store activity"
              checked={emailNotifs}
              onToggle={() => setEmailNotifs(!emailNotifs)}
            />
            <ToggleSetting
              icon={<Eye size={18} />}
              label="Low Stock Alerts"
              description="Get notified when products run low"
              checked={lowStock}
              onToggle={() => setLowStock(!lowStock)}
            />
            <ToggleSetting
              icon={<RefreshCw size={18} />}
              label="Order Updates"
              description="Receive order status change notifications"
              checked={orderUpdates}
              onToggle={() => setOrderUpdates(!orderUpdates)}
            />
            <ToggleSetting
              icon={<Globe size={18} />}
              label="Marketing Emails"
              description="Receive promotional offers and campaigns"
              checked={marketing}
              onToggle={() => setMarketing(!marketing)}
            />
            <ToggleSetting
              icon={<MoonStar size={18} />}
              label="SMS Notifications"
              description="Receive SMS alerts for important events"
              checked={smsNotifs}
              onToggle={() => setSmsNotifs(!smsNotifs)}
            />
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--hover-bg)]">
              <Sun size={18} className="text-[var(--text-primary)]" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Appearance
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-[var(--text-tertiary)]">
                Current Theme
              </label>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <span className="text-sm text-[var(--text-secondary)]">
                  {themeName} mode
                </span>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]">
                Font Size
              </label>
              <select className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20">
                <option>Small (14px)</option>
                <option selected>Medium (16px)</option>
                <option>Large (18px)</option>
                <option>Extra Large (20px)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--hover-bg)]">
              <Shield size={18} className="text-[var(--text-primary)]" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Security
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]">
                Current Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
                <Lock
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
                <Lock
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
                <Lock
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--background)]">
                  <Unlock size={16} className="text-[var(--text-primary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full border border-[var(--border)] transition-colors ${
                  twoFactor
                    ? "bg-violet-500 border-violet-500"
                    : "bg-[var(--background)] border-[var(--border)]"
                }`}
                role="switch"
                aria-checked={twoFactor}
                aria-label="Toggle two-factor authentication"
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
                    twoFactor ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* API & Integrations */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--hover-bg)]">
              <Shield size={18} className="text-[var(--text-primary)]" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              API &amp; Integrations
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]">
                API Key
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={apiKey}
                  readOnly
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none"
                />
                <button
                  onClick={handleCopyApiKey}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
                  aria-label="Copy API key"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]">
                Webhook URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://example.com/webhook"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
                />
                <Globe
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-3">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-[var(--text-tertiary)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    Google Analytics
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Track store traffic and conversions
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setGaConnected(!gaConnected);
                  showToast(
                    !gaConnected
                      ? "Google Analytics connected"
                      : "Google Analytics disconnected",
                    "info"
                  );
                }}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)] ${
                  gaConnected
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)]"
                }`}
              >
                {gaConnected ? "Connected" : "Connect"}
              </button>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-3">
              <div className="flex items-center gap-3">
                <CreditCard size={18} className="text-[var(--text-tertiary)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    Stripe
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Accept payments online
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setStripeConnected(!stripeConnected);
                  showToast(
                    !stripeConnected
                      ? "Stripe connected successfully"
                      : "Stripe disconnected",
                    "info"
                  );
                }}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)] ${
                  stripeConnected
                    ? "border-violet-500/30 bg-violet-500/10 text-violet-400"
                    : "border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)]"
                }`}
              >
                {stripeConnected ? "Connected" : "Connect"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ToggleSetting sub-component ──────────────────────── */
function ToggleSetting({
  icon,
  label,
  description,
  checked,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--background)]">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {label}
          </p>
          <p className="text-xs text-[var(--text-tertiary)]">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 items-center rounded-full border border-[var(--border)] transition-colors ${
          checked
            ? "bg-violet-500 border-violet-500"
            : "bg-[var(--background)] border-[var(--border)]"
        }`}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

/* ── CreditCard icon (Stripe) — inline SVG so no extra import ── */
function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}