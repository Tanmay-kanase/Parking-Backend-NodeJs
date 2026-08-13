import PDFDocument from "pdfkit";
import { generateQRCodeImage } from "./qrCodeGenerator.js";

function addRow(doc, label, value, x1, x2, y, rowHeight) {
  doc.font("Helvetica-Bold").fontSize(12).text(label, x1, y, { width: x2 - x1 - 10 });
  doc.font("Helvetica").fontSize(12).text(String(value ?? ""), x2, y, { width: 200 });
  doc
    .moveTo(x1 - 5, y + rowHeight - 5)
    .lineTo(x2 + 200, y + rowHeight - 5)
    .strokeColor("#dddddd")
    .stroke();
}

export async function generateReceipt(booking) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Title
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .text("ParkEasy Parking Booking Receipt", { align: "center" });
      doc.moveDown(1.5);

      const x1 = doc.page.margins.left;
      const x2 = x1 + 180;
      const rowHeight = 24;
      let y = doc.y;

      const rows = [
        ["User ID:", booking.userId],
        ["Slot Number:", booking.slotNumber],
        ["Location:", booking.location],
        ["License Plate:", booking.licensePlate],
        ["Vehicle Type:", booking.vehicleType],
        ["Booking Time:", `${booking.startTime} - ${booking.endTime}`],
        ["Amount Paid:", `$${booking.amountPaid}`],
      ];

      for (const [label, value] of rows) {
        addRow(doc, label, value, x1, x2, y, rowHeight);
        y += rowHeight;
      }

      doc.moveDown(2);

      // QR Code
      try {
        const qrBuffer = await generateQRCodeImage(booking.bookingId, 200);
        const qrX = (doc.page.width - 100) / 2;
        doc.image(qrBuffer, qrX, doc.y, { width: 100, height: 100 });
      } catch (e) {
        // Match Java behavior: swallow QR failure, still produce the PDF
        console.error(e);
      }

      doc.end();
    } catch (e) {
      reject(e);
    }
  });
}
