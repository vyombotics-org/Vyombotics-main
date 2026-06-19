import { toast } from "sonner";

export async function uploadToCloudinary(
  file: File,
  folder?: string,
  onProgress?: (progress: number) => void
): Promise<string> {
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
    return await new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);

      if (onProgress && xhr.upload) {
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(Math.round(progress));
          }
        });
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response.secure_url);
          } catch (e) {
            reject(new Error("Failed to parse response"));
          }
        } else {
          try {
            const response = JSON.parse(xhr.responseText);
            reject(new Error(response?.error?.message ?? "Upload request failed"));
          } catch (e) {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error during upload"));
      };

      xhr.send(formData);
    });
  } catch (error: any) {
    console.error("[Cloudinary] Upload error:", error);
    toast.error(`Cloudinary Upload Error: ${error.message || "Failed to upload"}`);
    throw error;
  }
}
