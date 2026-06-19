import { useRef, useState } from "react";
import { Loader2, Upload, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storage } from "@/integrations/firebase/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadToCloudinary } from "@/lib/cloudinary";

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

type Props = {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  folder?: string;
  placeholder?: string;
  useCloudinary?: boolean;
};

/**
 * Upload a file to Firebase Storage or Cloudinary and return the download URL,
 * OR paste a URL manually. Either works.
 */
export function MediaUpload({
  value,
  onChange,
  accept = "image/*,video/*",
  folder = "uploads",
  placeholder = "Paste URL or upload a file",
  useCloudinary = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      if (useCloudinary) {
        const downloadUrl = await uploadToCloudinary(file, folder);
        onChange(downloadUrl);
        toast.success("Uploaded to Cloudinary");
      } else {
        const ext = file.name.split(".").pop() || "bin";
        const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const storageRef = ref(storage, path);

        const uploadResult = await uploadBytes(storageRef, file, {
          contentType: file.type,
          cacheControl: "public,max-age=31536000",
        });

        const downloadUrl = await getDownloadURL(uploadResult.ref);
        onChange(downloadUrl);
        toast.success("Uploaded");
      }
    } catch (e: any) {
      toast.error(e?.message ?? "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const isImage = value && /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(value);
  const isVideo = value && /\.(mp4|webm|mov|m4v)(\?|$)/i.test(value);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          <span className="ml-2 hidden sm:inline">Upload</span>
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>
      {value && (isImage || isVideo) && (
        <div className="overflow-hidden rounded-md border border-border/40 bg-muted/20">
          {isImage ? (
            <img src={value} alt="Preview" className="max-h-32 w-auto" />
          ) : (
            <video src={value} className="max-h-32 w-auto" muted controls />
          )}
        </div>
      )}
    </div>
  );
}
