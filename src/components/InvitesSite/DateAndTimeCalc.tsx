import dayjs from "dayjs";
import { gizComplete } from "../../apiServices/Apollo/GizCompleteQuery";

export function checkIfTodayOrTomorrow(invite: gizComplete) {
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

  export function getTimeUntil(invite: gizComplete) {
    const now = dayjs();
    const dateFormat = "MMMM D, YYYY"; // Format for invite.date
    const timeFormat = "h:mm A"; // Format for invite.time

    // Combine date and time into a single string
    const dateTimeString = `${invite.date} ${invite.time}`;
    let targetDateTime = dayjs(dateTimeString, `${dateFormat} ${timeFormat}`);

    // Check if the target time is valid and for today
    if (!targetDateTime.isValid() || !now.isSame(targetDateTime, "day")) {
      return ""; // Return an empty string if it's not valid or not today
    }

    // Calculate the difference in minutes
    let diffInMinutes = targetDateTime.diff(now, "minute");

    // Return an empty string if the time is in the past
    if (diffInMinutes < 0) {
      return "";
    }

    // Format output
    if (diffInMinutes < 60) {
      // If less than an hour, show in minutes
      return `(In ${diffInMinutes} minutes)`;
    } else {
      // If an hour or more, show in hours and minutes
      let hours = Math.floor(diffInMinutes / 60);
      let minutes = diffInMinutes % 60;
      return `In ${hours} hour(s) and ${minutes} minute(s)`;
    }
}