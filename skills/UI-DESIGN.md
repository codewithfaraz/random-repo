# UI Design Skill — Super Good Interfaces

A skill for designing visually stunning, modern UI components and interfaces following glassmorphism, neubrutalism, and dark-mode-first principles.

## Design Principles

1. **Dark Mode First** — Design on `#0a0a0f` or similar near-black backgrounds. Colors are muted desaturated tones that feel premium, never oversaturated neons.
2. **Glassmorphism** — Panels use `bg-white/[0.03]` to `bg-white/[0.08]` with `backdrop-blur-xl` and subtle `border border-white/10`.
3. **Layered Depth** — Elements cast `shadow-2xl shadow-black/60` or colored glows (`shadow-violet-500/25`). Raised on hover.
4. **Gradient Accents** — Buttons and highlights use `bg-gradient-to-r from-violet-500 to-fuchsia-500` with `bg-clip-text text-transparent` for text.
5. **Soft Corners** — Everything uses `rounded-xl` or `rounded-2xl`. No sharp corners.
6. **Subtle Animations** — `transition-all duration-300` on every interactive element. Hover `translate-y-[-2px]`.
7. **Typography Hierarchy** — Heading: `font-black tracking-tighter`. Body: `font-medium text-white/70`. Caption: `text-[11px] uppercase tracking-wider text-white/40`.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0f` | Page background |
| Surface | `#161625` | Modal/dropdown background |
| Border | `rgba(255,255,255,0.10)` | Card borders |
| Text Primary | `#ffffff` | Headings, important text |
| Text Secondary | `rgba(255,255,255,0.70)` | Body text |
| Text Tertiary | `rgba(255,255,255,0.40)` | Captions, labels |
| Accent | `#8b5cf6` → `#ec4899` | Gradients, CTAs |
| Success | `#10b981` / `#34d399` | Positive states |
| Warning | `#f59e0b` / `#fbbf24` | Caution states |
| Danger | `#ef4444` / `#f87171` | Destructive actions |
| Info | `#06b6d4` / `#22d3ee` | Neutral info |

## Component Patterns

### Metric Card
```tsx
// Glass card with gradient glow, icon top-left, change badge top-right
<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
  <div className={`bg-gradient-to-br ${gradient} bg-opacity-15`}>
    {icon}
  </div>
  {/* Badge: absolute top-right */}
  {/* Title: text-[11px] uppercase tracking-wider text-white/40 */}
  {/* Value: text-2xl font-bold text-white */}
</div>
```

### Modal
```tsx
// Centered, backdrop-blur-sm, zoom-in-95 animation
<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
  <div className="w-full max-w-[size] rounded-2xl border border-white/10 bg-[#161625] p-6 shadow-2xl shadow-black/60 backdrop-blur-xl">
    {/* Close X top-right */}
    {/* Content */}
    {/* Actions row at bottom */}
  </div>
</div>
```

### Data Table
```tsx
// Rounded container, subtle header bg, divider rows
<table className="w-full">
  <thead><tr className="bg-white/[0.02] border-b border-white/10">
    <th className="px-6 py-3 text-[11px] uppercase tracking-wider text-white/40">...</th>
  </tr></thead>
  <tbody className="divide-y divide-white/5">
    <tr className="hover:bg-white/[0.03]">
      <td className="px-6 py-4 text-sm text-white/70">...</td>
    </tr>
  </tbody>
</table>
```

### Status Badge
```tsx
<span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold bg-{color}/10 text-{color}">
  <Icon size={12} />
  {label}
</span>
```

### Button (Primary CTA)
```tsx
<button className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40">
  {label}
</button>
```

### Button (Ghost/Secondary)
```tsx
<button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white">
  {label}
</button>
```

### Form Input
```tsx
<input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20" />
```

### Sidebar Navigation
```tsx
// Fixed left panel, 260px, glass background
<aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-white/10 bg-[#0a0a0f]/80 backdrop-blur-3xl">
  {/* Logo area */}
  {/* Nav links: hover:bg-white/10 hover:text-white */}
</aside>
```

## Animations to Use
- `animate-in fade-in-0` for modals
- `animate-in zoom-in-95` for popups/dropdowns
- `transition-all duration-300` for all hover states
- `hover:-translate-y-0.5` for CTA buttons on hover

## Anti-Patterns to Avoid
- ❌ White backgrounds on dark theme pages
- ❌ `border-gray-200` (use `border-white/10` instead)
- ❌ `text-gray-400` (use `text-white/40`)
- ❌ Sharp corners (`rounded-none`, `rounded-sm`)
- ❌ Solid colored buttons without gradients
- ❌ Drop shadows without blur/spread (`shadow-md` — use `shadow-2xl shadow-black/60` or colored glow)

## Layout Grid System
Use Tailwind's responsive grid:
- **Dashboard**: `grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4`
- **Content pages**: `max-w-7xl mx-auto` with consistent `px-8 py-8` padding
- **Forms**: `space-y-5` for form groups, `flex items-center justify-end gap-3` for button rows

## Recommended Fonts
- **Headings**: `font-black tracking-tighter`
- **Body**: `font-medium` or `font-normal`
- **Captions/Labels**: `text-[11px] uppercase tracking-wider font-semibold`
- **Code/Mono**: `font-mono` for IDs, amounts, code snippets