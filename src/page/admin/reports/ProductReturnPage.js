import React, { useState, useEffect, useRef } from 'react'
import { returnServices } from '../../../services/returnService';
import { Button } from "antd";
import { useDownloadExcel } from 'react-export-table-to-excel';
const ProductReturnPage = () => {
    const [returnProduct, setReturnProduct] = useState([]);
    const [search, setSearch] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })
    const getReport = async () => {
        try {
            const res = await returnServices.get(
                {
                    "Name": search
                }
            );
            setReturnProduct(res.items);
            console.log(res.items)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getReport();
    }, [search])
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3> Báo cáo thống kê Sản phẩm hoàn trả
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
                                        <input class="form-control-plaintext"
                                            type="text"
                                            placeholder="Search.."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    setSearch(e.target?.value)
                                                }
                                            }}
                                        />
                                    </div>
                                </form>
                                <Button onClick={onDownload}> Export excel </Button>
                            </div>
                            <div class="card-body" style={{ fontSize: "14px" }}>
                                <div>
                                    <div class="table-responsive table-desi">
                                        <table class="review-table table all-package" ref={tableRef}>
                                            <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Ảnh sản phẩm</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>số lượng </th>
                                                    <th>Lí do</th>
                                                    <th>Hoàn trả</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    returnProduct.map((items, index) => (
                                                        <tr key={index}>
                                                            <td data-field="name">
                                                                {items.email}
                                                            </td>
                                                            <td data-field="image-url">
                                                                <img src={`https://192.168.243.125:7285/Images/${items.image[0]}`} alt="" />
                                                            </td>
                                                            <td data-field="name">
                                                                {items.name}
                                                            </td>
                                                            <td data-field="number">
                                                                {items.quantity}
                                                            </td>
                                                            <td data-field="name">
                                                                {items.reason}
                                                            </td>
                                                            <td data-field="number">
                                                                {items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
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
        </div>
    )
}

export default ProductReturnPage