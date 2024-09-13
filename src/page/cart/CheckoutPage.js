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
                    const res = await orderServices.create(payload);
                    console.log(res);
                    message.success("Thanh toán thành công");
                    sessionStorage.removeItem("products");
                    navigate(`/orderSuccess/${res.orderId}`);
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
                    sessionStorage.removeItem("products");
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
                    <h3 class="title title-simple title-step"><a href="cart.html">1. Giỏ hàng</a></h3>
                    <h3 class="title title-simple title-step active"><a href="checkout.html">2. Kiểm tra</a></h3>
                    <h3 class="title title-simple title-step"><a href="order.html">3. Hoàn thành</a></h3>
                </div>
                <div class="container mt-7">

                    <div class="card accordion">

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
                                <h3 class="title title-simple text-left text-uppercase">Chi tiết thanh toán</h3>
                                <div class="row">
                                    <div class="col-xs-6">
                                        <label>Họ *</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            name="firstName" required
                                        />
                                    </div>
                                    <div class="col-xs-6">
                                        <label>Tên *</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            name="lastName" required
                                        />
                                    </div>
                                </div>
                                <label>Địa chỉ nhà,tên đường *</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    name="address" required
                                    placeholder="Số nhà và tên đường" />
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
                                <label>Quận,Huyện</label>
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
                                <label>Xã,phường</label>
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
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            name="email" required
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                    <div class="col-xs-6">
                                        <label>SĐT *</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="phoneNumber" required
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                                <h2 class="title title-simple text-uppercase text-left">Thông tin thêm</h2>
                                <label>Ghi chú</label>
                                <textarea
                                    class="form-control pb-2 pt-2 mb-0"
                                    cols="30" rows="5"
                                    name="note"
                                    placeholder="Ghi chú về đơn đặt hàng của bạn, ví dụ: ghi chú đặc biệt khi giao hàng"
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                ></textarea>
                            </div>
                            <aside class="col-lg-5 sticky-sidebar-wrapper">
                                <div class="sticky-sidebar mt-1" data-sticky-options="{'bottom': 50}">
                                    <div class="summary pt-5">
                                        <h3 class="title title-simple text-left text-uppercase">Đơn hàng</h3>
                                        <table class="order-table">
                                            <thead>
                                                <tr>
                                                    <th>Sản phẩm</th>
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
                                                <tr class="summary-total">
                                                    <td class="pb-0">
                                                        <h4 class="summary-subtitle">Tổng</h4>
                                                    </td>
                                                    <td class=" pt-0 pb-0">
                                                        <p class="summary-total-price ls-s text-primary">{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="payment accordion radio-type">
                                            <h4 className="summary-subtitle ls-m pb-3">Phương thức thanh toán</h4>
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
                                                    <label for="test2" style={{ color: "#666", fontSize: "1.4rem", lineHeight: "3rem" }}>VnPay</label>
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

                                        <button type="submit" class="btn btn-dark btn-rounded btn-order" style={{ padding: "1.22em 2.78em", fontWeight: "700", fontSize: "1.4rem" }}>Đặt hàng</button>
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