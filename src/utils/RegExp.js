
/**
 * //匹配中国大陆手机号的正则表达式
 * @param phone 手机号
 * @returns {boolean} 手机号是否有效
 * @constructor
 */
export function phoneReg(phone)
{
    const phoneReg = /^1[3-9]\d{9}$/;
    return phoneReg.test(phone);
}

/**
 * 匹配验证码是否为6位数字的正则表达式
 * @param captcha 验证码
 * @returns {boolean} 验证码是否正确
 */
export function captchaReg(captcha)
{
    const regex = /^\d{6}$/;
    return regex.test(captcha);
}
