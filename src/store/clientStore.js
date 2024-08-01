import { defineStore } from "pinia";
import api from "@/api";
import { useToast } from "vue-toastification";

export const useClientStore = defineStore("client", {
  state: () => ({
    clients: [], // Clientlar ro'yxati
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

    // Mahsulotlarni olish
    async fetchClients(query = "") {
      this.loading = true; // Yuklanish holatini yoqish

      try {
        const response = await api.get(
          `clients/search?query=${query.trim()}`,
          this.setHeaders()
        );
        this.clients = response.data; // Mahsulotlarni saqlash
      } catch (error) {
        this.toast.error("Mahsulotlarni olishda xato.");
        console.error("Mahsulotlarni olish xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Yangi mijoz yaratish
    async createClient(clientData) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        await api.post("/clients", clientData, this.setHeaders());
        this.toast.success("Mijoz muvaffaqiyatli yaratildi!");
        await this.fetchClients(); // Mahsulot ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Mijozni yaratishda xato.");
        console.error("Mijozni yaratish xatosi:", error.message);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Mijozni o'chirish
    async deleteClient(id) {
      try {
        await api.delete(`/clients/${id}`, this.setHeaders());
        this.toast.success("Mijoz muvaffaqiyatli o'chirildi");
        await this.fetchClients(); // Mahsulot ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Mijozni o'chirishda xato.");
        console.error("Mijozni o'chirish xatosi:", error.message);
      }
    },

    // Mijozni yangilash
    async updateClient(id, clientData) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        await api.put(`/clients/${id}`, clientData, this.setHeaders());
        this.toast.success("Mijoz ma'lumotlari yangilandi!");
        await this.fetchClients(); // Mahsulot ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Mijozni yangilashda xato.");
        console.error("Mijozni yangilash xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Mijozni ID bo'yicha olish
    async getClientById(id) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        const response = await api.get(`/clients/${id}`, this.setHeaders());
        return response.data; // Mijoz ma'lumotlarini qaytarish
      } catch (error) {
        this.toast.error("Mijozni olishda xato.");
        console.error("Mijozni olish xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },
  },
});
