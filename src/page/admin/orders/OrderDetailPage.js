import React, { useState, useEffect } from 'react'
import { useProductContext } from '../../../services/helpers/getDataHelpers';
import { orderServices } from '../../../services/orderService';
import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd';
import ReturnsModal from './modal/ReturnsModal';
const OrderDetailPage = () => {
    const { id } = useParams();
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
    const [orderId, setOrderId] = useState([]);
    const [informationOrder, setInformationOrder] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const navigate = useNavigate()
    const handleClickReturns = async (id) => {
        try {
            navigate(`/Returns/${id}`)
        } catch (error) {
            console.error(error);
        }
    }
    const getDetailOrder = async () => {
        try {
            const res = await orderServices.getId({ Order_id: id });
            if (res) {
                setOrderId(res.items);
            }
            console.log(res.items)
        } catch (error) {
            console.error(error);
        }
    }
    const getInformationOrder = async () => {
        try {
            const res = await orderServices.get({ Id: id });
            setInformationOrder(res.items);
            console.log("information", res.items)
        } catch (error) {
            console.error(error);
        }
    }
    // console.log("information", informationOrder[0].order.createdAt);
    useEffect(() => {
        let totalPrice = 0;
        orderId.forEach(order => {
            totalPrice += order.orderItem.price * order.orderItem.quantity;
        });
        setTotalOrderPrice(totalPrice);
    }, [orderId]);
    useEffect(() => {
        getDetailOrder();
        getInformationOrder();
    }, [])
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3>Chi tiết đơn hàng
                                    <small>Multikart Admin panel</small>
                                </h3>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <ol class="breadcrumb pull-right">
                                <li class="breadcrumb-item">
                                    <a href="index.html">
                                        <i data-feather="home"></i>
                                    </a>
                                </li>
                                <li class="breadcrumb-item">trang chủ</li>
                                <li class="breadcrumb-item active">Chi tiết đơn hàng</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="bg-inner cart-section order-details-table">
                                    <div class="row g-4">
                                        <div class="col-xl-8">

                                            <div class="card-details-title">
                                                <h3>Mã đơn hàng <span>{id}</span></h3>
                                            </div>
                                            <div class="table-responsive table-details">
                                                <table class="table cart-table table-borderless">
                                                    <thead>
                                                        <tr>
                                                            <th colspan="2">Items</th>
                                                            <th class="text-end" colspan="2">
                                                                <a href="javascript:void(0)"
                                                                    class="theme-color">Edit Items</a>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            orderId.map((items, index) => (
                                                                <tr className="table-order" key={index}>

                                                                    <td>
                                                                        <a href="javascript:void(0)">
                                                                            <img src={`https://localhost:7285/Images/${items.orderItems.image[0]}`} className="img-fluid  lazyload" alt="" />
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <p>{items.orderItems.name}</p>
                                                                        {/* <h5>Outwear & Coats</h5> */}
                                                                    </td>

                                                                    <td>
                                                                        <p>Số lượng</p>
                                                                        <h5>{items.orderItem.quantity}</h5>
                                                                    </td>
                                                                    <td>
                                                                        <p>Giá</p>
                                                                        <h5>{(items.orderItem.price * items.orderItem.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                    <tfoot>
                                                        <tr class="table-order">
                                                            <td colspan="3">
                                                                <h4 class="theme-color fw-bold">Tổng tiền :</h4>
                                                            </td>
                                                            <td>
                                                                <h4 class="theme-color fw-bold">{totalOrderPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>

                                        <div class="col-xl-4">
                                            <div class="row g-4">
                                                <div class="col-12">
                                                    <div class="order-success">
                                                        <h4>summery</h4>
                                                        <ul class="order-details">
                                                            <li>Ngày đặt: {new Date(informationOrder.length > 0 && informationOrder[0].order.createdAt).toLocaleString('vi-VN', { timeZone: 'UTC' })}</li>
                                                            <li>Tổng giá: {totalOrderPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</li>
                                                        </ul>

                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <div class="order-success">
                                                        <h4>Địa chỉ giao hàng</h4>

                                                        <ul class="order-details">
                                                            <li>{informationOrder.length > 0 && informationOrder[0].order.firstName}{informationOrder.length > 0 && informationOrder[0].order.lastName}</li>
                                                            <li>{informationOrder.length > 0 && informationOrder[0].order.address}.</li>
                                                            <li>{informationOrder.length > 0 && informationOrder[0].order.Email},{informationOrder.length > 0 && informationOrder[0].order.phoneNumber}</li>
                                                        </ul>

                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <div class="order-success">
                                                        <div class="payment-mode">
                                                            <h4>Phương thức thanh toán</h4>
                                                            <p>Pay on Delivery (Cash/Card). Cash on delivery (COD)
                                                                available. Card/Net banking acceptance subject to
                                                                device availability.</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <div class="order-success">
                                                        <div class="delivery-sec">
                                                            {/* <h3>expected date of delivery: <span>october 22,
                                                                2021</span></h3> */}
                                                            {/* <a onClick={() => handleClickReturns(id)}>Trả hàng</a> */}
                                                            <button class="btn btn-primary mt-md-0 mt-2"
                                                                style={{
                                                                    padding: "0.6rem 1.75rem",
                                                                    borderRadius: "5px",
                                                                    fontWeight: 700,
                                                                    fontSize: "14px",
                                                                    lineHeight: "20px",
                                                                    textTransform: "uppercase",
                                                                    backgroundColor: "#ff4c3b",
                                                                    borderColor: "#ff4c3b",
                                                                    color: "#fff",
                                                                    textDecoration: "none"
                                                                }} onClick={showModal}>Trả hàng</button>
                                                        </div>
                                                    </div>
                                                    <Modal title="Danh sách hàng trả" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={1000}>
                                                        <ReturnsModal getDetailOrder={getDetailOrder} />
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailPage