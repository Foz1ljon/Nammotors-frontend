import { defineStore } from "pinia";
import api from "@/api";
import { useToast } from "vue-toastification";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [], // Mahsulotlar ro'yxati
    categories: [], // Kategoriya ro'yxati
    cart: JSON.parse(localStorage.getItem("cart")) || [], // Savat
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
    async fetchProducts(query = "") {
      this.loading = true; // Yuklanish holatini yoqish

      try {
        const response = await api.get(
          `product/search?query=${query.trim()}`,
          this.setHeaders()
        );
        this.products = response.data; // Mahsulotlarni saqlash
      } catch (error) {
        this.toast.error("Mahsulotlarni olishda xato.");
        console.error("Mahsulotlarni olish xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Yangi mahsulot yaratish
    async createProduct(productData) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        await api.post("/product", productData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        this.toast.success("Mahsulot muvaffaqiyatli yaratildi!");
        await this.fetchProducts(); // Mahsulot ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Mahsulotni yaratishda xato.");
        console.error("Mahsulotni yaratish xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Mahsulotni o'chirish
    async deleteProduct(id) {
      try {
        const headers = this.setHeaders();
        await api.delete(`/product/${id}`, headers);
        this.toast.success("Mahsulot muvaffaqiyatli o'chirildi");
        await this.fetchProducts(); //
      } catch (error) {
        this.toast.error("Mahsulotni o'chirishda xato.");
        console.error("Mahsulotni o'chirish xatosi:", error.message);
      }
    },

    // Kategoriyalarni olish
    async fetchCategories() {
      try {
        const response = await api.get("/category", this.setHeaders());
        this.categories = response.data; // Kategoriyalarni saqlash
      } catch (error) {
        this.toast.error("Kategoriyalarni olishda xato.");
        console.error("Kategoriyalarni olish xatosi:", error);
      }
    },

    // Savatga mahsulot qo'shish
    addToCart(product) {
      const existingProductIndex = this.cart.findIndex(
        (p) => p._id === product._id
      );
      if (existingProductIndex !== -1) {
        this.cart[existingProductIndex].quantity += 1; // Miqdorni oshirish
      } else {
        this.cart.push({ ...product, quantity: 1 }); // Mahsulotni qo'shish
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.toast.success("Mahsulot savatga qo'shildi");
    },

    // Savatdan mahsulot o'chirish
    removeFromCart(productId) {
      this.cart = this.cart.filter((product) => product._id !== productId);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.toast.success("Mahsulot savatdan o'chirildi");
    },

    // Savatni bo'shatish
    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
      this.toast.success("Savat bo'shatildi");
    },
  },
});
