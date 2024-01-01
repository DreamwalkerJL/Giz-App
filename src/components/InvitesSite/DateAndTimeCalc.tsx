import dayjs from "dayjs";
import { GizComplete } from "../../apiServices/Apollo/Types";


export function checkIfTodayOrTomorrow(invite: GizComplete) {
    // Parse the date from invite
    const inviteDate = dayjs(invite.date);
    const now = dayjs().format("YYYY-MM-DD"); // same (current date) but with day.js

    const isToday = dayjs(inviteDate.format("YYYY-MM-DD")).isSame(now); // dayjs() return current date
    const isTomorrow = dayjs(inviteDate.format("YYYY-MM-DD")).isSame(
      dayjs().add(1, "day").format("YYYY-MM-DD")
    );
    if (isToday) {
      return "Today";
    } else if (isTomorrow) {
      return "Tomorrow";
    } else return invite.date;
  }

  export function getTimeUntil(invite: GizComplete) {
    // Check if the giz is within the next hour


    const now = dayjs();
    const dateTimeString = `${invite.date} ${invite.time}`;
    const dateFormat = "MMMM D, YYYY";
    const timeFormat = "HH:mm";
    let targetDateTime = dayjs(dateTimeString, `${dateFormat} ${timeFormat}`);

    // Ensure the target date and time are valid
    if (!targetDateTime.isValid()) {
        return ""; // Return empty string if not valid
    }

    let diffInMinutes = targetDateTime.diff(now, "minute");

    // Check if the time is in the future and within the next hour
    if (diffInMinutes > 0 && diffInMinutes <= 60) {
        // Format output for less than an hour
        return `In ${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}`;
    }

    // If the time is outside of the one-hour window or in the past, return empty
    return "";
}