import { defineStore } from "pinia";
import api from "@/api/";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export const useCategoyStore = defineStore("category", {
  state: () => ({
    categories: [],
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

    
    async fetchCategory() {
      this.loading = true;
      this.setHeaders();
      api
        .get("category", this.headers)
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => {
          this.toast.error("Xatolik yuz berdi!");
          console.error("category response err", err);
        });
    },
    // kategoriya yaratish
    createCategory(data) {
      this.setHeaders();
      api
        .post("/category", data, this.headers)
        .then((res) => {
          this.toast.success("Kategoriya qo'shildi!");
          this.fetchCategory();
          data = { name: "" }; // Reset input field
        })
        .catch((err) => {
          toast.error("Xatolik!");
          console.log("err create", err);
        });
    },

    deleteCategory(id) {
      this.setHeaders();
      api
        .delete(`/category/${id}`, this.headers)
        .then((res) => {
          this.toast.success("Kategoriya o`chirildi!");
          this.fetchCategory();
        })
        .catch((err) => {
          this.toast.error("Xatolik!");
          console.log("err delete", err);
        });
    },

    // Update category by id
    async updateCategory(id, data) {
      this.setHeaders();
      api
        .patch(`/category/${id}`, data, this.headers)
        .then(() => {
          this.toast.success("Kategoriya yangilandi!");
          this.fetchCategory();
        })
        .catch((err) => {
          this.toast.error("Xatolik!");
          console.log("Category update ereee", err);
        });
    },
  },
});
