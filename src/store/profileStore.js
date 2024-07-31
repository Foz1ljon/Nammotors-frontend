import { defineStore } from "pinia";
import api from "@/api/";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    user: {},
    loading: false,
    toast: useToast(),
    router: useRouter(),
    token: localStorage.getItem("token"),
    headers: {},
  }),
  actions: {
    setHeaders() {
      this.headers = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
    },

    async fetchUser() {
      this.loading = true;
      this.setHeaders();

      try {
        const res = await api.get("/admins/auth/getme", this.headers);
        this.user = res.data;
      } catch (err) {
        this.toast.error("Xatolik");
        console.log("err profile get", err.message);
      } finally {
        this.loading = false;
      }
    },

    async updateUser(userId, formData) {
      this.setHeaders();

      try {
        await api.put(`/admins/${userId}`, formData, {
          headers: {
            ...this.headers.headers,
            "Content-Type": "multipart/form-data",
          },
        });
        this.toast.success("Foydalanuvchi muvaffaqiyatli yangilandi!");
        await this.fetchUser(); // Optionally refresh the user data
      } catch (error) {
        this.toast.error(
          error?.response?.data?.message || "Foydaluvchini yangilashda xatolik"
        );
        console.log("Update error", error);
      }
    },

    logOut() {
      localStorage.removeItem("token");
      this.router.push("/login");
    },
  },
});
