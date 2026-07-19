// Cloudinary Configuration Constants using Environment Variables
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/**
 * Multiple files ko Cloudinary pe upload karne ka helper function
 * @param {FileList|Array} files 
 * @returns {Promise<Array<string>>} Image URLs array
 */
export const uploadImagesToCloudinary = async (files) => {
  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Cloudinary upload failed status");
      }

      const data = await response.json();
      return data.secure_url; 
    } catch (error) {
      console.error("Single image upload error:", error);
      return null;
    }
  });

  // Saari images ka complete hone ka wait karega aur filters pass karega
  const urls = await Promise.all(uploadPromises);
  return urls.filter((url) => url !== null);
};