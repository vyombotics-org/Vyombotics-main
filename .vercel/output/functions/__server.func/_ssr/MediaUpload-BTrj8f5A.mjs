import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { s as storage } from "./client-DwVEAZaB.mjs";
import { r as ref, u as uploadBytes, a as getDownloadURL } from "../_libs/firebase__storage.mjs";
import { aB as Link, l as LoaderCircle, aC as Upload } from "../_libs/lucide-react.mjs";
function MediaUpload({
  value,
  onChange,
  accept = "image/*,video/*",
  folder = "uploads",
  placeholder = "Paste URL or upload a file"
}) {
  const inputRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  async function handleFile(file) {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const storageRef = ref(storage, path);
      const uploadResult = await uploadBytes(storageRef, file, {
        contentType: file.type,
        cacheControl: "public,max-age=31536000"
      });
      const downloadUrl = await getDownloadURL(uploadResult.ref);
      onChange(downloadUrl);
      toast.success("Uploaded");
    } catch (e) {
      toast.error(e?.message ?? "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }
  const isImage = value && /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(value);
  const isVideo = value && /\.(mp4|webm|mov|m4v)(\?|$)/i.test(value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-8",
            value,
            onChange: (e) => onChange(e.target.value),
            placeholder
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => inputRef.current?.click(),
          disabled: uploading,
          children: [
            uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 hidden sm:inline", children: "Upload" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          type: "file",
          accept,
          className: "hidden",
          onChange: (e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }
        }
      )
    ] }),
    value && (isImage || isVideo) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-md border border-border/40 bg-muted/20", children: isImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: value, alt: "Preview", className: "max-h-32 w-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: value, className: "max-h-32 w-auto", muted: true, controls: true }) })
  ] });
}
export {
  MediaUpload as M
};
