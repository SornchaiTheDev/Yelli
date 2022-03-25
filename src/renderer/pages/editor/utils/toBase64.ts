/* convert canvas to image (base64) */
export const toBase64 = (canvas: HTMLCanvasElement) => {
  const image = canvas.toDataURL();

  return image;
};
