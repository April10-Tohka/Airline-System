export function getFormattedDate(time) {
    const date=new Date(time);
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const month = date.getMonth() + 1; // 月份从0开始，需要加1
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];

    return `${month}月${day}日 ${dayOfWeek}`;
}

/**
 * 返回 2024-04-01格式的时间
 * @returns {string}
 */
export function getNowDate()
{
    const date=new Date();
    const year=date.getFullYear();
    const month=('0'+(date.getMonth()+1)).slice(-2);
    const day=('0'+date.getDate()).slice(-2);
    return `${year}-${month}-${day}`
}
