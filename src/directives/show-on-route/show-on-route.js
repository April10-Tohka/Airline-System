/**
 * 只有在认证（登录或注册）页面上，使用了这个指令的元素才会显示
 * @type {{created(*, *, *, *): void}}
 */
export const showOnRoute={
    created(el, binding)
    {
        console.log("created",el,binding);
        let {showOnRoutes,routeName}=binding.value
        if (showOnRoutes.includes(routeName))
        {
            el.style.display = binding.arg === 'homebtn' ? '' : 'none';
        }
        else
        {
            el.style.display = binding.arg === 'accountbar' ? '' : 'none';
        }
    }
}
