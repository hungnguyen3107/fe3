import React, { useEffect, useState, useRef } from 'react'
import { Form, Select, Tag, DatePicker, Space, Button } from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import { orderServices } from '../../../services/orderService';
import { useDownloadExcel } from 'react-export-table-to-excel';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';
const options = [
    { value: 1, label: 'Chờ xác nhận' },
    { value: 2, label: 'Đang giao hàng ' },
    { value: 3, label: 'Đã giao hàng' },
    { value: 4, label: 'Đã hủy hàng' },
    { value: 5, label: 'Hoàn tiền một phần' },
    { value: 6, label: 'Đã hoàn tiền' },
];

const OrderReportPage = () => {
    const [selectedValue, setSelectedValue] = useState(1);
    const [orderStatus, setOrderStatus] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
    const [startDate, setStartDate] = useState(dayjs('2015/01/01', dateFormat));
    const [endDate, setEndDate] = useState(dayjs('2015/01/01', dateFormat));
    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })
    //thay đổi trạng thái 
    const handleChange = (selectedOption) => {
        setSelectedValue(selectedOption);
    };
    //lưu vào biến  
    const handleRangeChange = (dates) => {
        if (dates) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
            console.log(startDate, endDate)
        }
    };
    //lấy đơn hàng theo trạng thái 
    const getOrderStatus = async () => {
        try {
            const res = await orderServices.get(
                {
                    "Limit": currentPage,
                    "PageIndex": rowsPerPage,
                    "Status": selectedValue
                }
            );
            setOrderStatus(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getOrderStatus();
    }, [orderStatus])
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3> Báo cáo thống kê đơn hàng
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
                                <li class="breadcrumb-item">Digital</li>
                                <li class="breadcrumb-item active">Thống kê đơn hàng</li>
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
                                <Select
                                    defaultValue={selectedValue}
                                    style={{
                                        width: 200,
                                    }}
                                    value={selectedValue}
                                    onChange={handleChange}
                                    options={options}
                                />
                                <RangePicker
                                    defaultValue={[startDate, endDate]}
                                    format={dateFormat}
                                    onChange={handleRangeChange}
                                />
                                <Button onClick={onDownload}> Export excel </Button>
                            </div>
                            <div class="card-body" style={{ fontSize: "14px" }}>
                                <div>
                                    <div class="table-responsive table-desi">
                                        <table class="review-table table all-package" ref={tableRef}>
                                            <thead>
                                                <tr>
                                                    <th>Thời gian</th>
                                                    <th>Trạng thái</th>
                                                    <th>Số lượng sản phẩm</th>
                                                    <th>Tiền mặt</th>
                                                    <th>Thanh toán online</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orderStatus.map((items, index) => (
                                                        <tr key={index}>                                                           

                                                            <td data-field="date">{new Date(items.order.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>

                                                            {items.order.status === 1 ? (
                                                                <td >
                                                                    <Tag icon={<ClockCircleOutlined />} color="default">
                                                                        Chờ xác nhận
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
                                                                        Đã giao hàng
                                                                    </Tag>
                                                                </td>
                                                            ) : items.order.status === 4 ? (
                                                                <td >
                                                                    <Tag icon={<CloseCircleOutlined />} color="error">
                                                                        Đã hủy Hàng
                                                                    </Tag>
                                                                </td>
                                                            ) : items.order.status === 5 ? (
                                                                <td >
                                                                    <Tag icon={<CloseCircleOutlined />} color="error">
                                                                        Đã trả một phần
                                                                    </Tag>
                                                                </td>
                                                            ) : (
                                                                <td >
                                                                    <Tag icon={<CloseCircleOutlined />} color="error">
                                                                        Đã trả toàn bộ
                                                                    </Tag>
                                                                </td>
                                                            )
                                                            }
                                                            <td>

                                                            </td>
                                                            {
                                                                items.order.isPay == 2 ?
                                                                    <td data-field="number">{items.order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td> : <td data-field="text"></td>
                                                            }

                                                            {
                                                                items.order.isPay == 1 ?
                                                                    <td data-field="number">{items.order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td> : <td data-field="text"></td>
                                                            }
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
        </div>
    )
}

export default OrderReportPage