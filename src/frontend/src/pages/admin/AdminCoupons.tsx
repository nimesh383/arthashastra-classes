import type { Coupon, CouponInput } from "@/backend.d";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminCoupons,
  useCreateCoupon,
  useDeleteCoupon,
  useUpdateCoupon,
} from "@/hooks/useBackend";
import { DiscountType } from "@/types";
import { BadgePercent, Copy, Pencil, Plus, Tag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function tsToDatetimeLocal(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function datetimeLocalToTs(val: string): bigint {
  return BigInt(new Date(val).getTime()) * 1_000_000n;
}

function CouponForm({
  initial,
  onSave,
  onClose,
  isSaving,
}: {
  initial?: Coupon;
  onSave: (data: CouponInput) => void;
  onClose: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<CouponInput>({
    code: initial?.code ?? "",
    discountType: initial?.discountType ?? DiscountType.percent,
    value: initial?.value ?? 10,
    maxUses: initial?.maxUses ?? 100n,
    isActive: initial?.isActive ?? true,
    expiresAt: initial?.expiresAt,
  });
  const [expiresAtLocal, setExpiresAtLocal] = useState<string>(
    initial?.expiresAt ? tsToDatetimeLocal(initial.expiresAt) : "",
  );

  const set = <K extends keyof CouponInput>(k: K, v: CouponInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleExpiresChange = (val: string) => {
    setExpiresAtLocal(val);
    set("expiresAt", val ? datetimeLocalToTs(val) : undefined);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) {
      toast.error("Coupon code is required.");
      return;
    }
    if (form.value <= 0) {
      toast.error("Discount value must be greater than 0.");
      return;
    }
    onSave(form);
  };

  return (
    <div
      className="admin-modal-overlay"
      data-ocid="admin.coupons.dialog"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        className="admin-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              {initial ? "Edit Coupon" : "Create Coupon"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {initial
                ? "Update this discount code"
                : "Add a discount code for students"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close"
            data-ocid="admin.coupons.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="admin-form-field">
            <label htmlFor="cf-code" className="admin-form-label">
              Coupon Code *
            </label>
            <input
              id="cf-code"
              required
              className="admin-form-input uppercase tracking-widest font-mono"
              placeholder="e.g. WELCOME20"
              value={form.code}
              onChange={(e) => set("code", e.target.value.toUpperCase())}
              data-ocid="admin.coupons.code.input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="admin-form-field">
              <label htmlFor="cf-type" className="admin-form-label">
                Discount Type
              </label>
              <select
                id="cf-type"
                className="admin-form-input"
                value={form.discountType}
                onChange={(e) =>
                  set("discountType", e.target.value as DiscountType)
                }
                data-ocid="admin.coupons.type.select"
              >
                <option value={DiscountType.percent}>Percentage (%)</option>
                <option value={DiscountType.flat}>Fixed Amount (₹)</option>
              </select>
            </div>
            <div className="admin-form-field">
              <label htmlFor="cf-value" className="admin-form-label">
                Value{" "}
                {form.discountType === DiscountType.percent ? "(%)" : "(₹)"}
              </label>
              <input
                id="cf-value"
                type="number"
                min={1}
                max={
                  form.discountType === DiscountType.percent ? 100 : undefined
                }
                className="admin-form-input"
                value={form.value}
                onChange={(e) => set("value", Number(e.target.value))}
                data-ocid="admin.coupons.value.input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="admin-form-field">
              <label htmlFor="cf-max" className="admin-form-label">
                Max Uses
              </label>
              <input
                id="cf-max"
                type="number"
                min={1}
                className="admin-form-input"
                value={Number(form.maxUses)}
                onChange={(e) =>
                  set(
                    "maxUses",
                    BigInt(Math.max(1, Number(e.target.value) || 1)),
                  )
                }
                data-ocid="admin.coupons.max_uses.input"
              />
            </div>
            <div className="admin-form-field">
              <label htmlFor="cf-expires" className="admin-form-label">
                Expires At (optional)
              </label>
              <input
                id="cf-expires"
                type="datetime-local"
                className="admin-form-input"
                value={expiresAtLocal}
                onChange={(e) => handleExpiresChange(e.target.value)}
                data-ocid="admin.coupons.expires_at.input"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="cf-active"
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
              className="w-4 h-4 accent-cyan-400"
              data-ocid="admin.coupons.active.checkbox"
            />
            <label
              htmlFor="cf-active"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Active (usable by students)
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass-morphism border border-white/10 text-muted-foreground hover:text-foreground text-sm font-medium transition-smooth"
              data-ocid="admin.coupons.cancel_button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
              data-ocid="admin.coupons.submit_button"
            >
              <Plus className="w-4 h-4" />
              {isSaving
                ? "Saving…"
                : initial
                  ? "Save Changes"
                  : "Create Coupon"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function UsageBar({ used, max }: { used: bigint; max: bigint }) {
  const usedN = Number(used);
  const maxN = Number(max);
  const pct = maxN > 0 ? Math.min(100, Math.round((usedN / maxN) * 100)) : 0;
  const color =
    pct >= 90
      ? "from-red-500 to-red-400"
      : pct >= 60
        ? "from-amber-500 to-amber-400"
        : "from-cyan-500 to-violet-500";
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-smooth`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground shrink-0">
        {usedN}/{maxN}
      </span>
    </div>
  );
}

function CouponRow({
  coupon,
  index,
  onEdit,
  onDelete,
}: {
  coupon: Coupon;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const handleCopy = () => {
    void navigator.clipboard.writeText(coupon.code);
    toast.success(`Copied "${coupon.code}"`);
  };

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.03 }}
      className="admin-table-row-hover"
      data-ocid={`admin.coupons.item.${index + 1}`}
    >
      <td className="admin-table-td">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
            <BadgePercent className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-cyan-400 text-sm tracking-wider">
                {coupon.code}
              </span>
              {!coupon.isActive && (
                <span className="text-[10px] text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded-full">
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="admin-table-td">
        <span
          className={`admin-badge text-xs ${coupon.discountType === DiscountType.percent ? "badge-primary" : "badge-warning"}`}
        >
          {coupon.discountType === DiscountType.percent
            ? `${coupon.value}% off`
            : `₹${coupon.value} off`}
        </span>
      </td>
      <td className="admin-table-td">
        <UsageBar used={coupon.usedCount} max={coupon.maxUses} />
      </td>
      <td className="admin-table-td text-muted-foreground text-xs">
        {coupon.expiresAt ? formatDate(coupon.expiresAt) : "Never"}
      </td>
      <td className="admin-table-td">
        {coupon.isActive ? (
          <span className="admin-badge badge-success text-xs">Active</span>
        ) : (
          <span className="admin-badge text-muted-foreground border border-white/10 text-xs">
            Inactive
          </span>
        )}
      </td>
      <td className="admin-table-td text-muted-foreground text-xs">
        {formatDate(coupon.createdAt)}
      </td>
      <td className="admin-table-td">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="admin-action-btn admin-action-btn-edit"
            data-ocid={`admin.coupons.copy_button.${index + 1}`}
          >
            <Copy className="w-3.5 h-3.5" /> Copy
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="admin-action-btn admin-action-btn-edit"
            data-ocid={`admin.coupons.edit_button.${index + 1}`}
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="admin-action-btn admin-action-btn-delete"
            data-ocid={`admin.coupons.delete_button.${index + 1}`}
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

export default function AdminCoupons() {
  const { data: coupons = [], isLoading } = useAdminCoupons();
  const createCoupon = useCreateCoupon();
  const updateCoupon = useUpdateCoupon();
  const deleteCoupon = useDeleteCoupon();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Coupon | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (data: CouponInput) => {
    try {
      if (editing) {
        await updateCoupon.mutateAsync({ id: editing.id, input: data });
        toast.success("Coupon updated.");
      } else {
        await createCoupon.mutateAsync(data);
        toast.success("Coupon created.");
      }
      setShowForm(false);
      setEditing(undefined);
    } catch {
      toast.error("Failed to save coupon.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteCoupon.mutateAsync(deletingId);
      toast.success("Coupon deleted.");
    } catch {
      toast.error("Failed to delete coupon.");
    } finally {
      setDeletingId(null);
    }
  };

  const activeCoupons = coupons.filter((c) => c.isActive).length;

  return (
    <div data-ocid="admin.coupons.page">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Coupons
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {coupons.length} coupon{coupons.length !== 1 ? "s" : ""} —{" "}
            {activeCoupons} active
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(undefined);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth shrink-0"
          data-ocid="admin.coupons.add.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {isLoading ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 p-4 flex flex-col gap-3"
          data-ocid="admin.coupons.loading_state"
        >
          {(["s1", "s2", "s3"] as const).map((k) => (
            <Skeleton key={k} className="h-12 w-full rounded-lg bg-white/5" />
          ))}
        </div>
      ) : coupons.length === 0 ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 py-16 flex flex-col items-center gap-4"
          data-ocid="admin.coupons.empty_state"
        >
          <Tag className="w-10 h-10 text-cyan-400/40" />
          <p className="text-foreground font-semibold">No coupons yet</p>
          <p className="text-muted-foreground text-sm">
            Create discount codes for admissions and promotions.
          </p>
          <button
            type="button"
            onClick={() => {
              setEditing(undefined);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow"
            data-ocid="admin.coupons.empty.add.button"
          >
            <Plus className="w-4 h-4" /> Create First Coupon
          </button>
        </div>
      ) : (
        <div className="glass-morphism rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-data-table">
              <thead className="admin-table-header">
                <tr>
                  <th className="admin-table-th">Code</th>
                  <th className="admin-table-th">Discount</th>
                  <th className="admin-table-th">Usage</th>
                  <th className="admin-table-th">Expires</th>
                  <th className="admin-table-th">Status</th>
                  <th className="admin-table-th">Created</th>
                  <th className="admin-table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c, i) => (
                  <CouponRow
                    key={c.id}
                    coupon={c}
                    index={i}
                    onEdit={() => {
                      setEditing(c);
                      setShowForm(true);
                    }}
                    onDelete={() => setDeletingId(c.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <CouponForm
            initial={editing}
            onSave={handleSave}
            onClose={() => {
              setShowForm(false);
              setEditing(undefined);
            }}
            isSaving={createCoupon.isPending || updateCoupon.isPending}
          />
        )}
      </AnimatePresence>

      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent
          className="glass-morphism border border-white/10"
          data-ocid="admin.coupons.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete Coupon?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This coupon code will be permanently removed and can no longer be
              used by students.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="glass-morphism border border-white/10 text-muted-foreground hover:text-foreground"
              data-ocid="admin.coupons.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin.coupons.delete.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
