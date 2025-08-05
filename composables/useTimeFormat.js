import dayjs from "dayjs";

export const useTimeFormat = () => {
  // 時間格式轉換
  function getFormatDate(time) {
    const date = dayjs(time);
    return {
      day: date.format("D"),
      monthYear: date.format("YYYY/MM"),
      weekday: date.format("dddd").replace("星期", "週"),
    };
  }

  // 與現在時間差距
  function getTimeDiff(time) {
    const date = dayjs(time);
    const now = dayjs();
    let str = "";

    const diffMinute = now.diff(date, "minute");
    const diffHour = now.diff(date, "hour");
    const diffDay = now.diff(date, "day");
    const diffMonth = now.diff(date, "month");

    if (diffMinute < 60) {
      str = `${diffMinute || 1} 分鐘前`;
    } else if (diffHour < 24) {
      str = `${diffHour || 1} 小時前`;
    } else if (diffDay < 30) {
      str = `${diffDay} 天前`;
    } else {
      str = `${diffMonth} 個月前`;
    }

    return str;
  }

  return { getFormatDate, getTimeDiff };
};
