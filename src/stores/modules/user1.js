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
