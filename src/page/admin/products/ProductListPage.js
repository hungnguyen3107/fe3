import React, { useState, useEffect } from 'react'
import { productServices } from '../../../services/productService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { NavLink } from "react-router-dom";
import { useProductContext } from '../../../services/helpers/getDataHelpers';
import { Popconfirm } from "antd";
const ProductListPage = () => {
    const { product, handleOnclickId, handleDeleteProduct } = useProductContext();

    // const columns = [
    //     {
    //       title: "Ảnh",
    //       key: "image",
    //       dataIndex: "image",
    //       render: (text) => (
    //         <>
    //           <Avatar.Group>
    //             <Avatar
    //               className="shape-avatar"
    //               shape="square"
    //               size={40}
    //               src={`https://localhost:7285/Images/${text[0]}`}
    //             ></Avatar>
    //           </Avatar.Group>{" "}
    //         </>
    //       )
    //     },
    //     {
    //       title: "Tên sản phẩm",
    //       dataIndex: "name",
    //       key: "name",
    //       width: "32%",
    //     },
    //     {
    //         title: "Giá",
    //         dataIndex: "price",
    //         key: "price",
    //         width: "32%",
    //       },
    //       {
    //         title: "Số lượng",
    //         dataIndex: "quantity",
    //         key: "quantity",
    //         width: "32%",
    //       },
    //     {
    //       title: 'Thao tác',
    //       width: '108px',
    //       render: (record, index) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

    //         <EditOutlined onClick={() => showModalEdit(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
    //         <Popconfirm onConfirm={() => handleDelete(record.id)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
    //           <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
    //         </Popconfirm>
    //       </div>
    //     }
    //   ];
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3>Product List
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
                                <li class="breadcrumb-item active">Product List</li>
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
                                <NavLink to="/AddProduct" class="btn btn-primary mt-md-0 mt-2"
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
                                    }}>Add New
                                    Product</NavLink>
                            </div>

                            <div class="card-body">
                                <div class="table-responsive table-desi">
                                    <table class="table list-digital all-package table-category "
                                        id="editableTable">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Product Image</th>
                                                <th>Product Title</th>
                                                <th>Entry Type</th>
                                                <th>Quantity</th>
                                                <th>Option</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                product.map((items, index) => (
                                                    <tr key={index} style={{
                                                        fontWeight: "400",
                                                        fontSize: "14px"
                                                    }}>
                                                        <td>31</td>
                                                        <td>
                                                            <img src={`https://localhost:7285/Images/${items.image[0]}`}
                                                                data-field="image" alt="" />
                                                        </td>

                                                        <td data-field="name">{items.name}</td>

                                                        <td data-field="price">{items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>

                                                        <td data-field="name">{items.quantity}</td>

                                                        <td>
                                                            <a href="javascript:void(0)">
                                                                <FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "6px" }} onClick={() => handleOnclickId(items.id)} />
                                                            </a>

                                                            <a href="javascript:void(0)">
                                                                <Popconfirm onConfirm={() => handleDeleteProduct(items.id)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </Popconfirm>
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

export default ProductListPage