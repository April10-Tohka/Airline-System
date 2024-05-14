// 统一管理localstorage
export function getToken()
{
    return localStorage.getItem("token");
}

export function setToken(newToken)
{
    localStorage.setItem("token",newToken);
}

export function removeToken()
{
    localStorage.removeItem("token");
}
