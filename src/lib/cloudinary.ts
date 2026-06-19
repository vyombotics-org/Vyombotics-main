import { toast } from "sonner";

export async function uploadToCloudinary(file: File, folder?: string): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "vyombotics";
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "vyombotics_preset";

  if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || !import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET) {
    console.warn(
      "[Cloudinary] Missing VITE_CLOUDINARY_CLOUD_NAME or VITE_CLOUDINARY_UPLOAD_PRESET in your .env configuration. Falling back to default settings."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  if (folder) {
    formData.append("folder", folder);
  }

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message ?? "Upload request failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error: any) {
    console.error("[Cloudinary] Upload error:", error);
    toast.error(`Cloudinary Upload Error: ${error.message || "Failed to upload"}`);
    throw error;
  }
}
