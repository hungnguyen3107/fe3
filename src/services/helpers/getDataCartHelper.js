import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
    const dataProducts = JSON.parse(sessionStorage.getItem('products'));
    const dataUser = JSON.parse(sessionStorage.getItem('user'));
    const [isDataCart, setDataCart] = useState(false)
    //hàm tính tổng số lượng
    const calculateTotalQuantity = () => {
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        let totalQuantity = 0;
        products.forEach(product => {
            totalQuantity += product.quantity;
        });

        return totalQuantity;
    };
    //hàm tính tổng thành tiền
    const calculateTotalPrice = () => {
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        let totalPrice = 0;
        products.forEach(product => {
            const productPrice = product.productId[0].price;
            const productQuantity = product.quantity;
            totalPrice += productPrice * productQuantity;
        });

        return totalPrice;
    };
    //xóa sản phẩm ở giỏ hàng
    const handleRemoveItem = (productId) => {
        const productIndex = dataProducts.findIndex((item) => item.productId[0].id === productId);
        if (productIndex !== -1) {
            const updatedOrderData = [...dataProducts];
            updatedOrderData.splice(productIndex, 1);
            sessionStorage.setItem('products', JSON.stringify(updatedOrderData));
            window.location.reload();
        } else {
            console.error(`Product with id ${productId} not found in orderData.`);
        }
    };
    return (
        <CartContext.Provider value={{ dataUser, isDataCart, setDataCart, dataProducts, calculateTotalQuantity, calculateTotalPrice, handleRemoveItem }}>
            {children}
        </CartContext.Provider>
    );
}