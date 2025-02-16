export function getFormattedDate(time) {
    const date=new Date(time);
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const month = date.getMonth() + 1; // 月份从0开始，需要加1
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];

    return `${month}月${day}日 ${dayOfWeek}`;
}
