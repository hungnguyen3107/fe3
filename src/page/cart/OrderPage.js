import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { orderServices } from '../../services/orderService';
import { useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    SyncOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import { Tag } from 'antd';
const OrderPage = () => {
    const [orderComplete, setOrderComplete] = useState([]);
    const [orderNew, setOrderNew] = useState([]);
    const { id } = useParams();
    //lấy đơn hàng mới đặt
    const OrderNew = async () => {
        try {
            const res = await orderServices.get({ "Order_id": id });
            setOrderNew(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    //lấy sản phẩm mới đặt 
    const DetailOrderNew = async () => {
        try {
            const res = await orderServices.getId({ Order_id: id });
            if (res) {
                setOrderComplete(res.items);
            }
        } catch (error) {
            console.error(error);
        }
    }
    //load dữ liệu
    useEffect(() => {
        DetailOrderNew();
        OrderNew();
    }, [])
    return (
        <main class="main order">
            <div class="page-content pt-7 pb-10 mb-10">
                <div class="step-by pr-4 pl-4">
                    <h3 class="title title-simple title-step"><a href="cart.html">1. Shopping Cart</a></h3>
                    <h3 class="title title-simple title-step"><a href="checkout.html">2. Checkout</a></h3>
                    <h3 class="title title-simple title-step active"><a href="order.html">3. Order Complete</a></h3>
                </div>
                <div class="container mt-8">
                    <div class="order-message mr-auto ml-auto">
                        <div class="icon-box d-inline-flex align-items-center">
                            <div class="icon-box-icon mb-0">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <circle fill="none" cx="12" cy="12" r="11" stroke="#0074D9" stroke-width="2" />
                                    <path fill="#0074D9" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                                </svg>
                            </div>
                            <div class="icon-box-content text-left">
                                <h5 class="icon-box-title font-weight-bold lh-1 mb-1">Thank You!</h5>
                                <p class="lh-1 ls-m">Your order has been received</p>
                            </div>
                        </div>
                    </div>
                    {
                        orderNew.map((items, index) => (
                            <div class="order-results" key={index}>
                                <div class="overview-item">
                                    <span>Mã đơn:</span>
                                    <strong>{id}</strong>
                                </div>
                                <div class="overview-item">
                                    <span>Trạng thái:</span>
                                    <strong>{items.order.status === 1 ? (

                                        <Tag icon={<ClockCircleOutlined />} color="default">
                                            Xác nhận
                                        </Tag>

                                    ) : items.order.status === 2 ? (

                                        <Tag icon={<SyncOutlined spin />} color="processing">
                                            Đang vận chuyển
                                        </Tag>

                                    ) : items.order.status === 3 ? (

                                        <Tag icon={<CheckCircleOutlined />} color="success">
                                            Hoàn thành
                                        </Tag>

                                    ) : (

                                        <Tag icon={<CloseCircleOutlined />} color="error">
                                            Đã hủy
                                        </Tag>

                                    )}</strong>
                                </div>
                                <div class="overview-item">
                                    <span>Ngày:</span>
                                    <strong>{new Date(items.order.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</strong>
                                </div>
                                <div class="overview-item">
                                    <span>Email:</span>
                                    <strong><a href="https://d-themes.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="3e0f0c0d0a0b7e59535f5752105d5153">[email&#160;protected]</a></strong>
                                </div>
                                <div class="overview-item">
                                    <span>Tổng:</span>
                                    <strong>{items.order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                                </div>
                                <div class="overview-item">
                                    <span>Phương thức thanh toán:</span>
                                    <strong>{items.order.isPay == 2 ? 'Tiền mặt' : 'Paypal'}</strong>
                                </div>
                            </div>
                        ))
                    }

                    <h2 class="title title-simple text-left pt-4 font-weight-bold text-uppercase">Order Details</h2>
                    <div class="order-details">
                        <table class="order-details-table">
                            <thead>
                                <tr class="summary-subtotal">
                                    <td>
                                        <h3 class="summary-subtitle">Product</h3>
                                    </td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {orderComplete.map((items, index) => (
                                    <tr>
                                        <td class="product-name">{items.orderItems.name}<span> <i class="fas fa-times"></i>
                                            {items.orderItem.quantity}</span></td>
                                        <td class="product-price">{items.orderItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    </tr>
                                ))}


                                <tr class="summary-subtotal">
                                    <td>
                                        <h4 class="summary-subtitle">Subtotal:</h4>
                                    </td>
                                    <td class="summary-subtotal-price">$312.00</td>
                                </tr>
                                <tr class="summary-subtotal">
                                    <td>
                                        <h4 class="summary-subtitle">Shipping:</h4>
                                    </td>
                                    <td class="summary-subtotal-price">Free shipping</td>
                                </tr>
                                <tr class="summary-subtotal">
                                    <td>
                                        <h4 class="summary-subtitle">Payment method:</h4>
                                    </td>
                                    <td class="summary-subtotal-price">Cash on delivery</td>
                                </tr>
                                <tr class="summary-subtotal">
                                    <td>
                                        <h4 class="summary-subtitle">Total:</h4>
                                    </td>
                                    <td>
                                        <p class="summary-total-price">$312.00</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <h2 class="title title-simple text-left pt-10 mb-2">Billing Address</h2>
                    <div class="address-info pb-8 mb-6">
                        <p class="address-detail pb-2">
                            John Doe<br />
                            Riode Company<br />
                            Steven street<br />
                            El Carjon, CA 92020<br />
                            123456789
                        </p>
                        <p class="email"><a href="https://d-themes.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="0c616d65604c7e65636869226f6361">[email&#160;protected]</a></p>
                    </div> */}
                    <NavLink to="/" className="btn btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4"><FontAwesomeIcon style={{ marginRight: "0.7rem" }} icon={faArrowLeft} /> Trở lại danh sách</NavLink>
                </div>
            </div>
        </main>
    )
}

export default OrderPage