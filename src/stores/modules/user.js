import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    //
    userID: JSON.parse(localStorage.getItem("user"))?.user_id || "",
    userName: JSON.parse(localStorage.getItem("user"))?.user_name || "",
    phone: JSON.parse(localStorage.getItem("user"))?.phone || "",
    gender: JSON.parse(localStorage.getItem("user"))?.gender || "",
    avatarUrl: JSON.parse(localStorage.getItem("user"))?.avatar_url || "",
    birthdate: JSON.parse(localStorage.getItem("user"))?.birthdate || "",
    email: JSON.parse(localStorage.getItem("user"))?.email || "",
    createAt: JSON.parse(localStorage.getItem("user"))?.create_at || "",
    updateAt: JSON.parse(localStorage.getItem("user"))?.update_at || "",
    lastLogin: JSON.parse(localStorage.getItem("user"))?.last_login || "",
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
        localStorage.setItem("user", JSON.stringify(user));
        resolve();
      });
    },

    clearUserProfile() {
      return new Promise((resolve) => {
        localStorage.removeItem("user");
        this.$patch({
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
        });
        resolve();
      });
    },
  },
});
