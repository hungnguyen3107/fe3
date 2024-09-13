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
import { Tag, Popconfirm, Radio } from 'antd';

const OrderListPage = () => {
    const { order, handleChangeStatus } = useProductContext();
    const [tabPosition, setTabPosition] = useState(1);
    const changeTabPosition = (e) => {
        setTabPosition(e.target.value);
    };
    const navigate = useNavigate();
    const [filteredOrders, setFilteredOrders] = useState([]);
    console.log()
    useEffect(() => {
        // Lọc dữ liệu dựa trên trạng thái được chọn
        const filtered = order.filter(order => order.order.status === tabPosition);
        setFilteredOrders(filtered);
    }, [tabPosition, order]);
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
                                <Radio.Group value={tabPosition} onChange={changeTabPosition}>
                                    <Radio.Button value={1}>Chưa xác nhận</Radio.Button>
                                    <Radio.Button value={2}>đang giao hàng</Radio.Button>
                                    <Radio.Button value={3}>Hoàn thành</Radio.Button>
                                    <Radio.Button value={4}>Đã hủy</Radio.Button>
                                    <Radio.Button value={5}>Hoàn tiền một phần </Radio.Button>
                                    <Radio.Button value={6}>Đã hoàn tiền </Radio.Button>
                                </Radio.Group>
                            </div>

                            <div class="card-body">
                                <div class="table-responsive table-desi">
                                    <table class="table all-package" id="editableTable">
                                        <thead>
                                            <tr>
                                                <th>Họ tên</th>
                                                <th>Email</th>
                                                <th>SĐT</th>
                                                <th>Ngày đặt</th>
                                                <th>Thanh toán</th>
                                                <th>Trạng thái</th>
                                                <th>Tổng tiền</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                filteredOrders.map((items, index) => (
                                                    <tr key={index}>
                                                        <td data-field="text">
                                                            {items.order.firstName}<br />
                                                            {items.order.lastName}
                                                        </td>
                                                        <td data-field="text">{items.order.email}</td>
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
                                                        ) : items.order.status === 4 ? (
                                                            <td >
                                                                <Tag icon={<CloseCircleOutlined />} color="error">
                                                                    Đã hủy
                                                                </Tag>
                                                            </td>
                                                        ) : items.order.status === 5 ? (
                                                            <td >
                                                                <Tag icon={<CloseCircleOutlined />} color="error">
                                                                    Hoàn trả 1 phần
                                                                </Tag>
                                                            </td>
                                                        ) : (
                                                            <td >
                                                                <Tag icon={<CloseCircleOutlined />} color="error">
                                                                    Hoàn trả toàn bộ
                                                                </Tag>
                                                            </td>
                                                        )
                                                        }
                                                        <td data-field="number">{items.order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>

                                                        <td>

                                                            <FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "6px" }} onClick={() => handleClickDetailOrder(items.id)} />
                                                            {
                                                                [3, 4, 5, 6].includes(items.order.status) ? "" : (
                                                                    <Popconfirm
                                                                        title="Hủy sản phẩm này?"
                                                                        onConfirm={() => handleChangeStatus(items.id)}
                                                                        okText="Có"
                                                                        cancelText="Không"
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrash} />
                                                                    </Popconfirm>
                                                                )
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