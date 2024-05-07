import React, { useEffect } from 'react'
import '../../css/demo3.min.css'
import '../../css/style.min.css'
import { useCartContext } from '../../services/helpers/getDataCartHelper'
import { useProductContext } from '../../services/helpers/getDataHelpers'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import LoginPage from '../login/LoginPage'
import { Modal } from 'antd';
const CartPage = () => {
    const { dataUser, dataProducts, calculateTotalPrice, handleRemoveItem, isDataCart, setDataCart } = useCartContext();
    const { isModalOpen, handleOk, handleCancel, showModal } = useProductContext();
    const totalPrice = calculateTotalPrice();
    //hàm cập nhập sản phẩm khi tăng số lượng
    const increaseQuantity = (productId) => {
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        const productIndex = products.findIndex(item => item.productId[0].id === productId);
        if (productIndex !== -1) {
            const product = products[productIndex];
            product.quantity++; // Tăng số lượng lên 1 đơn vị
            sessionStorage.setItem('products', JSON.stringify(products));
            setDataCart(!isDataCart);
            return product.quantity; // Trả về số lượng mới
        }
        return null;
    };
    //hàm cập nhập sản phẩm khi giảm số lượng
    const decreaseQuantity = (productId) => {
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        const productIndex = products.findIndex(item => item.productId[0].id === productId);
        if (productIndex !== -1) {
            const product = products[productIndex];
            if (product.quantity > 1) { // Đảm bảo số lượng không nhỏ hơn 1
                product.quantity--; // Giảm số lượng xuống 1 đơn vị
                sessionStorage.setItem('products', JSON.stringify(products));
                setDataCart(!isDataCart);
                return product.quantity; // Trả về số lượng mới
            }
        }
        return null;
    };
    useEffect(() => {
        JSON.parse(sessionStorage.getItem('products'))
    }, [isDataCart])
    return (
        <main class="main cart">
            <div class="page-content pt-7 pb-10">
                <div class="step-by pr-4 pl-4">
                    <h3 class="title title-simple title-step active"><a href="cart.html">1. Shopping Cart</a></h3>
                    <h3 class="title title-simple title-step"><a href="checkout.html">2. Checkout</a></h3>
                    <h3 class="title title-simple title-step"><a href="order.html">3. Order Complete</a></h3>
                </div>
                <div class="container mt-7 mb-2">
                    <div class="row">
                        <div class="col-lg-8 col-md-12 pr-lg-4">
                            <table class="shop-table cart-table">
                                <thead>
                                    <tr>
                                        <th><span>Product</span></th>
                                        <th></th>
                                        <th><span>Price</span></th>
                                        <th><span>quantity</span></th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataProducts && dataProducts.map((items, index) => (
                                            <tr>
                                                <td class="product-thumbnail">
                                                    <figure>
                                                        <a href="product-simple.html">
                                                            <img src={`https://localhost:7285/Images/${items.productId[0].image[0]}`} width="100" height="100" alt="product" />
                                                        </a>
                                                    </figure>
                                                </td>
                                                <td class="product-name">
                                                    <div class="product-name-section">
                                                        <a >{items.productId[0].name}</a>
                                                    </div>
                                                </td>
                                                <td class="product-subtotal">
                                                    <span class="amount">{items.productId[0].price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                </td>
                                                <td class="product-quantity">
                                                    <div class="input-group">
                                                        <button class="quantity-minus" onClick={() => decreaseQuantity(items.productId[0].id)}><FontAwesomeIcon icon={faMinus} /></button>
                                                        <input class="quantity form-control" type="number" min="1" max="1000000" value={items.quantity} />
                                                        <button class="quantity-plus " onClick={() => increaseQuantity(items.productId[0].id)}><FontAwesomeIcon icon={faPlus} /></button>
                                                    </div>
                                                </td>
                                                <td class="product-price">
                                                    <span class="amount">{(items.productId[0].price * items.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                </td>
                                                <td class="product-close">
                                                    <a class="product-remove" title="Remove this product" onClick={() => handleRemoveItem(items.productId[0].id)}>
                                                        <i class="fas fa-times"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div class="cart-actions mb-6 pt-4">
                                <a class="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4" style={{ fontWeight: "700" }}><NavLink to="/"><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "0.8rem", fontSize: "2rem" }} />Continue Shopping </NavLink></a>
                            </div>
                        </div>
                        <aside class="col-lg-4 sticky-sidebar-wrapper">
                            <div class="sticky-sidebar" data-sticky-options="{'bottom': 20}">
                                <div class="summary mb-4">
                                    <h3 class="summary-title text-left">Cart Totals</h3>
                                    <table class="total">
                                        <tr class="summary-subtotal">
                                            <td>
                                                <h4 class="summary-subtitle">Total</h4>
                                            </td>
                                            <td>
                                                <p class="summary-total-price ls-s">{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                            </td>
                                        </tr>
                                    </table>
                                    {
                                        dataUser ? (<>
                                            <NavLink to="/checkout" className="btn btn-dark btn-rounded btn-checkout" style={{ fontWeight: "700", fontSize: "1.3rem" }}>
                                                Proceed to checkout
                                            </NavLink>
                                        </>) : (<>
                                            <NavLink onClick={showModal} className="btn btn-dark btn-rounded btn-checkout" style={{ fontWeight: "700", fontSize: "1.3rem" }}>
                                                Proceed to checkout
                                            </NavLink>
                                        </>)
                                    }

                                </div>
                            </div>
                            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                                <div className="login-popup">
                                    <div className="form-box">
                                        <LoginPage />
                                    </div>
                                </div>
                            </Modal>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CartPage