import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { S as SiteNav } from "./SiteNav-BaCidO1A.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { S as Switch } from "./switch-DkA5ZPe7.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as listCoupons, u as upsertCoupon, d as deleteCoupon } from "./coupons.functions-Courpk9F.mjs";
import "../_libs/seroval.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import "../_libs/i18next.mjs";
import "../_libs/i18next-browser-languagedetector+[...].mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase__storage.mjs";
import { I as ArrowLeft, ai as Tag, az as Plus, aE as Percent, al as IndianRupee, L as LoaderCircle, aD as Pencil, at as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./router-BBmNS5j3.mjs";
import "./server-CtNwD_lG.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-CZNhPrkM.mjs";
import "./client.server-B5gl9oyA.mjs";
import "./client-DwVEAZaB.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "fs";
import "os";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "zlib";
import "../_libs/@grpc/proto-loader.mjs";
import "path";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
import "../_libs/re2js.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const empty = () => ({
  code: "",
  description: "",
  discount_type: "percent",
  discount_value: 10,
  max_uses: null,
  valid_from: "",
  valid_until: "",
  is_active: true
});
function AdminCoupons() {
  const qc = useQueryClient();
  const listFn = useServerFn(listCoupons);
  const saveFn = useServerFn(upsertCoupon);
  const delFn = useServerFn(deleteCoupon);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => listFn()
  });
  const [form, setForm] = reactExports.useState(null);
  const save = useMutation({
    mutationFn: (v) => saveFn({
      data: {
        id: v.id,
        code: v.code,
        description: v.description || null,
        discount_type: v.discount_type,
        discount_value: v.discount_value,
        max_uses: v.max_uses || null,
        valid_from: v.valid_from || null,
        valid_until: v.valid_until || null,
        is_active: v.is_active
      }
    }),
    onSuccess: () => {
      toast.success("Coupon saved");
      setForm(null);
      qc.invalidateQueries({
        queryKey: ["coupons"]
      });
    },
    onError: (e) => toast.error(e?.message || "Save failed")
  });
  const del = useMutation({
    mutationFn: (id) => delFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({
        queryKey: ["coupons"]
      });
    }
  });
  const coupons = data?.coupons ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 pt-28 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Dashboard"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-7 w-7 text-primary-glow" }),
            " Coupons"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Promo codes students can apply at checkout." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow text-primary-foreground", onClick: () => setForm(empty()), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New coupon"
        ] })
      ] }),
      form && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 card-3d rounded-2xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold mb-4", children: [
          form.id ? "Edit" : "Create",
          " coupon"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Code (uppercase, A-Z 0-9 _ -)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.code, onChange: (e) => setForm({
              ...form,
              code: e.target.value.toUpperCase()
            }), placeholder: "LAUNCH50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.description, onChange: (e) => setForm({
              ...form,
              description: e.target.value
            }), placeholder: "Launch offer — 50% off" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Discount type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.discount_type, onChange: (e) => setForm({
              ...form,
              discount_type: e.target.value
            }), className: "mt-2 block h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "percent", children: "Percent (%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "flat", children: "Flat (₹)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Discount value" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2", children: [
              form.discount_type === "percent" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: form.discount_value, onChange: (e) => setForm({
                ...form,
                discount_value: Number(e.target.value)
              }), className: "pl-9" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Max uses (blank = unlimited)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: form.max_uses ?? "", onChange: (e) => setForm({
              ...form,
              max_uses: e.target.value ? Number(e.target.value) : null
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: form.is_active, onCheckedChange: (v) => setForm({
              ...form,
              is_active: v
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Active" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Valid from" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "datetime-local", value: form.valid_from, onChange: (e) => setForm({
              ...form,
              valid_from: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Valid until" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "datetime-local", value: form.valid_until, onChange: (e) => setForm({
              ...form,
              valid_until: e.target.value
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setForm(null), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow text-primary-foreground", disabled: save.isPending || !form.code || form.code.length < 3, onClick: () => save.mutate(form), children: [
            save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null,
            " Save coupon"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) }) : coupons.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d rounded-2xl p-10 text-center text-muted-foreground", children: "No coupons yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d overflow-x-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Discount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Used" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Validity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: coupons.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: c.code }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: c.discount_type === "percent" ? `${c.discount_value}%` : `₹${Number(c.discount_value).toLocaleString()}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground", children: [
            c.used_count,
            c.max_uses ? ` / ${c.max_uses}` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: [
            c.valid_from ? new Date(c.valid_from).toLocaleDateString() : "—",
            " →",
            " ",
            c.valid_until ? new Date(c.valid_until).toLocaleDateString() : "—"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs ${c.is_active ? "bg-primary/15 text-primary-glow" : "bg-muted text-muted-foreground"}`, children: c.is_active ? "Active" : "Inactive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setForm({
              id: c.id,
              code: c.code,
              description: c.description || "",
              discount_type: c.discount_type,
              discount_value: Number(c.discount_value),
              max_uses: c.max_uses,
              valid_from: c.valid_from?.slice(0, 16) || "",
              valid_until: c.valid_until?.slice(0, 16) || "",
              is_active: c.is_active
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
              if (confirm(`Delete ${c.code}?`)) del.mutate(c.id);
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
          ] }) })
        ] }, c.id)) })
      ] }) }) })
    ] })
  ] });
}
export {
  AdminCoupons as component
};
