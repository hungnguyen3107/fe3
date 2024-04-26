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
    const { dataUser, dataProducts, calculateTotalPrice, handleRemoveItem, isDataCart } = useCartContext();
    const { isModalOpen, handleOk, handleCancel, showModal } = useProductContext();
    const totalPrice = calculateTotalPrice();
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
                                                        <button class="quantity-minus"><FontAwesomeIcon icon={faMinus} /></button>
                                                        <input class="quantity form-control" type="number" min="1" max="1000000" />
                                                        <button class="quantity-plus "><FontAwesomeIcon icon={faPlus} /></button>
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
                                <button type="submit" class="btn btn-outline btn-dark btn-md btn-rounded btn-disabled">Update
                                    Cart</button>
                            </div>
                            <div class="cart-coupon-box mb-8">
                                <h4 class="title coupon-title text-uppercase ls-m">Coupon Discount</h4>
                                <input type="text" name="coupon_code" class="input-text form-control text-grey ls-m mb-4" id="coupon_code" value placeholder="Enter coupon code here..." />
                                <button type="submit" class="btn btn-md btn-dark btn-rounded btn-outline">Apply
                                    Coupon</button>
                            </div>
                        </div>
                        <aside class="col-lg-4 sticky-sidebar-wrapper">
                            <div class="sticky-sidebar" data-sticky-options="{'bottom': 20}">
                                <div class="summary mb-4">
                                    <h3 class="summary-title text-left">Cart Totals</h3>
                                    <table class="shipping">
                                        <tr class="summary-subtotal">
                                            <td>
                                                <h4 class="summary-subtitle">Subtotal</h4>
                                            </td>
                                            <td>
                                                <p class="summary-subtotal-price">$426.99</p>
                                            </td>
                                        </tr>
                                        <tr class="sumnary-shipping shipping-row-last">
                                            <td colspan="2">
                                                <h4 class="summary-subtitle">Calculate Shipping</h4>
                                                <ul>
                                                    <li>
                                                        <div class="custom-radio">
                                                            <input type="radio" id="flat_rate" name="shipping" class="custom-control-input" checked />
                                                            <label class="custom-control-label" for="flat_rate">Flat
                                                                rate</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="custom-radio">
                                                            <input type="radio" id="free-shipping" name="shipping" class="custom-control-input" />
                                                            <label class="custom-control-label" for="free-shipping">Free
                                                                shipping</label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="custom-radio">
                                                            <input type="radio" id="local_pickup" name="shipping" class="custom-control-input" />
                                                            <label class="custom-control-label" for="local_pickup">Local
                                                                pickup</label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </table>
                                    <div class="shipping-address">
                                        <label>Shipping to <strong>CA.</strong></label>
                                        <div class="select-box">
                                            <select name="country" class="form-control">
                                                <option value="us" selected>United States (US)</option>
                                                <option value="uk"> United Kingdom</option>
                                                <option value="fr">France</option>
                                                <option value="aus">Austria</option>
                                            </select>
                                        </div>
                                        <div class="select-box">
                                            <select name="country" class="form-control">
                                                <option value="us" selected>California</option>
                                                <option value="uk">Alaska</option>
                                                <option value="fr">Delaware</option>
                                                <option value="aus">Hawaii</option>
                                            </select>
                                        </div>
                                        <input type="text" class="form-control" name="code" placeholder="Town / City" />
                                        <input type="text" class="form-control" name="code" placeholder="ZIP" />
                                        <a href="#" class="btn btn-md btn-dark btn-rounded btn-outline">Update
                                            totals</a>
                                    </div>
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