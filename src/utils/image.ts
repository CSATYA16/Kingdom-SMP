/**
 * Compresses an image file and converts it to a Base64 string.
 * This is crucial to prevent localStorage from overflowing (quota limit is typically 5MB).
 *
 * @param file The input File object from an input element.
 * @param maxWidth The maximum width for the compressed image.
 * @param quality The JPEG quality (0 to 1).
 * @returns A Promise that resolves to the compressed Base64 string.
 */
export const compressImage = (file: File, maxWidth = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string); // Fallback
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        // Enforce jpeg compression for consistency and size
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
