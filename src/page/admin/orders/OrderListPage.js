import React, { useEffect, useState } from 'react'
import { useProductContext } from '../../../services/helpers/getDataHelpers';
import { useNavigate } from "react-router-dom";
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

                                                        <td data-field="date">Jul 20, 2021</td>
                                                        {
                                                            items.order.isPay == 2 ?
                                                                <td data-field="text">Tiền mặt</td> : items.order.isPay == 1 ? <td data-field="text">Paypal</td> : ""
                                                        }
                                                        {items.order.status === 1 ? (
                                                            <td class="order-success" onClick={() => handleChangeStatus(items.id)}>
                                                                <span>Xác nhận</span>
                                                            </td>
                                                        ) : items.order.status === 2 ? (
                                                            <td class="order-success" onClick={() => handleChangeStatus(items.id)}>
                                                                <span>Đang vận chuyển</span>
                                                            </td>
                                                        ) : (
                                                            <td class="order-success">
                                                                <span>Hoàn thành</span>
                                                            </td>
                                                        )}
                                                        <td data-field="number">{items.order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>

                                                        <td>
                                                            <a href="javascript:void(0)" onClick={() => handleClickDetailOrder(items.id)} >
                                                                <i class="fa fa-edit" title="Edit"></i>
                                                            </a>

                                                            <a href="javascript:void(0)">
                                                                <i class="fa fa-trash" title="Delete"></i>
                                                            </a>
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