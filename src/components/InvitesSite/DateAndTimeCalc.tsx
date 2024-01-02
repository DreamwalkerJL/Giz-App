import dayjs from "dayjs";
import { GizComplete } from "../../apiServices/Apollo/Types";


export function checkIfTodayOrTomorrow(invite: GizComplete) {
  // Parse the UTC date and convert it to local time
  const inviteDateUTC = dayjs.utc(`${invite.date} ${invite.time}`, "MMMM D, YYYY HH:mm");
  const inviteDateLocal = inviteDateUTC.local();

  const now = dayjs(); // Current date in local time
  const isToday = inviteDateLocal.isSame(now, 'day');
  const isTomorrow = inviteDateLocal.isSame(now.add(1, 'day'), 'day');

  if (isToday) {
      return "Today";
  } else if (isTomorrow) {
      return "Tomorrow";
  } else {
      return inviteDateLocal.format("MMMM D, YYYY");
  }
}

  export function getTimeUntil(invite: GizComplete) {
    const now = dayjs();
    const dateTimeString = `${invite.date} ${invite.time}`;
    const dateFormat = "MMMM D, YYYY";
    const timeFormat = "HH:mm";

    // Parse the UTC date and time and convert to local time
    const targetDateTimeUTC = dayjs.utc(dateTimeString, `${dateFormat} ${timeFormat}`);
    const targetDateTimeLocal = targetDateTimeUTC.local();

    if (!targetDateTimeLocal.isValid()) {
        return ""; // Return empty string if not valid
    }

    let diffInMinutes = targetDateTimeLocal.diff(now, "minute");

    if (diffInMinutes > 0 && diffInMinutes <= 60) {
        return `In ${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}`;
    }

    return "";
}