import QRCode from "qrcode";

export async function generateQRCodeImage(slotId, size = 300) {
  return QRCode.toBuffer(slotId, {
    type: "png",
    width: size,
    margin: 1,
  });
}
