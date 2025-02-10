export function convertToIST(utcDateString: string): string {
    const utcDate = new Date(utcDateString);
    const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
    
    return istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  }
  