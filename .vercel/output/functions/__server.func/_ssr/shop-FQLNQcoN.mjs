import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as SiteNav } from "./SiteNav-BaCidO1A.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { l as listShopProducts } from "./shop.functions-C13zzGe6.mjs";
import "../_libs/sonner.mjs";
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
import { h as ShoppingBag, i as Search, L as LoaderCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function ShopPage() {
  const fetcher = useServerFn(listShopProducts);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["shop", "all"],
    queryFn: () => fetcher()
  });
  const [q, setQ] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("all");
  const all = data?.products ?? [];
  const categories = reactExports.useMemo(() => ["all", ...Array.from(new Set(all.map((p) => p.category).filter(Boolean)))], [all]);
  const filtered = all.filter((p) => {
    const mq = !q || p.name?.toLowerCase().includes(q.toLowerCase()) || p.description?.toLowerCase().includes(q.toLowerCase());
    const mc = cat === "all" || p.category === cat;
    return mq && mc;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 pt-32 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary-glow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-3.5 w-3.5" }),
          " Vyombotics Store"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-4xl font-bold md:text-6xl", children: [
          "Shop ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Kits & Merch" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-2xl text-muted-foreground", children: "Robotics kits, drones, sensors and Vyombotics-branded apparel — built for makers." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "pl-9", placeholder: "Search products…", value: q, onChange: (e) => setQ(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCat(c), className: `rounded-full border px-4 py-2 text-sm transition ${cat === c ? "border-primary bg-primary/15 text-primary-glow" : "border-border/40 text-muted-foreground hover:text-foreground"}`, children: c === "all" ? "All" : c }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d rounded-2xl p-10 text-center text-muted-foreground", children: "No products yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "card-3d group overflow-hidden rounded-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
          p.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: p.name, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12" }) }),
          p.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground", children: p.badge }),
          p.stock <= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 rounded-full bg-destructive/90 px-2.5 py-1 text-xs font-medium text-destructive-foreground", children: "Out of stock" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: p.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-display text-lg font-semibold", children: p.name }),
          p.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: p.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold", children: [
              "₹",
              Number(p.price).toLocaleString()
            ] }),
            p.compare_at_price && Number(p.compare_at_price) > Number(p.price) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground line-through", children: [
              "₹",
              Number(p.compare_at_price).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: p.stock > 0, className: "mt-4 w-full btn-glow text-primary-foreground", disabled: p.stock <= 0, children: p.stock > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: p.buy_url || "https://rzp.io/l/vyombotics-demo", target: "_blank", rel: "noopener noreferrer", children: "Buy now" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sold out" }) })
        ] })
      ] }, p.id)) }) })
    ] })
  ] });
}
export {
  ShopPage as component
};
