import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { S as SiteNav } from "./SiteNav-BaCidO1A.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { T as Textarea } from "./textarea-F69quoCd.mjs";
import { S as Switch } from "./switch-DkA5ZPe7.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { M as MediaUpload } from "./MediaUpload-BTrj8f5A.mjs";
import { a as listAllShopProducts, u as upsertShopProduct, d as deleteShopProduct } from "./shop.functions-C13zzGe6.mjs";
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
import { I as ArrowLeft, h as ShoppingBag, az as Plus, L as LoaderCircle, aD as Pencil, at as Trash2 } from "../_libs/lucide-react.mjs";
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
  name: "",
  slug: "",
  description: "",
  price: 0,
  compare_at_price: null,
  currency: "INR",
  image_url: "",
  category: "merch",
  stock: 0,
  badge: "",
  is_active: true,
  sort_order: 0,
  buy_url: ""
});
function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function AdminShop() {
  const qc = useQueryClient();
  const listFn = useServerFn(listAllShopProducts);
  const saveFn = useServerFn(upsertShopProduct);
  const delFn = useServerFn(deleteShopProduct);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin", "shop"],
    queryFn: () => listFn()
  });
  const [form, setForm] = reactExports.useState(null);
  const save = useMutation({
    mutationFn: (v) => saveFn({
      data: {
        id: v.id,
        name: v.name,
        slug: v.slug || slugify(v.name),
        description: v.description || null,
        price: v.price,
        compare_at_price: v.compare_at_price || null,
        currency: v.currency || "INR",
        image_url: v.image_url || null,
        category: v.category,
        stock: v.stock,
        badge: v.badge || null,
        is_active: v.is_active,
        sort_order: v.sort_order,
        buy_url: v.buy_url || null
      }
    }),
    onSuccess: () => {
      toast.success("Product saved");
      setForm(null);
      qc.invalidateQueries({
        queryKey: ["admin", "shop"]
      });
      qc.invalidateQueries({
        queryKey: ["shop"]
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
        queryKey: ["admin", "shop"]
      });
      qc.invalidateQueries({
        queryKey: ["shop"]
      });
    }
  });
  const products = data?.products ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 pt-28 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Dashboard"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-7 w-7 text-primary-glow" }),
            " Shop products"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage robotics kits, merch and accessories shown on the store page." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow text-primary-foreground", onClick: () => setForm(empty()), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New product"
        ] })
      ] }),
      form && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 card-3d rounded-2xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold mb-4", children: [
          form.id ? "Edit" : "Create",
          " product"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.name, onChange: (e) => setForm({
              ...form,
              name: e.target.value,
              slug: form.slug || slugify(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Slug (URL)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.slug, onChange: (e) => setForm({
              ...form,
              slug: slugify(e.target.value)
            }), placeholder: "auto from name" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.category, onChange: (e) => setForm({
              ...form,
              category: e.target.value
            }), placeholder: "robotics / apparel / merch" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: form.description, onChange: (e) => setForm({
              ...form,
              description: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MediaUpload, { value: form.image_url, onChange: (url) => setForm({
              ...form,
              image_url: url
            }), accept: "image/*", folder: "shop" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.price, onChange: (e) => setForm({
              ...form,
              price: Number(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Compare-at price (₹, optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.compare_at_price ?? "", onChange: (e) => setForm({
              ...form,
              compare_at_price: e.target.value ? Number(e.target.value) : null
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: form.stock, onChange: (e) => setForm({
              ...form,
              stock: Number(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Badge (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.badge, onChange: (e) => setForm({
              ...form,
              badge: e.target.value
            }), placeholder: "Bestseller / New" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Sort order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.sort_order, onChange: (e) => setForm({
              ...form,
              sort_order: Number(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Razorpay / Buy link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "url", value: form.buy_url, onChange: (e) => setForm({
              ...form,
              buy_url: e.target.value
            }), placeholder: "https://rzp.io/l/your-product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Paste a Razorpay Payment Link (or any checkout URL). Opens in a new tab when a user clicks Buy now." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: form.is_active, onCheckedChange: (v) => setForm({
              ...form,
              is_active: v
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Active (visible in store)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setForm(null), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow text-primary-foreground", disabled: save.isPending || !form.name, onClick: () => save.mutate(form), children: [
            save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null,
            " Save product"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d rounded-2xl p-10 text-center text-muted-foreground", children: "No products yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d overflow-x-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            p.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: "", className: "h-10 w-10 rounded object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.slug })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: p.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            "₹",
            Number(p.price).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: p.stock }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs ${p.is_active ? "bg-primary/15 text-primary-glow" : "bg-muted text-muted-foreground"}`, children: p.is_active ? "Active" : "Hidden" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setForm({
              id: p.id,
              name: p.name,
              slug: p.slug,
              description: p.description || "",
              price: Number(p.price),
              compare_at_price: p.compare_at_price ? Number(p.compare_at_price) : null,
              currency: p.currency || "INR",
              image_url: p.image_url || "",
              category: p.category,
              stock: p.stock,
              badge: p.badge || "",
              is_active: p.is_active,
              sort_order: p.sort_order,
              buy_url: p.buy_url || ""
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
              if (confirm(`Delete ${p.name}?`)) del.mutate(p.id);
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
          ] }) })
        ] }, p.id)) })
      ] }) }) })
    ] })
  ] });
}
export {
  AdminShop as component
};
