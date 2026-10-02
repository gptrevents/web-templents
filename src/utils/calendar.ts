/**
 * Calendar Utilities for Arjun & Priya's Wedding
 */

export function getGoogleCalendarUrl(event?: { title: string; details: string; location: string; startIso: string; endIso: string }): string {
  const title = encodeURIComponent(event?.title || "Arjun & Priya's Wedding");
  const details = encodeURIComponent(
    event?.details || "We joyfully invite you to celebrate the sacred wedding ceremony of Arjun & Priya."
  );
  const location = encodeURIComponent(event?.location || 'Sri Convention Hall, MG Road, Vijayawada, Andhra Pradesh - 520010');
  
  // 12 Dec 2026 09:30 IST to 14:00 IST (UTC: 20261212T040000Z to 20261212T083000Z)
  const start = '20261212T040000Z';
  const end = '20261212T083000Z';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export function downloadIcsFile(title = "Arjun & Priya's Wedding", location = 'Sri Convention Hall, MG Road, Vijayawada'): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Arjun and Priya Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    'DESCRIPTION:With immense love and joy\\, Arjun & Priya invite you to be part of their wedding celebration.',
    `LOCATION:${location}`,
    'DTSTART:20261212T040000Z',
    'DTEND:20261212T083000Z',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Arjun_and_Priya_Wedding.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
