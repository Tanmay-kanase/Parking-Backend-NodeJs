// 📅 Format: 20250421T180000Z (iCal UTC format)
function formatDateTime(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

export function generateCalendarInvite(booking) {
  const calendarData =
    "BEGIN:VCALENDAR\n" +
    "VERSION:2.0\n" +
    "PRODID:-//ParkEasy//NONSGML v1.0//EN\n" +
    "BEGIN:VEVENT\n" +
    `SUMMARY:Parking Booking at ${booking.location}\n` +
    `DESCRIPTION:Booking Slot: ${booking.slotNumber}\n` +
    `LOCATION:${booking.location}\n` +
    `DTSTART:${formatDateTime(booking.startTime)}\n` +
    `DTEND:${formatDateTime(booking.endTime)}\n` +
    "END:VEVENT\n" +
    "END:VCALENDAR";

  return Buffer.from(calendarData, "utf-8");
}
