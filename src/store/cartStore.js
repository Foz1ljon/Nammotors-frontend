import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [], // Savat
    toast: useToast(), // Toast bildirishnomalar
  }),
  actions: {
    // Savatga mahsulot qo'shish
    addToCart(product) {
      const existingProductIndex = this.cart.findIndex(
        (p) => p._id === product._id
      );
      if (existingProductIndex !== -1) {
        // Agar mahsulot mavjud bo'lsa, miqdorni oshiradi
        this.cart[existingProductIndex].quantity += Number(
          product.quantity || 1
        );
      } else {
        // Yangi mahsulot qo'shadi
        this.cart.push({
          ...product,
          quantity: Number(product.quantity || 1), // Default to 1 if no quantity provided
        });
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.toast.success("Mahsulot savatga qo'shildi");
    },

    // Savatdan mahsulot o'chirish
    removeFromCart(productId) {
      const productIndex = this.cart.findIndex(
        (product) => product._id === productId
      );
      if (productIndex !== -1) {
        this.cart.splice(productIndex, 1);
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.toast.success("Mahsulot savatdan o'chirildi");
      } else {
        this.toast.error("Mahsulot savatda mavjud emas");
      }
    },

    // Savatdagi mahsulot miqdorini yangilash
    updateQuantity(productId, newQuantity) {
      const productIndex = this.cart.findIndex((p) => p._id === productId);
      if (productIndex !== -1) {
        const validQuantity = Number(newQuantity);
        if (validQuantity <= 0) {
          // Agar miqdor 0 yoki undan kam bo'lsa, mahsulotni o'chiradi
          this.removeFromCart(productId);
        } else {
          // Mahsulot miqdorini yangilaydi
          this.cart[productIndex].quantity = validQuantity;
          localStorage.setItem("cart", JSON.stringify(this.cart));
          this.toast.success("Mahsulot miqdori yangilandi");
        }
      } else {
        this.toast.error("Mahsulot savatda mavjud emas");
      }
    },

    // Umumiy mahsulotlar sonini hisoblash
    getTotalItems() {
      return this.cart.reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0
      );
    },
  },
});
