/**
 *  登录成功返回的user个人信息
 * avatar_url
 * :
 * "https://dimg04.c-ctrip.com/images/0AS1k120009l60yh36D69.jpg"
 * birthdate
 * :
 * null
 * create_at
 * :
 * "2024-10-11T16:08:17.000Z"
 * email
 * :
 * null
 * failed_login_attempt
 * :
 * null
 * gender
 * :
 * null
 * last_Login
 * :
 * null
 * phone
 * :
 * "13772487114"
 * registration_ip
 * :
 * null
 * update_at
 * :
 * null
 * user_id
 * :
 * "f8f4e2c4-87a7-11ef-aaf0-fa163ea107b5"
 * user_name
 * :
 * "尊敬的会员"
 */
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    //
    userID: "",
    userName: "",
    phone: "",
    gender: "",
    avatarUrl: "",
    birthdate: "",
    email: "",
    createAt: "",
    updateAt: "",
    lastLogin: "",
  }),
  getters: {
    //
  },
  actions: {
    //设置用户个人信息
    setUserProfile(user) {
      return new Promise((resolve, reject) => {
        this.$patch({
          userID: user.user_id,
          userName: user.user_name,
          phone: user.phone,
          gender: user.gender,
          avatarUrl: user.avatar_url,
          birthdate: user.birthdate,
          email: user.email,
          createAt: user.create_at,
          updateAt: user.update_at,
          lastLogin: user.last_login,
        });
        resolve();
      });
    },
  },
});
