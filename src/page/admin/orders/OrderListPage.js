import React, { useEffect, useState } from 'react'
import { useProductContext } from '../../../services/helpers/getDataHelpers';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import { Tag, Popconfirm } from 'antd';
const OrderListPage = () => {
    const { order, handleChangeStatus } = useProductContext();
    const navigate = useNavigate()
    const handleClickDetailOrder = async (id) => {
        try {
            navigate(`${id}`)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3>Order List
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
                                <li class="breadcrumb-item">Menus</li>
                                <li class="breadcrumb-item active">Order List</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <form class="form-inline search-form search-box">
                                    <div class="form-group">
                                        <input class="form-control-plaintext" type="search" placeholder="Search.." />
                                    </div>
                                </form>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive table-desi">
                                    <table class="table all-package" id="editableTable">
                                        <thead>
                                            <tr>
                                                <th>Order Image</th>
                                                <th>Order Code</th>
                                                <th>Date</th>
                                                <th>Payment Method</th>
                                                <th>Delivery Status</th>
                                                <th>Amount</th>
                                                <th>Option</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                order.map((items, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <img src="assets/images/dashboard/product/1.jpg" alt="users" />
                                                        </td>

                                                        <td data-field="number">{items.order.phoneNumber}</td>

                                                        <td data-field="date">{new Date(items.order.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                                                        {
                                                            items.order.isPay == 2 ?
                                                                <td data-field="text">Tiền mặt</td> : items.order.isPay == 1 ? <td data-field="text">Paypal</td> : ""
                                                        }
                                                        {items.order.status === 1 ? (
                                                            <td onClick={() => handleChangeStatus(items.id)}>
                                                                <Tag icon={<ClockCircleOutlined />} color="default">
                                                                    Xác nhận
                                                                </Tag>
                                                            </td>
                                                        ) : items.order.status === 2 ? (
                                                            <td onClick={() => handleChangeStatus(items.id)}>
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
                                                        )
                                                        }
                                                        <td data-field="number">{items.order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>

                                                        <td>

                                                            <FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "6px" }} onClick={() => handleClickDetailOrder(items.id)} />
                                                            {
                                                                items.order.status === 4 ? "" : (<Popconfirm
                                                                    title="Hủy sản phẩm này?"
                                                                    onConfirm={() => handleChangeStatus(items.id)}
                                                                    okText="Có"
                                                                    cancelText="Không"
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </Popconfirm>)
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderListPage