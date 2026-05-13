"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Package,
  Copy,
  X,
  AlertCircle,
} from "lucide-react";

/* ── Types ──────────────────────────────────────────────── */
interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: "active" | "inactive" | "out-of-stock";
  description: string;
}

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "stock-asc";
type StatusFilter = "all" | "active" | "inactive" | "out-of-stock";
type CategoryFilter = "all" | "Electronics" | "Accessories" | "Audio" | "Displays" | "Lighting";

/* ── Sample data (15 rows covering all categories & stock levels) ─ */
const initialProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    sku: "WH-2024-BLK",
    price: 149.99,
    stock: 34,
    category: "Audio",
    status: "active",
    description: "Premium over-ear wireless headphones with ANC.",
  },
  {
    id: "PRD-002",
    name: "Mechanical Keyboard",
    sku: "MK-7800-RED",
    price: 89.0,
    stock: 0,
    category: "Electronics",
    status: "out-of-stock",
    description: "RGB mechanical keyboard with Cherry MX switches.",
  },
  {
    id: "PRD-003",
    name: "USB-C Hub",
    sku: "UCH-1042-SLV",
    price: 45.5,
    stock: 128,
    category: "Accessories",
    status: "active",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card.",
  },
  {
    id: "PRD-004",
    name: "LED Monitor 27\"",
    sku: "LM-2700-WHT",
    price: 329.99,
    stock: 12,
    category: "Displays",
    status: "active",
    description: "27-inch 4K IPS monitor with 144Hz refresh rate.",
  },
  {
    id: "PRD-005",
    name: "Bluetooth Speaker",
    sku: "BS-550-BLU",
    price: 59.99,
    stock: 0,
    category: "Audio",
    status: "out-of-stock",
    description: "Portable waterproof Bluetooth speaker with 360° sound.",
  },
  {
    id: "PRD-006",
    name: "Webcam HD",
    sku: "WC-1080-BLK",
    price: 79.0,
    stock: 56,
    category: "Electronics",
    status: "active",
    description: "1080p webcam with built-in noise-cancelling mic.",
  },
  {
    id: "PRD-007",
    name: "Laptop Stand",
    sku: "LS-ADJ-ALU",
    price: 34.99,
    stock: 200,
    category: "Accessories",
    status: "active",
    description: "Adjustable ergonomic aluminum laptop stand.",
  },
  {
    id: "PRD-008",
    name: "Desk Lamp",
    sku: "DL-TOUCH-WRM",
    price: 42.0,
    stock: 0,
    category: "Lighting",
    status: "out-of-stock",
    description: "Touch-controlled LED desk lamp with warm light.",
  },
  {
    id: "PRD-009",
    name: "Mouse Pad XL",
    sku: "MP-XL-RGB",
    price: 24.99,
    stock: 87,
    category: "Accessories",
    status: "inactive",
    description: "Extended RGB mouse pad with stitched edges.",
  },
  {
    id: "PRD-010",
    name: "Cable Management Kit",
    sku: "CMK-ORG-15",
    price: 19.99,
    stock: 144,
    category: "Accessories",
    status: "active",
    description: "Complete cable management solution with clips and sleeves.",
  },
  {
    id: "PRD-011",
    name: "USB-C Charger 65W",
    sku: "UCC-65W-WHT",
    price: 39.99,
    stock: 72,
    category: "Electronics",
    status: "active",
    description: "GaN fast charger with USB-C Power Delivery.",
  },
  {
    id: "PRD-012",
    name: "Monitor Light Bar",
    sku: "MLB-PRO-DRM",
    price: 69.99,
    stock: 18,
    category: "Lighting",
    status: "active",
    description: "Asymmetric monitor light bar with adjustable color temperature.",
  },
  {
    id: "PRD-013",
    name: "Laptop Sleeve",
    sku: "LSV-15-NYL",
    price: 29.99,
    stock: 95,
    category: "Accessories",
    status: "active",
    description: "Water-resistant neoprene laptop sleeve for 15\" laptops.",
  },
  {
    id: "PRD-014",
    name: "Noise Cancelling Earbuds",
    sku: "NCE-BUD-24",
    price: 129.99,
    stock: 5,
    category: "Audio",
    status: "active",
    description: "True wireless earbuds with active noise cancellation.",
  },
  {
    id: "PRD-015",
    name: "Standing Desk Converter",
    sku: "SDC-ADJ-48",
    price: 199.99,
    stock: 0,
    category: "Electronics",
    status: "inactive",
    description: "Height-adjustable standing desk converter with gas spring.",
  },
];

/* ── Status config ──────────────────────────────────────── */
const statusConfig: Record<
  Product["status"],
  { label: string; color: string; bg: string }
> = {
  active: {
    label: "Active",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  inactive: {
    label: "Inactive",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  "out-of-stock": {
    label: "Out of Stock",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
};

const categoryOptions: CategoryFilter[] = [
  "all",
  "Electronics",
  "Accessories",
  "Audio",
  "Displays",
  "Lighting",
];

/* ── Toast notification ─────────────────────────────────── */
function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    visible: boolean;
  } | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const Toast = useMemo(
    () =>
      toast
        ? () => (
            <div
              style={{ zIndex: 9999 }}
              className="fixed bottom-6 right-6 transform rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 shadow-lg shadow-[var(--shadow-color)] transition-all animate-in fade-in slide-in-from-bottom-4"
            >
              <div className="flex items-center gap-2.5">
                <X size={16} className="text-emerald-400 flex-shrink-0" />
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

  return { showToast, Toast };
}

/* ── Modal overlay ──────────────────────────────────────── */
function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4"
      style={{ backgroundColor: "var(--modal-overlay)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl shadow-[var(--shadow-color)]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Action Dropdown (three dots) ──────────────────────── */
function ActionDropdown({
  product,
  onEdit,
  onDelete,
  onDuplicate,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onDuplicate: (product: Product) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="rounded-lg p-1.5 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
        aria-label="Actions"
      >
        <span className="sr-only">Actions</span>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx={12} cy={5} r={1} /><circle cx={12} cy={12} r={1} /><circle cx={12} cy={19} r={1} />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-[var(--shadow-color)]"
            style={{ zIndex: 9998 }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onEdit(product);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            >
              <Edit size={14} className="text-[var(--text-tertiary)]" />
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDuplicate(product);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
            >
              <Copy size={14} className="text-[var(--text-tertiary)]" />
              Duplicate
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDelete(product);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-400 transition-colors hover:bg-red-400/10"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Product form (shared between Add & Edit) ──────────── */
function ProductForm({
  product,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  product?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => void;
  onCancel: () => void;
  submitLabel: string;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get("name") as string,
      sku: formData.get("sku") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string, 10),
      category: formData.get("category") as string,
      status: formData.get("status") as Product["status"],
      description: formData.get("description") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
        >
          Product Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={product?.name ?? ""}
          placeholder="e.g. Wireless Headphones"
          required
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="sku"
            className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
          >
            SKU
          </label>
          <input
            id="sku"
            name="sku"
            type="text"
            defaultValue={product?.sku ?? ""}
            placeholder="e.g. WH-2024-BLK"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
          >
            Price ($)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price ?? ""}
            placeholder="99.99"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="stock"
            className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
          >
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            defaultValue={product?.stock ?? ""}
            placeholder="100"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={product?.category ?? "Electronics"}
            required
            className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 pr-8 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
          >
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Audio</option>
            <option>Displays</option>
            <option>Lighting</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="status"
          className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={product?.status ?? "active"}
          required
          className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 pr-8 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-xs font-medium text-[var(--text-tertiary)]"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={product?.description ?? ""}
          rows={3}
          placeholder="Brief product description..."
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20 resize-none"
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-xl border border-[var(--border)] bg-[var(--hover-bg-strong)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-all hover:opacity-90"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

/* ── Stat cards ─────────────────────────────────────────── */
function StatCards({ products }: { products: Product[] }) {
  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.status === "active").length;
    const outOfStock = products.filter((p) => p.status === "out-of-stock").length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock < 20).length;
    return [
      { label: "Total Products", count: total, icon: Package, color: "text-violet-400", bg: "bg-violet-400/10" },
      { label: "Active", count: active, icon: Eye, color: "text-emerald-400", bg: "bg-emerald-400/10" },
      { label: "Out of Stock", count: outOfStock, icon: X, color: "text-red-400", bg: "bg-red-400/10" },
      { label: "Low Stock", count: lowStock, icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-400/10" },
    ];
  }, [products]);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
              <div className="rounded-lg bg-[var(--hover-bg)] p-2">
                <Icon size={18} className={`${stat.color} flex-shrink-0`} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{stat.count}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────── */
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  const itemsPerPage = 6;
  const { showToast, Toast } = useToast();

  /* ── Filter & sort logic ──────────────────────────────── */
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search: name, SKU, or category
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Sort
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "stock-asc":
        result.sort((a, b) => a.stock - b.stock);
        break;
    }

    return result;
  }, [products, searchQuery, statusFilter, categoryFilter, sortBy]);

  /* ── Pagination calc ──────────────────────────────────── */
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const showingFrom = (currentPage - 1) * itemsPerPage + 1;
  const showingTo = Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length);

  // Reset to first page when filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as StatusFilter);
    setCurrentPage(1);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value as CategoryFilter);
    setCurrentPage(1);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1);
  };

  /* ── Action handlers ──────────────────────────────────── */
  const handleEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback((product: Product) => {
    setConfirmDelete(product);
  }, []);

  const confirmDeleteProduct = useCallback(() => {
    if (!confirmDelete) return;
    setProducts((prev) => prev.filter((p) => p.id !== confirmDelete.id));
    showToast(`${confirmDelete.name} deleted successfully`);
    setConfirmDelete(null);
  }, [confirmDelete, showToast]);

  const handleDuplicate = useCallback((product: Product) => {
    const newId = `PRD-${String(products.length + 1).padStart(3, "0")}`;
    const newProduct: Product = {
      ...product,
      id: newId,
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-C`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`${product.name} duplicated successfully`);
  }, [products.length, showToast]);

  /* ── Add Product submit ───────────────────────────────── */
  const handleAddSubmit = useCallback(
    (data: Partial<Product>) => {
      const newId = `PRD-${String(products.length + 1).padStart(3, "0")}`;
      const newProduct: Product = {
        id: newId,
        name: data.name!,
        sku: data.sku!,
        price: data.price!,
        stock: data.stock!,
        category: data.category!,
        status: data.status!,
        description: data.description ?? "",
      };
      setProducts((prev) => [newProduct, ...prev]);
      setIsAddModalOpen(false);
      showToast(`${newProduct.name} added successfully`);
    },
    [products.length, showToast]
  );

  /* ── Edit Product submit ──────────────────────────────── */
  const handleEditSubmit = useCallback(
    (data: Partial<Product>) => {
      if (!editingProduct) return;
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...data }
            : p
        )
      );
      setIsEditModalOpen(false);
      setEditingProduct(null);
      showToast(`${data.name} updated successfully`);
    },
    [editingProduct, showToast]
  );

  /* ── Stock color helper ───────────────────────────────── */
  const getStockClass = (stock: number): string => {
    if (stock === 0) return "bg-red-400/10 text-red-400";
    if (stock < 20) return "bg-amber-400/10 text-amber-400";
    return "bg-emerald-400/10 text-emerald-400";
  };

  /* ── Render ───────────────────────────────────────────── */
  return (
    <div className="space-y-6">
      {Toast && Toast()}

      {/* ── PageHeader ────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Products
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Manage your product catalog, inventory, and pricing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* ── Summary Stat Cards ─────────────────────────── */}
      <StatCards products={products} />

      {/* ── Search, Filter & Sort Bar ──────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
          />
          <input
            type="text"
            placeholder="Search by name, SKU, or category..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 pr-8 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 pr-8 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="appearance-none rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 pr-8 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--text-tertiary)] focus:ring-1 focus:ring-[var(--text-tertiary)]/20"
            >
              <option value="name-asc">A → Z</option>
              <option value="name-desc">Z → A</option>
              <option value="price-asc">Price Low → High</option>
              <option value="price-desc">Price High → Low</option>
              <option value="stock-asc">Stock Low → High</option>
            </select>
            <ArrowUpDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
            />
          </div>

          {/* Clear Filters */}
          {(searchQuery || statusFilter !== "all" || categoryFilter !== "all" || sortBy !== "name-asc") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setCategoryFilter("all");
                setSortBy("name-asc");
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--text-tertiary)]">
        {filteredAndSortedProducts.length} result
        {filteredAndSortedProducts.length !== 1 ? "s" : ""}
      </p>

      {/* ── Data Table ──────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--table-header-bg)]">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--table-divider)]">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  const status = statusConfig[product.status];
                  return (
                    <tr
                      key={product.id}
                      className="transition-colors hover:bg-[var(--table-row-hover)]"
                    >
                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-[var(--hover-bg)] flex items-center justify-center text-[var(--text-secondary)] font-medium text-xs">
                            <Package size={14} />
                          </div>
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">
                              {product.name}
                            </p>
                            <p className="text-xs text-[var(--text-tertiary)]">
                              {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-[var(--text-secondary)] font-mono">
                          {product.sku}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          ${product.price.toFixed(2)}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStockClass(product.stock)}`}
                        >
                          {product.stock}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-[var(--text-secondary)]">
                          {product.category}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.bg} ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <ActionDropdown
                          product={product}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onDuplicate={handleDuplicate}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <RefreshCw
                      size={32}
                      className="mx-auto mb-3 text-[var(--text-tertiary)]"
                    />
                    <p className="text-sm text-[var(--text-secondary)]">
                      No products match your filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setCategoryFilter("all");
                        setSortBy("name-asc");
                      }}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
                    >
                      <RefreshCw size={14} />
                      Reset Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ───────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          Showing{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {filteredAndSortedProducts.length > 0 ? showingFrom : 0}
          </span>{" "}
          –{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {showingTo}
          </span>{" "}
          of{" "}
          <span className="font-medium text-[var(--text-primary)]">
            {filteredAndSortedProducts.length}
          </span>{" "}
          products
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
            aria-label="Previous page"
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
                page === currentPage
                  ? "border-violet-500 bg-violet-500/10 text-violet-400 font-semibold"
                  : "border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
              }`}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--hover-bg)] text-[var(--text-secondary)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
            aria-label="Next page"
          >
            →
          </button>
        </div>
      </div>

      {/* ── Add Product Modal ───────────────────────────── */}
      {isAddModalOpen && (
        <ModalOverlay onClose={() => setIsAddModalOpen(false)}>
          <div>
            <div className="flex items-center justify-between border-b border-[var(--table-divider)] px-6 py-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Add Product
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <ProductForm
              onSubmit={handleAddSubmit}
              onCancel={() => setIsAddModalOpen(false)}
              submitLabel="Add Product"
            />
          </div>
        </ModalOverlay>
      )}

      {/* ── Edit Product Modal ──────────────────────────── */}
      {isEditModalOpen && editingProduct && (
        <ModalOverlay onClose={() => setIsEditModalOpen(false)}>
          <div>
            <div className="flex items-center justify-between border-b border-[var(--table-divider)] px-6 py-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Edit Product
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1 text-[var(--text-tertiary)] transition-all hover:bg-[var(--hover-bg)] hover:text-[var(--text-primary)]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <ProductForm
              product={editingProduct}
              onSubmit={handleEditSubmit}
              onCancel={() => {
                setIsEditModalOpen(false);
                setEditingProduct(null);
              }}
              submitLabel="Save Changes"
            />
          </div>
        </ModalOverlay>
      )}

      {/* ── Delete Confirmation Dialog ──────────────────── */}
      {confirmDelete && (
        <ModalOverlay onClose={() => setConfirmDelete(null)}>
          <div className="p-6">
            <div className="text-center">
              <Trash2
                size={40}
                className="mx-auto mb-4 text-red-400"
              />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Delete Product?
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                Are you sure you want to delete{" "}
                <strong className="text-[var(--text-primary)]">
                  {confirmDelete.name}
                </strong>
                ? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-[var(--hover-bg-strong)] hover:text-[var(--text-primary)]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteProduct}
                  className="rounded-xl border border-red-400/50 bg-red-400/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-400/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}