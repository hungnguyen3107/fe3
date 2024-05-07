import React, { createContext, useState, useContext, useEffect } from 'react';
import { productServices } from '../productService';
import { message } from 'antd'
const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
    const dataProducts = JSON.parse(sessionStorage.getItem('products'));
    const dataUser = JSON.parse(sessionStorage.getItem('user'));
    const [isDataCart, setDataCart] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
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
            setDataCart(!isDataCart);
        } else {
            console.error(`Product with id ${productId} not found in orderData.`);
        }
    };
    //thêm sản phẩm vào giỏ hàng
    const handleAddToCart = async (id) => {
        try {
            // Lấy thông tin sản phẩm từ dịch vụ hoặc nguồn dữ liệu khác
            const res = await productServices.get({
                Id: id,
                "Limit": currentPage,
                "PageIndex": rowsPerPage
            });
            const productInfo = res.items;
            // Lấy danh sách sản phẩm từ giỏ hàng
            const products = JSON.parse(sessionStorage.getItem('products')) || [];
            // Tìm kiếm xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const productIndex = products.findIndex(item => item.productId[0].id === id);
            console.log(productIndex)
            // Nếu sản phẩm đã tồn tại trong giỏ hàng
            if (productIndex !== -1) {
                const updatedProducts = [...products];
                updatedProducts[productIndex].quantity += 1;
                sessionStorage.setItem('products', JSON.stringify(updatedProducts));
                setDataCart(!isDataCart)
                message.success("Thêm vào giỏ hàng thành công !")
            } else {
                // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
                const newProduct = { productId: productInfo, quantity: 1 };
                const updatedProducts = [...products, newProduct];
                sessionStorage.setItem('products', JSON.stringify(updatedProducts));
                setDataCart(!isDataCart);
                message.success("Thêm vào giỏ hàng thành công !");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <CartContext.Provider value={{ dataUser, isDataCart, setDataCart, dataProducts, calculateTotalQuantity, calculateTotalPrice, handleRemoveItem, handleAddToCart }}>
            {children}
        </CartContext.Provider>
    );
}