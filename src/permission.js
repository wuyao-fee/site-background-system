// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   // const hasToken = getToken()

//   const hasGetUserInfo = store.getters.user;
//   // console.log("hasGetUserInfo:::::::", hasGetUserInfo);
//   //【改造后的鉴权流程】：
//   //1.判断是否需要鉴权
//   if (to.meta.auth) {
//     //2.判断是否有用户信息
//     // const hasGetUserInfo = store.getters.user;
//     if (hasGetUserInfo) {
//       //放行，跳转到首页
//       next();
//     } else {
//       const hasToken = localStorage.getItem('adminToken');
//       // console.log(hasToken);
//       //3.判断是否有token
//       if (hasToken) {
//         //4.验证token
//         try {
//           await store.dispatch('user/getInfo');
//           // console.log("try");
//           next();
//         } catch (error) {
//           await store.dispatch('user/resetToken');
//           Message.error('登录过期，请重新登录')
//           next(`/login?redirect=${to.path}`);
//           NProgress.done();
//         }
//       } else {
//         //调转到/login登录页
//         next(`/login?redirect=${to.path}`);
//         NProgress.done();
//       }
//     }
//   } else {
//     if (to.path === '/login' && hasGetUserInfo) {
//       //去登录页，并且有用户信息
//       next({ path: '/' });
//     } else {
//       //去不需要鉴权的页面，直接放行
//       next();
//     }
//     NProgress.done();
//   }
// })

// router.afterEach(() => {
//   NProgress.done()
// })





import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist 白名单

// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  const hasGetUserInfo = store.getters.user; // 获取本地用户信息


  if(to.meta.auth){
    // 说明页面需要鉴权
    if(hasGetUserInfo){
      // 进入此 if，说明有用户信息，直接放行
      next();
    } else {
      // 没有用户信息，看一下是否有 token
      const hasToken = localStorage.getItem('adminToken');

      if(hasToken){
        // 有 token，我们还需要验证一下 token 的有效性
        try{
          await store.dispatch('user/getInfo'); // 相当于大家之前学的 whoami
          next();
        } catch(error){
          await store.dispatch('user/resetToken');
          Message.error('登录过期，请重新登录');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        // 说明没有 token，所以需要重新进行登录
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }

  } else {
    // 说明该页面不需要鉴权
    if(to.path === '/login' && hasGetUserInfo){
      // 说明你现在是在登录的状态下，要去 login 页面，我们将其导航到首页
      next({path : '/'})
    } else {
      next();
    }
    NProgress.done();
  }
})

router.afterEach(() => {
  NProgress.done()
})
