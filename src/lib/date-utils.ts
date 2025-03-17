
import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "yyyy/MM/dd", { locale: ar });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}

export function formatTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "HH:mm", { locale: ar });
  } catch (error) {
    console.error("Error formatting time:", error);
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "yyyy/MM/dd HH:mm", { locale: ar });
  } catch (error) {
    console.error("Error formatting date and time:", error);
    return dateString;
  }
}
