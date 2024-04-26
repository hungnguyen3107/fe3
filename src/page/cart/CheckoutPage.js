import React, { useState } from 'react'
import { useCartContext } from '../../services/helpers/getDataCartHelper'
import { useFormik, Field } from "formik";
import { orderServices } from '../../services/orderService';
import { vnPayServices } from '../../services/vnPayService';
import { message } from 'antd';
import { useProductContext } from '../../services/helpers/getDataHelpers';
import { useNavigate } from 'react-router-dom';
const CheckoutPage = () => {
    const { dataProducts, calculateTotalPrice } = useCartContext();
    const [paymentMethod, setPaymentMethod] = useState();
    const { province, district, ward } = useProductContext();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();
    const handlePaymentChange = (event) => {
        setPaymentMethod(parseInt(event.target.value));
    };
    const totalPrice = calculateTotalPrice();
    const formik = useFormik({
        initialValues: {
            email: "",
            phoneNumber: "",
            address: "",
            note: "",
            price: 0,
            IsPay: 0,
            status: 0,
            firstName: "",
            lastName: "",
            province_id: "",
            district_id: "",
            ward_id: "",
            user_id: "",
            orderItems: [
                {
                    price: 0,
                    quantity: 0,
                    productId: ""
                }
            ]
        },
        onSubmit: async (values) => {
            if (paymentMethod == 2) {
                try {
                    const payload = {
                        order: {
                            email: values.email,
                            phoneNumber: values.phoneNumber.toString(),
                            address: values.address,
                            note: values.note,
                            price: totalPrice,
                            status: 1,
                            IsPay: paymentMethod,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            province_id: values.province_id,
                            district_id: values.district_id,
                            ward_id: values.ward_id,
                            user_id: user.id
                        },
                        orderItems: dataProducts.map(item => ({
                            price: item.productId[0].price,
                            quantity: item.quantity,
                            productId: item.productId[0].id
                        }))
                    };
                    console.log(payload);
                    await orderServices.create(payload);
                    message.success("Thanh toán thành công");
                    sessionStorage.removeItem("products");
                    navigate("/orderSuccess");
                } catch (error) {
                    console.error(error);
                    message.error("Thanh toán thất bại");
                }
            } else if (paymentMethod == 1) {
                try {
                    const payload = {
                        order: {
                            email: values.email,
                            phoneNumber: values.phoneNumber.toString(),
                            address: values.address,
                            note: values.note,
                            price: totalPrice,
                            status: 1,
                            IsPay: paymentMethod,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            province_id: values.province_id,
                            district_id: values.district_id,
                            ward_id: values.ward_id,
                            user_id: user.id
                        },
                        orderItems: dataProducts.map(item => ({
                            price: item.productId[0].price,
                            quantity: item.quantity,
                            productId: item.productId[0].id
                        }))
                    };
                    console.log(payload);
                    const res = await vnPayServices.create(payload);
                    // message.success("Thanh toán thành công");
                    // sessionStorage.removeItem("products");
                    window.location.href = res.redirectUrl;
                } catch (error) {
                    console.error(error);
                    message.error("Thanh toán thất bại");
                }
            }

        }
    });
    return (
        <main class="main checkout">
            <div class="page-content pt-7 pb-10 mb-10">
                <div class="step-by pr-4 pl-4">
                    <h3 class="title title-simple title-step"><a href="cart.html">1. Shopping Cart</a></h3>
                    <h3 class="title title-simple title-step active"><a href="checkout.html">2. Checkout</a></h3>
                    <h3 class="title title-simple title-step"><a href="order.html">3. Order Complete</a></h3>
                </div>
                <div class="container mt-7">
                    <div class="card accordion">
                        <div class="alert alert-light alert-primary alert-icon mb-4 card-header">
                            <i class="fas fa-exclamation-circle"></i>
                            <span class="text-body">Returning customer?</span>
                            <a href="#alert-body1" class="text-primary collapse">Click here to login</a>
                        </div>
                        <div class="alert-body collapsed" id="alert-body1">
                            <p>If you have shopped with us before, please enter your details below.
                                If you are a new customer, please proceed to the Billing section.</p>
                            <div class="row cols-md-2">
                                <form class="mb-4 mb-md-0">
                                    <label for="username">Username Or Email *</label>
                                    <input type="text" class="input-text form-control mb-0" name="username" id="username" autocomplete="username" />
                                </form>
                                <form class="mb-4 mb-md-0">
                                    <label for="password">Password *</label>
                                    <input class="input-text form-control mb-0" type="password" name="password" id="password" autocomplete="current-password" />
                                </form>
                            </div>
                            <div class="checkbox d-flex align-items-center justify-content-between">
                                <div class="form-checkbox pt-0 mb-0">
                                    <input type="checkbox" class="custom-checkbox" id="signin-remember" name="signin-remember" />
                                    <label class="form-control-label" for="signin-remember">Remember
                                        Me</label>
                                </div>
                                <a href="#" class="lost-link">Lost your password?</a>
                            </div>
                            <div class="link-group">
                                <a href="#" class="btn btn-dark btn-rounded mb-4">Login</a>
                                <span class="d-inline-block text-body font-weight-semi-bold">or Login With</span>
                                <div class="social-links mb-4">
                                    <a href="#" class="social-link social-google fab fa-google"></a>
                                    <a href="#" class="social-link social-facebook fab fa-facebook-f"></a>
                                    <a href="#" class="social-link social-twitter fab fa-twitter"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card accordion">
                        <div class="alert alert-light alert-primary alert-icon mb-4 card-header">
                            <i class="fas fa-exclamation-circle"></i>
                            <span class="text-body">Have a coupon?</span>
                            <a href="#alert-body2" class="text-primary">Click here to enter your code</a>
                        </div>
                        <div class="alert-body collapsed" id="alert-body2">
                            <p>If you have a coupon code, please apply it below.</p>
                            <div class="check-coupon-box d-flex">
                                <input type="text" name="coupon_code" class="input-text form-control text-grey ls-m mr-4 mb-4" id="coupon_code" value placeholder="Coupon code" />
                                <button type="submit" class="btn btn-dark btn-rounded btn-outline mb-4">Apply
                                    Coupon</button>
                            </div>
                        </div>
                    </div>
                    <form class="form" onSubmit={formik.handleSubmit}>
                        <div class="row">
                            <div class="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                                <h3 class="title title-simple text-left text-uppercase">Billing Details</h3>
                                <div class="row">
                                    <div class="col-xs-6">
                                        <label>First Name *</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            name="firstName" required
                                        />
                                    </div>
                                    <div class="col-xs-6">
                                        <label>Last Name *</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            name="lastName" required
                                        />
                                    </div>
                                </div>
                                <label>Street Address *</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    name="address" required
                                    placeholder="House number and street name" />
                                <select
                                    id="province"
                                    className="form-control"
                                    name="province_id"
                                    required
                                    value={formik.values.province_id}
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Chọn Tỉnh/Thành phố</option>
                                    {province.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                <label>District</label>
                                <select
                                    id="district"
                                    className="form-control"
                                    name="district_id"
                                    required
                                    value={formik.values.district_id}
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Chọn Quận/Huyện</option>
                                    {district.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                <label>Ward</label>
                                <select
                                    id="ward"
                                    className="form-control"
                                    name="ward_id"
                                    required
                                    value={formik.values.ward_id}
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Chọn Phường/Xã</option>
                                    {ward.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                <div class="row">
                                    <div class="col-xs-6">
                                        <label>Email Address *</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            name="email" required
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div class="col-xs-6">
                                        <label>Phone *</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="phoneNumber" required
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                                <div class="form-checkbox mb-0">
                                    <input type="checkbox" class="custom-checkbox" id="create-account" name="create-account" />
                                    <label class="form-control-label ls-s" for="create-account">Create an
                                        account?</label>
                                </div>
                                <div class="form-checkbox mb-6">
                                    <input type="checkbox" class="custom-checkbox" id="different-address" name="different-address" />
                                    <label class="form-control-label ls-s" for="different-address">Ship to a different
                                        address?</label>
                                </div>
                                <h2 class="title title-simple text-uppercase text-left">Additional Information</h2>
                                <label>Order Notes (Optional)</label>
                                <textarea
                                    class="form-control pb-2 pt-2 mb-0"
                                    cols="30" rows="5"
                                    name="note"
                                    placeholder="Notes about your order, e.g. special notes for delivery"
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                ></textarea>
                            </div>
                            <aside class="col-lg-5 sticky-sidebar-wrapper">
                                <div class="sticky-sidebar mt-1" data-sticky-options="{'bottom': 50}">
                                    <div class="summary pt-5">
                                        <h3 class="title title-simple text-left text-uppercase">Your Order</h3>
                                        <table class="order-table">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dataProducts && dataProducts.map((items, index) => (
                                                        <tr>
                                                            <td class="product-name">{items.productId[0].name} <span class="product-quantity">×&nbsp;{items.quantity}</span></td>
                                                            <td class="product-total text-body">{items.productId[0].price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                        </tr>
                                                    ))
                                                }
                                                <tr class="sumnary-shipping shipping-row-last">
                                                    <td colspan="2">
                                                        <h4 class="summary-subtitle">Calculate Shipping</h4>
                                                        <ul>
                                                            <li>
                                                                <div class="custom-radio">
                                                                    <input type="radio" id="flat_rate" name="shipping" class="custom-control-input" checked />
                                                                    <label class="custom-control-label" for="flat_rate">Flat rate</label>
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
                                                                    <label class="custom-control-label" for="local_pickup">Local pickup</label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr class="summary-total">
                                                    <td class="pb-0">
                                                        <h4 class="summary-subtitle">Total</h4>
                                                    </td>
                                                    <td class=" pt-0 pb-0">
                                                        <p class="summary-total-price ls-s text-primary">{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="payment accordion radio-type">
                                            <h4 className="summary-subtitle ls-m pb-3">Payment Methods</h4>
                                            <div class="card" style={{ border: "none" }}>
                                                <div class="card-header">
                                                    <input
                                                        type="radio"
                                                        id="test2"
                                                        name="radio-group"
                                                        value={1}
                                                        onChange={handlePaymentChange}
                                                        checked={paymentMethod === 1}
                                                    />
                                                    <label for="test2" style={{ color: "#666", fontSize: "1.4rem", lineHeight: "3rem" }}>Paypal</label>
                                                </div>
                                                <div id="collapse1" class="expanded" style={{ display: "none" }}>
                                                    <div class="card-body ls-m">
                                                        Please send a check to Store Name, Store Street,
                                                        Store Town, Store State / County, Store Postcode.
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card" style={{ border: "none" }}>
                                                <div class="card-header">
                                                    <input
                                                        type="radio"
                                                        id="test3"
                                                        name="radio-group"
                                                        value={2}
                                                        onChange={handlePaymentChange}
                                                        checked={paymentMethod === 2}
                                                    />
                                                    <label for="test3" style={{ color: "#666", fontSize: "1.4rem", lineHeight: "3rem" }}>Tiền mặt</label>
                                                </div>
                                                <div id="collapse2" class="collapsed" style={{ display: "none" }}>
                                                    <div class="card-body ls-m">
                                                        Pay with cash upon delivery.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-checkbox mt-4 mb-5">
                                            <input type="checkbox" class="custom-checkbox" id="terms-condition" name="terms-condition" />
                                            <label class="form-control-label" for="terms-condition">
                                                I have read and agree to the website <a href="#">terms and conditions
                                                </a>*
                                            </label>
                                        </div>
                                        <button type="submit" class="btn btn-dark btn-rounded btn-order" style={{ padding: "1.22em 2.78em", fontWeight: "700", fontSize: "1.4rem" }}>Place
                                            Order</button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default CheckoutPage