import React, { useEffect, useState } from 'react'
import { orderServices } from '../../services/orderService';
import { useCartContext } from '../../services/helpers/getDataCartHelper';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    SyncOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import { Tag } from 'antd';
const HistoryOrderPage = () => {
    const [historyOrder, setHistoryOrder] = useState([])
    const [isOrder, setIsOrder] = useState(false);
    const [histortyDetailOrder, setHistoryDetailOrder] = useState([]);
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
    const { dataUser } = useCartContext();
    const handleClickOrder = () => {
        setIsOrder(!isOrder);
    }
    //lấy dữ liệu đơn hàng của từng người dùng
    const getHistoryOrder = async () => {
        try {
            const res = await orderServices.get({ "User_id": dataUser.id });
            setHistoryOrder(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    //xem chi tiết sản phẩm của đơn hàng 
    const getHistoryDetailOrder = async (id) => {
        try {
            const res = await orderServices.getId({ Order_id: id });
            if (res) {
                setHistoryDetailOrder(res.items);
                setIsOrder(!isOrder);
            }
        } catch (error) {
            console.error(error);
        }
    }
    //load dữ liệu
    useEffect(() => {
        getHistoryOrder();
        getHistoryDetailOrder();
    }, [])
    //tính tổng số tiền 
    useEffect(() => {
        let totalPrice = 0;
        histortyDetailOrder.forEach(order => {
            totalPrice += order.orderItem.price * order.orderItem.quantity;
        });
        setTotalOrderPrice(totalPrice);
    }, [histortyDetailOrder]);
    return (
        <div >
            <table className="order-table" style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.4rem" }}>
                <thead>
                    <tr>
                        <th className="pl-2">STT</th>
                        <th>Ngày</th>
                        <th>Trạng thái</th>
                        <th>Tổng </th>
                        <th className="pr-2">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        historyOrder.map((items, index) => (
                            <tr key={index}>
                                <td className="order-number"><a href="#">{index + 1}</a></td>
                                <td className="order-date"><span>{new Date(items.order.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span></td>
                                {items.order.status === 1 ? (
                                    <td >
                                        <Tag icon={<ClockCircleOutlined />} color="default">
                                            Xác nhận
                                        </Tag>
                                    </td>
                                ) : items.order.status === 2 ? (
                                    <td >
                                        <Tag icon={<SyncOutlined spin />} color="processing">
                                            Đang vận chuyển
                                        </Tag>
                                    </td>
                                ) : items.order.status === 3 ? (
                                    <td >
                                        <Tag icon={<CheckCircleOutlined />} color="success">
                                            Hoàn thành
                                        </Tag>
                                    </td>
                                ) : (
                                    <td >
                                        <Tag icon={<CloseCircleOutlined />} color="error">
                                            Đã hủy
                                        </Tag>
                                    </td>
                                )}

                                <td className="order-total"><span>{items.order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></td>
                                <td className="order-action"><a className="  btn-link btn-underline" style={{ display: "inline-block", marginBottom: "2rem", padding: 0, textDecoration: "none" }} onClick={() => getHistoryDetailOrder(items.id)}>Xem chi tiết</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div class={`dropdown cart-dropdown type2 off-canvas mr-0 mr-lg-2 ${isOrder ? "opened" : ""}`}>
                <a class="cart-toggle label-block link" >
                    <div class="cart-label d-lg-show">
                        {/* <span class="cart-name">Sản phẩm:</span> */}
                        {/* <span class="cart-price">{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span> */}
                    </div>

                    {/* <i ><FontAwesomeIcon icon={faBagShopping} /><span class="cart-count">{totalQuantity}</span></i> */}
                </a>
                <div class="canvas-overlay" onClick={handleClickOrder}></div>

                <div class="dropdown-box">
                    <div class="canvas-header">
                        <h4 class="canvas-title">Sản phẩm</h4>
                        <a class="btn btn-dark btn-link btn-icon-right btn-close" onClick={handleClickOrder}>close<span class="sr-only">Cart</span></a>
                    </div>
                    <div class="products scrollable">
                        {histortyDetailOrder.map((items, index) => (
                            <div class="product product-cart" key={index}>
                                <figure class="product-media">
                                    <a >
                                        <img src={`https://192.168.243.125:7285/Images/${items.orderItems.image[0]}`} alt="product" width="80" height="88" />
                                    </a>
                                </figure>
                                <div class="product-detail">
                                    <a class="product-name">{items.orderItems.name}</a>
                                    <div class="price-box">
                                        <span class="product-quantity">{items.orderItem.quantity}</span>
                                        <span class="product-price">{items.orderItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="cart-total">
                        <label>Tổng tiền:</label>
                        <span class="price">{totalOrderPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>

                    {/* <div class="cart-action">
                        <a href="checkout.html" class="btn btn-dark"><span>Go To Checkout</span></a>
                    </div> */}

                </div>

            </div>
        </div>
    )
}

export default HistoryOrderPage