/**
 * Kombinuje zdrojový obrázek a masku, přičemž zdrojový obrázek je upraven
 * jako `background-size: cover` a `background-position: center center`.
 * @param sourceImg - Cesta nebo objekt zdrojového obrázku.
 * @param maskImg - Cesta nebo objekt maskového obrázku.
 * @param targetWidth - Šířka výsledného obrázku.
 * @param targetHeight - Výška výsledného obrázku.
 * @returns Promise<HTMLCanvasElement> - Canvas s výsledným obrázkem.
 */
export async function applyMaskToImageWithSize(
  sourceImg: string,
  maskImg: string,
  targetWidth: number,
  targetHeight: number
): Promise<HTMLCanvasElement> {
  // Načtení obrázků jako HTMLImageElement
  const [source, mask] = await Promise.all([loadImage(sourceImg), loadImage(maskImg)]);

  // Vytvoření canvasu a získání 2D kontextu
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Nelze získat 2D kontext canvasu.');
  }

  // Výpočet pozice a velikosti zdrojového obrázku pro simulaci `background-size: cover`
  const sourceAspectRatio = source.width / source.height;
  const targetAspectRatio = targetWidth / targetHeight;
  let drawWidth, drawHeight, offsetX, offsetY;

  if (sourceAspectRatio > targetAspectRatio) {
    // Obrázek je širší než cílový poměr, ořízneme boky
    drawWidth = source.height * targetAspectRatio;
    drawHeight = source.height;
    offsetX = (source.width - drawWidth) / 2;
    offsetY = 0;
  } else {
    // Obrázek je vyšší než cílový poměr, ořízneme vršek a spodek
    drawWidth = source.width;
    drawHeight = source.width / targetAspectRatio;
    offsetX = 0;
    offsetY = (source.height - drawHeight) / 2;
  }

  // Kreslení zdrojového obrázku na canvas s ořezáním a přizpůsobením
  ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight, 0, 0, targetWidth, targetHeight);

  // Uložení výsledku
  const sourceImageData = ctx.getImageData(0, 0, targetWidth, targetHeight);

  // Kreslení masky
  ctx.clearRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(mask, 0, 0, targetWidth, targetHeight);
  const maskImageData = ctx.getImageData(0, 0, targetWidth, targetHeight);

  // Manipulace pixelů
  const resultImageData = ctx.createImageData(targetWidth, targetHeight);
  for (let i = 0; i < sourceImageData.data.length; i += 4) {
    // Kopírování RGB kanálů ze zdrojového obrázku
    resultImageData.data[i] = sourceImageData.data[i]; // Red
    resultImageData.data[i + 1] = sourceImageData.data[i + 1]; // Green
    resultImageData.data[i + 2] = sourceImageData.data[i + 2]; // Blue

    // Nastavení alfa kanálu podle masky
    const maskAlpha = maskImageData.data[i + 3] / 255; // Mask alfa kanál v rozsahu 0-1
    resultImageData.data[i + 3] = sourceImageData.data[i + 3] * maskAlpha; // Aplikace průhlednosti
  }

  // Vykreslení výsledku na canvas
  ctx.putImageData(resultImageData, 0, 0);

  return canvas;
}

/**
 * Pomocná funkce pro načtení obrázku.
 * @param src - Cesta k obrázku.
 * @returns Promise<HTMLImageElement>
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Pro načítání z cizího zdroje (pokud je povolen CORS)
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

// Příklad použití
(async () => {
  const sourceImgPath = 'source.png'; // Nahraďte cestou ke zdrojovému obrázku
  const maskImgPath = 'mask.png'; // Nahraďte cestou k masce
  const targetWidth = 800; // Šířka výsledného obrázku
  const targetHeight = 600; // Výška výsledného obrázku

  try {
    const canvas = await applyMaskToImageWithSize(sourceImgPath, maskImgPath, targetWidth, targetHeight);
    document.body.appendChild(canvas); // Přidání výsledného canvasu do stránky
  } catch (err) {
    console.error('Chyba při aplikaci masky na obrázek:', err);
  }
})();
