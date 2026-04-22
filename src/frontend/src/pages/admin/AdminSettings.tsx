import type { SiteSettings } from "@/backend.d";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useBackend";
import {
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Save,
  Settings,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FIELD_CONFIG: {
  key: keyof SiteSettings;
  label: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
}[] = [
  {
    key: "heroText",
    label: "Hero Headline",
    placeholder: "Main headline on the homepage",
    icon: Globe,
  },
  {
    key: "heroSubtext",
    label: "Hero Subtext",
    placeholder: "Supporting text below the headline",
    icon: Globe,
  },
  {
    key: "ctaText",
    label: "CTA Button Text",
    placeholder: "e.g. Explore Courses",
    icon: Globe,
  },
  {
    key: "contactEmail",
    label: "Contact Email",
    placeholder: "hello@arthashastra.com",
    icon: Mail,
    type: "email",
  },
  {
    key: "contactPhone",
    label: "Contact Phone",
    placeholder: "+91-XXXXXXXXXX",
    icon: Phone,
  },
  {
    key: "whatsappNumber",
    label: "WhatsApp Number",
    placeholder: "+91-XXXXXXXXXX",
    icon: MessageSquare,
  },
  {
    key: "contactAddress",
    label: "Address",
    placeholder: "Arthashastra Classes, Bhopal, MP",
    icon: MapPin,
  },
  {
    key: "instagramUrl",
    label: "Instagram URL",
    placeholder: "https://instagram.com/arthashastra",
    icon: Globe,
  },
  {
    key: "youtubeUrl",
    label: "YouTube URL",
    placeholder: "https://youtube.com/@arthashastra",
    icon: Youtube,
  },
  {
    key: "telegramUrl",
    label: "Telegram URL",
    placeholder: "https://t.me/arthashastra",
    icon: MessageSquare,
  },
  {
    key: "linkedinUrl",
    label: "LinkedIn URL",
    placeholder: "https://linkedin.com/company/arthashastra",
    icon: Globe,
  },
];

function SettingField({
  fieldKey,
  label,
  placeholder,
  icon: Icon,
  type = "text",
  value,
  onChange,
}: {
  fieldKey: keyof SiteSettings;
  label: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="admin-form-field"
      data-ocid={`admin.settings.${fieldKey}.input`}
    >
      <label
        htmlFor={`sf-${fieldKey}`}
        className="admin-form-label flex items-center gap-1.5"
      >
        <Icon className="w-3.5 h-3.5 text-cyan-400" />
        {label}
      </label>
      <input
        id={`sf-${fieldKey}`}
        type={type}
        className="admin-form-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const DEFAULT_SETTINGS: SiteSettings = {
  heroText: "",
  heroSubtext: "",
  ctaText: "",
  contactEmail: "",
  contactPhone: "",
  whatsappNumber: "",
  contactAddress: "",
  instagramUrl: "",
  youtubeUrl: "",
  telegramUrl: "",
  linkedinUrl: "",
};

export default function AdminSettings() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const [form, setForm] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm(settings);
      setIsDirty(false);
    }
  }, [settings]);

  const setField = (key: keyof SiteSettings, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings.mutateAsync(form);
      toast.success("Settings saved successfully.");
      setIsDirty(false);
    } catch {
      toast.error("Failed to save settings.");
    }
  };

  return (
    <div data-ocid="admin.settings.page">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl font-extrabold text-foreground">
            Site Settings
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage homepage content, contact details, and social links
          </p>
        </div>
        {isDirty && (
          <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full font-semibold">
            Unsaved changes
          </span>
        )}
      </div>

      {isLoading ? (
        <div
          className="glass-morphism rounded-xl border border-white/10 p-8 flex flex-col items-center gap-4"
          data-ocid="admin.settings.loading_state"
        >
          <Settings className="w-8 h-8 text-cyan-400/40 animate-spin" />
          <p className="text-muted-foreground text-sm">Loading settings…</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Content section */}
          <div className="glass-morphism rounded-xl border border-white/10 p-6">
            <h2 className="font-display font-bold text-foreground mb-5 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" /> Homepage Content
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FIELD_CONFIG.slice(0, 3).map(
                ({ key, label, placeholder, icon, type }) => (
                  <SettingField
                    key={key}
                    fieldKey={key}
                    label={label}
                    placeholder={placeholder}
                    icon={icon}
                    type={type}
                    value={form[key]}
                    onChange={(v) => setField(key, v)}
                  />
                ),
              )}
            </div>
          </div>

          {/* Contact section */}
          <div className="glass-morphism rounded-xl border border-white/10 p-6">
            <h2 className="font-display font-bold text-foreground mb-5 flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" /> Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FIELD_CONFIG.slice(3, 7).map(
                ({ key, label, placeholder, icon, type }) => (
                  <SettingField
                    key={key}
                    fieldKey={key}
                    label={label}
                    placeholder={placeholder}
                    icon={icon}
                    type={type}
                    value={form[key]}
                    onChange={(v) => setField(key, v)}
                  />
                ),
              )}
            </div>
          </div>

          {/* Social links section */}
          <div className="glass-morphism rounded-xl border border-white/10 p-6">
            <h2 className="font-display font-bold text-foreground mb-5 flex items-center gap-2">
              <Youtube className="w-4 h-4 text-cyan-400" /> Social Media Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FIELD_CONFIG.slice(7).map(
                ({ key, label, placeholder, icon, type }) => (
                  <SettingField
                    key={key}
                    fieldKey={key}
                    label={label}
                    placeholder={placeholder}
                    icon={icon}
                    type={type}
                    value={form[key]}
                    onChange={(v) => setField(key, v)}
                  />
                ),
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updateSettings.isPending || !isDirty}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50"
              data-ocid="admin.settings.save.submit_button"
            >
              <Save className="w-4 h-4" />
              {updateSettings.isPending ? "Saving…" : "Save Settings"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
