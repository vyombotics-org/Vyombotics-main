import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, S as SiteNav } from "./SiteNav-BaCidO1A.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { T as Textarea } from "./textarea-F69quoCd.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { S as Switch } from "./switch-DkA5ZPe7.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as storage } from "./client-DwVEAZaB.mjs";
import { r as ref, u as uploadBytes, a as getDownloadURL } from "../_libs/firebase__storage.mjs";
import { b as adminListCourses, u as upsertCourse, d as deleteCourse } from "./courses.functions-C1R7_4D0.mjs";
import "../_libs/seroval.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import "../_libs/i18next.mjs";
import "../_libs/i18next-browser-languagedetector+[...].mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import { L as LoaderCircle, ab as ShieldAlert, I as ArrowLeft, az as Plus, aC as Upload, ae as Layers, aD as Pencil, at as Trash2 } from "../_libs/lucide-react.mjs";
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
const empty = {
  title: "",
  slug: "",
  description: "",
  category: "",
  level: "beginner",
  price_inr: 0,
  duration_hours: 0,
  is_published: false,
  thumbnail_url: null
};
function AdminCourses() {
  const {
    primaryRole,
    loading
  } = useAuth();
  const qc = useQueryClient();
  const listFn = useServerFn(adminListCourses);
  const saveFn = useServerFn(upsertCourse);
  const delFn = useServerFn(deleteCourse);
  const [editing, setEditing] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin", "courses"],
    queryFn: () => listFn(),
    enabled: primaryRole === "admin" || primaryRole === "instructor"
  });
  const save = useMutation({
    mutationFn: (v) => saveFn({
      data: v
    }),
    onSuccess: () => {
      toast.success(editing?.id ? "Course updated" : "Course created");
      qc.invalidateQueries({
        queryKey: ["admin", "courses"]
      });
      qc.invalidateQueries({
        queryKey: ["courses", "published"]
      });
      setEditing(null);
    },
    onError: (e) => toast.error(e?.message || "Failed to save")
  });
  const del = useMutation({
    mutationFn: (id) => delFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("Course deleted");
      qc.invalidateQueries({
        queryKey: ["admin", "courses"]
      });
    },
    onError: (e) => toast.error(e?.message || "Failed to delete")
  });
  async function uploadThumb(file) {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `covers/${crypto.randomUUID()}.${ext}`;
      const storageRef = ref(storage, path);
      const uploadResult = await uploadBytes(storageRef, file, {
        contentType: file.type
      });
      const downloadUrl = await getDownloadURL(uploadResult.ref);
      setEditing((c) => c ? {
        ...c,
        thumbnail_url: downloadUrl
      } : c);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  if (primaryRole !== "admin" && primaryRole !== "instructor") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-6 pt-40 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mx-auto h-12 w-12 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl font-bold", children: "Access denied" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "You need admin or instructor role to manage courses." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Back to dashboard" }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 pt-28 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Dashboard"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold", children: [
            "Manage ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Courses" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create, edit and publish your catalog." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow text-primary-foreground", onClick: () => setEditing({
          ...empty
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New Course"
        ] })
      ] }),
      editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 card-3d gradient-border rounded-2xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: editing.id ? "Edit course" : "New course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editing.title, onChange: (e) => setEditing({
              ...editing,
              title: e.target.value
            }), placeholder: "Full-Stack Web Development" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Slug (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editing.slug ?? "", onChange: (e) => setEditing({
              ...editing,
              slug: e.target.value
            }), placeholder: "auto-generated" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editing.category ?? "", onChange: (e) => setEditing({
              ...editing,
              category: e.target.value
            }), placeholder: "Web Development" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm", value: editing.level, onChange: (e) => setEditing({
              ...editing,
              level: e.target.value
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "beginner", children: "Beginner" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "intermediate", children: "Intermediate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "advanced", children: "Advanced" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: editing.price_inr, onChange: (e) => setEditing({
              ...editing,
              price_inr: Number(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Duration (hours)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 0, value: editing.duration_hours ?? 0, onChange: (e) => setEditing({
              ...editing,
              duration_hours: Number(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 md:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: editing.is_published, onCheckedChange: (v) => setEditing({
              ...editing,
              is_published: v
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Published (visible on public site)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, value: editing.description ?? "", onChange: (e) => setEditing({
              ...editing,
              description: e.target.value
            }), placeholder: "What learners will build, achieve, and master..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Thumbnail" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex cursor-pointer items-center gap-2 rounded-md border border-input px-4 py-2 text-sm hover:bg-secondary", children: [
                uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                uploading ? "Uploading..." : "Upload image",
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && uploadThumb(e.target.files[0]) })
              ] }),
              editing.thumbnail_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editing.thumbnail_url, alt: "thumb", className: "h-16 w-28 rounded-md object-cover" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setEditing(null), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow text-primary-foreground", disabled: save.isPending || !editing.title, onClick: () => save.mutate(editing), children: [
            save.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null,
            " Save course"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) }) : (data?.courses ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d rounded-2xl p-10 text-center text-muted-foreground", children: 'No courses yet. Click "New Course" to add one.' }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d overflow-hidden rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/40 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (data?.courses ?? []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: c.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: c.category || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            "₹",
            Number(c.price_inr).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs ${c.is_published ? "bg-primary/15 text-primary-glow" : "bg-muted text-muted-foreground"}`, children: c.is_published ? "Published" : "Draft" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/courses/$slug/batches", params: {
              slug: c.slug ?? c.id
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
              " Batches"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setEditing({
              ...empty,
              ...c
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
              if (confirm(`Delete "${c.title}"?`)) del.mutate(c.id);
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
          ] }) })
        ] }, c.id)) })
      ] }) }) })
    ] })
  ] });
}
export {
  AdminCourses as component
};
