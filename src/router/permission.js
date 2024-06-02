import NProgress from "nprogress"
import "nprogress/nprogress.css"
import {useUserStore} from "@/stores/modules/user.js"

// 路由白名单
const whiteList=["/login","/404","/register","/home","/flightQuery"];

//路由全局前置守卫
export const beforeEach=((to, from, next)=>{
  console.log("执行beforeEach");
  NProgress.start();
  //1.获取token
  let token=useUserStore().token;
  console.log("路由前置守卫获取到的token：",token);
  // 是否有token取决于是否有登录，登录就有token
  /**
   * 2.如果没有登陆
   *  2.1 如果跳转的路由在白名单内，直接进入
   *  2.2不在白名单内，重定向到登录login页面
   */
  console.log("to前往的路由",to);
  if(!token)
  {
    //没有token
    if(whiteList.includes(to.path))
    {
      //如果跳转的路由在白名单内，直接进入
      next()
    }
    else
    {
      return next({path:"/login"})
    }
  }
  /**
   * 3.如果有登录
   *  3.1 如果跳转的路由是 登录login页面，重定向到主页
   *
   */
  next()
})

// 路由全局后置钩子
export const afterEach=((to)=>{
  console.log("执行afterEach");
  NProgress.done();
})
