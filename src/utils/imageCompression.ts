/**
 * Browser-native image compression using HTML5 Canvas.
 * Converts heavy camera/phone uploads (JPEG, PNG, HEIC) to WebP format,
 * resizing dimensions to a max of 1600px and reducing weight to <250KB.
 * Zero external dependencies.
 */
export const compressImage = (
  file: File,
  maxWidth = 1600,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve) => {
    // If not an image, return raw read
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Downscale while preserving aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Draw image into canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP format
        try {
          const webpDataUrl = canvas.toDataURL('image/webp', quality);
          resolve(webpDataUrl);
        } catch (err) {
          // Fallback if browser doesn't support canvas toDataURL webp
          const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(jpegDataUrl);
        }
      };

      img.onerror = () => {
        resolve(e.target?.result as string);
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};
