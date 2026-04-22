import { c as createLucideIcon, aJ as useAdminCoupons, aK as useCreateCoupon, aL as useUpdateCoupon, aM as useDeleteCoupon, r as reactExports, j as jsxRuntimeExports, T as Tag, A as AnimatePresence, w as ue, m as motion, aN as DiscountType, X } from "./index-lv5lHg54.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction, T as Trash2 } from "./alert-dialog-D66AY3id.js";
import { S as Skeleton } from "./skeleton-BH48xlqF.js";
import { P as Plus } from "./plus-BFzoboAS.js";
import { C as Copy } from "./copy-CU7fC38f.js";
import { P as Pencil } from "./pencil-CPKiGrcr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 15h.01", key: "lqbp3k" }]
];
const BadgePercent = createLucideIcon("badge-percent", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function tsToDatetimeLocal(ts) {
  const ms = Number(ts / 1000000n);
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function datetimeLocalToTs(val) {
  return BigInt(new Date(val).getTime()) * 1000000n;
}
function CouponForm({
  initial,
  onSave,
  onClose,
  isSaving
}) {
  const [form, setForm] = reactExports.useState({
    code: (initial == null ? void 0 : initial.code) ?? "",
    discountType: (initial == null ? void 0 : initial.discountType) ?? DiscountType.percent,
    value: (initial == null ? void 0 : initial.value) ?? 10,
    maxUses: (initial == null ? void 0 : initial.maxUses) ?? 100n,
    isActive: (initial == null ? void 0 : initial.isActive) ?? true,
    expiresAt: initial == null ? void 0 : initial.expiresAt
  });
  const [expiresAtLocal, setExpiresAtLocal] = reactExports.useState(
    (initial == null ? void 0 : initial.expiresAt) ? tsToDatetimeLocal(initial.expiresAt) : ""
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleExpiresChange = (val) => {
    setExpiresAtLocal(val);
    set("expiresAt", val ? datetimeLocalToTs(val) : void 0);
  };
  const submit = (e) => {
    e.preventDefault();
    if (!form.code.trim()) {
      ue.error("Coupon code is required.");
      return;
    }
    if (form.value <= 0) {
      ue.error("Discount value must be greater than 0.");
      return;
    }
    onSave(form);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "admin-modal-overlay",
      "data-ocid": "admin.coupons.dialog",
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: 8 },
          className: "admin-modal-content",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: initial ? "Edit Coupon" : "Create Coupon" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: initial ? "Update this discount code" : "Add a discount code for students" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth",
                  "aria-label": "Close",
                  "data-ocid": "admin.coupons.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-code", className: "admin-form-label", children: "Coupon Code *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "cf-code",
                    required: true,
                    className: "admin-form-input uppercase tracking-widest font-mono",
                    placeholder: "e.g. WELCOME20",
                    value: form.code,
                    onChange: (e) => set("code", e.target.value.toUpperCase()),
                    "data-ocid": "admin.coupons.code.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-type", className: "admin-form-label", children: "Discount Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "cf-type",
                      className: "admin-form-input",
                      value: form.discountType,
                      onChange: (e) => set("discountType", e.target.value),
                      "data-ocid": "admin.coupons.type.select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: DiscountType.percent, children: "Percentage (%)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: DiscountType.flat, children: "Fixed Amount (₹)" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "cf-value", className: "admin-form-label", children: [
                    "Value",
                    " ",
                    form.discountType === DiscountType.percent ? "(%)" : "(₹)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "cf-value",
                      type: "number",
                      min: 1,
                      max: form.discountType === DiscountType.percent ? 100 : void 0,
                      className: "admin-form-input",
                      value: form.value,
                      onChange: (e) => set("value", Number(e.target.value)),
                      "data-ocid": "admin.coupons.value.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-max", className: "admin-form-label", children: "Max Uses" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "cf-max",
                      type: "number",
                      min: 1,
                      className: "admin-form-input",
                      value: Number(form.maxUses),
                      onChange: (e) => set(
                        "maxUses",
                        BigInt(Math.max(1, Number(e.target.value) || 1))
                      ),
                      "data-ocid": "admin.coupons.max_uses.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-form-field", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cf-expires", className: "admin-form-label", children: "Expires At (optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "cf-expires",
                      type: "datetime-local",
                      className: "admin-form-input",
                      value: expiresAtLocal,
                      onChange: (e) => handleExpiresChange(e.target.value),
                      "data-ocid": "admin.coupons.expires_at.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "cf-active",
                    type: "checkbox",
                    checked: form.isActive,
                    onChange: (e) => set("isActive", e.target.checked),
                    className: "w-4 h-4 accent-cyan-400",
                    "data-ocid": "admin.coupons.active.checkbox"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "cf-active",
                    className: "text-sm text-muted-foreground cursor-pointer",
                    children: "Active (usable by students)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth",
                    "data-ocid": "admin.coupons.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    disabled: isSaving,
                    className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2",
                    "data-ocid": "admin.coupons.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                      isSaving ? "Saving…" : initial ? "Save Changes" : "Create Coupon"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function UsageBar({ used, max }) {
  const usedN = Number(used);
  const maxN = Number(max);
  const pct = maxN > 0 ? Math.min(100, Math.round(usedN / maxN * 100)) : 0;
  const color = pct >= 90 ? "from-red-500 to-red-400" : pct >= 60 ? "from-amber-500 to-amber-400" : "from-cyan-500 to-violet-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-[100px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full bg-gradient-to-r ${color} transition-smooth`,
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0", children: [
      usedN,
      "/",
      maxN
    ] })
  ] });
}
function CouponRow({
  coupon,
  index,
  onEdit,
  onDelete
}) {
  const handleCopy = () => {
    void navigator.clipboard.writeText(coupon.code);
    ue.success(`Copied "${coupon.code}"`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.tr,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: index * 0.03 },
      className: "admin-table-row-hover",
      "data-ocid": `admin.coupons.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgePercent, { className: "w-4 h-4 text-violet-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-cyan-400 text-sm tracking-wider", children: coupon.code }),
            !coupon.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded-full", children: "Inactive" })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `admin-badge text-xs ${coupon.discountType === DiscountType.percent ? "badge-primary" : "badge-warning"}`,
            children: coupon.discountType === DiscountType.percent ? `${coupon.value}% off` : `₹${coupon.value} off`
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsageBar, { used: coupon.usedCount, max: coupon.maxUses }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-xs", children: coupon.expiresAt ? formatDate(coupon.expiresAt) : "Never" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: coupon.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-badge badge-success text-xs", children: "Active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-badge text-muted-foreground border border-white/10 text-xs", children: "Inactive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td text-muted-foreground text-xs", children: formatDate(coupon.createdAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "admin-table-td", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleCopy,
              className: "admin-action-btn admin-action-btn-edit",
              "data-ocid": `admin.coupons.copy_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                " Copy"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onEdit,
              className: "admin-action-btn admin-action-btn-edit",
              "data-ocid": `admin.coupons.edit_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                " Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onDelete,
              className: "admin-action-btn admin-action-btn-delete",
              "data-ocid": `admin.coupons.delete_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                " Delete"
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
function AdminCoupons() {
  const { data: coupons = [], isLoading } = useAdminCoupons();
  const createCoupon = useCreateCoupon();
  const updateCoupon = useUpdateCoupon();
  const deleteCoupon = useDeleteCoupon();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState();
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const handleSave = async (data) => {
    try {
      if (editing) {
        await updateCoupon.mutateAsync({ id: editing.id, input: data });
        ue.success("Coupon updated.");
      } else {
        await createCoupon.mutateAsync(data);
        ue.success("Coupon created.");
      }
      setShowForm(false);
      setEditing(void 0);
    } catch {
      ue.error("Failed to save coupon.");
    }
  };
  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteCoupon.mutateAsync(deletingId);
      ue.success("Coupon deleted.");
    } catch {
      ue.error("Failed to delete coupon.");
    } finally {
      setDeletingId(null);
    }
  };
  const activeCoupons = coupons.filter((c) => c.isActive).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.coupons.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Coupons" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          coupons.length,
          " coupon",
          coupons.length !== 1 ? "s" : "",
          " —",
          " ",
          activeCoupons,
          " active"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setEditing(void 0);
            setShowForm(true);
          },
          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0",
          "data-ocid": "admin.coupons.add.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            " Create Coupon"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3",
        "data-ocid": "admin.coupons.loading_state",
        children: ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg bg-white/5" }, k))
      }
    ) : coupons.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4",
        "data-ocid": "admin.coupons.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-10 h-10 text-cyan-400/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "No coupons yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Create discount codes for admissions and promotions." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setEditing(void 0);
                setShowForm(true);
              },
              className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow",
              "data-ocid": "admin.coupons.empty.add.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                " Create First Coupon"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-morphism rounded-xl border border-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-data-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "admin-table-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Discount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Usage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Expires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "admin-table-th", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: coupons.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CouponRow,
        {
          coupon: c,
          index: i,
          onEdit: () => {
            setEditing(c);
            setShowForm(true);
          },
          onDelete: () => setDeletingId(c.id)
        },
        c.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CouponForm,
      {
        initial: editing,
        onSave: handleSave,
        onClose: () => {
          setShowForm(false);
          setEditing(void 0);
        },
        isSaving: createCoupon.isPending || updateCoupon.isPending
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deletingId !== null,
        onOpenChange: (open) => !open && setDeletingId(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          AlertDialogContent,
          {
            className: "glass-morphism border border-white/10",
            "data-ocid": "admin.coupons.delete.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display text-foreground", children: "Delete Coupon?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This coupon code will be permanently removed and can no longer be used by students." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "glass-morphism border border-white/10 text-muted-foreground hover:text-foreground",
                    "data-ocid": "admin.coupons.delete.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleConfirmDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "admin.coupons.delete.confirm_button",
                    children: "Delete"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AdminCoupons as default
};
