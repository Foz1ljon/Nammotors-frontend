import { defineStore } from "pinia";
import api from "@/api";
import { useToast } from "vue-toastification";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    admins: [], // Adminlar ro'yxati
    types: ["b2b", "b2c", "b2g"],
    loading: false, // Yuklanish holati
    token: localStorage.getItem("token"), // Tokenni olish
    toast: useToast(), // Toast bildirishnomalar
  }),

  actions: {
    // So'rovlar uchun sarlavhalarni o'rnatish
    setHeaders() {
      return {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
    },

    // Adminlarni olish
    async fetchAdmins(query = "") {
      this.loading = true; // Yuklanish holatini yoqish

      try {
        const response = await api.get(
          `admins/search?query=${query.trim()}`,
          this.setHeaders()
        );
        this.admins = response.data; // Adminlarni saqlash
      } catch (error) {
        this.toast.error("Adminlarni olishda xato.");
        console.error("Adminlarni olish xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Yangi admin yaratish
    async createAdmin(adminData) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        await api.post("/admins/auth/signup", adminData, this.setHeaders());
        this.toast.success("Admin muvaffaqiyatli yaratildi!");
        await this.fetchAdmins(); // Admin ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Adminni yaratishda xato.");
        console.error("Adminni yaratish xatosi:", error.message);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Adminni o'chirish
    async deleteAdmin(id) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        await api.delete(`/admins/${id}`, this.setHeaders());
        this.toast.success("Admin o'chirildi!");
        await this.fetchAdmins(); // Admin ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Adminni o'chirishda xato.");
        console.error("Adminni o'chirish xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Adminni yangilash
    async updateAdmin(userId, formData) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        await api.put(`/admins/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        this.toast.success("Admin muvaffaqiyatli yangilandi!");
        await this.fetchAdmins(); // Admin ro'yxatini yangilash
      } catch (error) {
        this.toast.error(
          error?.response?.data?.message || "Adminni yangilashda xatolik"
        );
        console.error("Adminni yangilash xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Adminni ID bo'yicha olish
    async getAdminById(id) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        const response = await api.get(`/admins/${id}`, this.setHeaders());
        return response.data; // Admin ma'lumotlarini qaytarish
      } catch (error) {
        this.toast.error("Adminni olishda xato.");
        console.error("Adminni olish xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },
  },
});
