import { c as createLucideIcon, aF as useSiteSettings, aG as useUpdateSiteSettings, r as reactExports, j as jsxRuntimeExports, aH as Settings, I as Mail, P as Phone, b as MapPin, aI as Youtube, w as ue } from "./index-lv5lHg54.js";
import { G as Globe } from "./globe-DRed6-0-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const FIELD_CONFIG = [
  {
    key: "heroText",
    label: "Hero Headline",
    placeholder: "Main headline on the homepage",
    icon: Globe
  },
  {
    key: "heroSubtext",
    label: "Hero Subtext",
    placeholder: "Supporting text below the headline",
    icon: Globe
  },
  {
    key: "ctaText",
    label: "CTA Button Text",
    placeholder: "e.g. Explore Courses",
    icon: Globe
  },
  {
    key: "contactEmail",
    label: "Contact Email",
    placeholder: "hello@arthashastra.com",
    icon: Mail,
    type: "email"
  },
  {
    key: "contactPhone",
    label: "Contact Phone",
    placeholder: "+91-XXXXXXXXXX",
    icon: Phone
  },
  {
    key: "whatsappNumber",
    label: "WhatsApp Number",
    placeholder: "+91-XXXXXXXXXX",
    icon: MessageSquare
  },
  {
    key: "contactAddress",
    label: "Address",
    placeholder: "Arthashastra Classes, Bhopal, MP",
    icon: MapPin
  },
  {
    key: "instagramUrl",
    label: "Instagram URL",
    placeholder: "https://instagram.com/arthashastra",
    icon: Globe
  },
  {
    key: "youtubeUrl",
    label: "YouTube URL",
    placeholder: "https://youtube.com/@arthashastra",
    icon: Youtube
  },
  {
    key: "telegramUrl",
    label: "Telegram URL",
    placeholder: "https://t.me/arthashastra",
    icon: MessageSquare
  },
  {
    key: "linkedinUrl",
    label: "LinkedIn URL",
    placeholder: "https://linkedin.com/company/arthashastra",
    icon: Globe
  }
];
function SettingField({
  fieldKey,
  label,
  placeholder,
  icon: Icon,
  type = "text",
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "admin-form-field",
      "data-ocid": `admin.settings.${fieldKey}.input`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: `sf-${fieldKey}`,
            className: "admin-form-label flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-cyan-400" }),
              label
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: `sf-${fieldKey}`,
            type,
            className: "admin-form-input",
            placeholder,
            value,
            onChange: (e) => onChange(e.target.value)
          }
        )
      ]
    }
  );
}
const DEFAULT_SETTINGS = {
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
  linkedinUrl: ""
};
function AdminSettings() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const [form, setForm] = reactExports.useState(DEFAULT_SETTINGS);
  const [isDirty, setIsDirty] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (settings) {
      setForm(settings);
      setIsDirty(false);
    }
  }, [settings]);
  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setIsDirty(true);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateSettings.mutateAsync(form);
      ue.success("Settings saved successfully.");
      setIsDirty(false);
    } catch {
      ue.error("Failed to save settings.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin.settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-8 gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1", children: "Admin Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-extrabold text-foreground", children: "Site Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage homepage content, contact details, and social links" })
      ] }),
      isDirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full font-semibold", children: "Unsaved changes" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-morphism rounded-xl border border-white/10 p-8 flex flex-col items-center gap-4",
        "data-ocid": "admin.settings.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-8 h-8 text-cyan-400/40 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Loading settings…" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl border border-white/10 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-foreground mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-cyan-400" }),
          " Homepage Content"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: FIELD_CONFIG.slice(0, 3).map(
          ({ key, label, placeholder, icon, type }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingField,
            {
              fieldKey: key,
              label,
              placeholder,
              icon,
              type,
              value: form[key],
              onChange: (v) => setField(key, v)
            },
            key
          )
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl border border-white/10 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-foreground mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-cyan-400" }),
          " Contact Information"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: FIELD_CONFIG.slice(3, 7).map(
          ({ key, label, placeholder, icon, type }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingField,
            {
              fieldKey: key,
              label,
              placeholder,
              icon,
              type,
              value: form[key],
              onChange: (v) => setField(key, v)
            },
            key
          )
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-morphism rounded-xl border border-white/10 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-foreground mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-4 h-4 text-cyan-400" }),
          " Social Media Links"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: FIELD_CONFIG.slice(7).map(
          ({ key, label, placeholder, icon, type }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingField,
            {
              fieldKey: key,
              label,
              placeholder,
              icon,
              type,
              value: form[key],
              onChange: (v) => setField(key, v)
            },
            key
          )
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          disabled: updateSettings.isPending || !isDirty,
          className: "flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-smooth disabled:opacity-50",
          "data-ocid": "admin.settings.save.submit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            updateSettings.isPending ? "Saving…" : "Save Settings"
          ]
        }
      ) })
    ] })
  ] });
}
export {
  AdminSettings as default
};
