import React, { useState, useEffect } from 'react'
import { orderServices } from '../../../services/orderService';
const ProductReportPage = () => {
    const [reportProduct, setReportProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
    const getReport = async () => {
        try {
            const res = await orderServices.getReportProduct(
                {
                    "Limit": currentPage,
                    "PageIndex": rowsPerPage,
                }
            );
            setReportProduct(res.reportOrderProducts);
        } catch (error) {
            console.error(error);
        }
    }
    console.log(reportProduct)
    useEffect(() => {
        getReport();
    }, [])
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3> Báo cáo thống kê Sản phẩm
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
                                <li class="breadcrumb-item active">Thống kê sản phẩm</li>
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
                            <div class="card-body" style={{ fontSize: "14px" }}>
                                <div>
                                    <div class="table-responsive table-desi">
                                        <table class="review-table table all-package" >
                                            <thead>
                                                <tr>
                                                    <th>Ảnh sản phẩm</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>số lượng bán</th>
                                                    <th>doanh thu</th>
                                                    <th>Lợi nhuận</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    reportProduct.map((items, index) => (
                                                        <tr key={index}>
                                                            <td data-field="Image">
                                                                <img src={`https://192.168.243.125:7285/Images/${items.product.image[0]}`}
                                                                    data-field="image" alt="" />
                                                            </td>
                                                            <td data-field="name">
                                                                {items.product.name}
                                                            </td>
                                                            <td data-field="number">
                                                                {items.totalQuantity}
                                                            </td>
                                                            {
                                                                items.product.isStatus == 0 ?
                                                                    <td data-field="number">{(items.product.price * items.totalQuantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td> : <td data-field="number">{(items.product.promotionPrice * items.totalQuantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                            }

                                                            {
                                                                items.product.isStatus == 0 ?
                                                                    <td data-field="number">{((items.product.price * items.totalQuantity) - (items.product.inportPrice * items.totalQuantity)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td> : <td data-field="number">{((items.product.promotionPrice * items.totalQuantity) - (items.product.inportPrice * items.totalQuantity)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
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

export default ProductReportPage