import React, { useState, useEffect } from 'react'
import { productServices } from '../../../services/productService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Pagination } from 'antd';
import { NavLink } from "react-router-dom";
import { useProductContext } from '../../../services/helpers/getDataHelpers';
import { Popconfirm, message } from "antd";
const ProductListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const { handleOnclickId } = useProductContext();
    const getProduct = async () => {
        try {
            const res = await productServices.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
                "Name": search
            });
            if (res) {
                setProduct(res.items);
                setTotalCount(res.totalCount);
            }

        } catch (error) {
            console.error(error);
        }
    }
    const handleDeleteProduct = async (id) => {
        try {
            const res = await productServices.deleteProduct({ Id: id });
            if (res) {
                getProduct()
            } else {
                message.error('xóa thất bại')
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProduct();
    }, [currentPage, rowsPerPage, search])
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
                                        <input class="form-control-plaintext"
                                            type="text"
                                            placeholder="Search.."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    setSearch(e.target?.value)
                                                    setCurrentPage(1)
                                                }
                                            }}
                                        />
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

                                                        <td >
                                                            <FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "6px" }} onClick={() => handleOnclickId(items.id)} />
                                                            <Popconfirm
                                                                title="Xóa sản phẩm này?"
                                                                onConfirm={() => handleDeleteProduct(items.id)}
                                                                okText="Yes"
                                                                cancelText="No"
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Popconfirm>
                                                            {/* <FontAwesomeIcon icon={faTrash} onClick={handleTrashIconClick(items.id)} /> */}
                                                        </td>

                                                    </tr>

                                                ))
                                            }
                                        </tbody>
                                    </table>

                                    <Pagination
                                        current={currentPage}
                                        pageSize={rowsPerPage}
                                        defaultPageSize={rowsPerPage}
                                        showSizeChanger={true}
                                        pageSizeOptions={["10", "20", "30", '100']}
                                        total={totalCount}
                                        locale={{ items_per_page: "/ trang" }}
                                        showTotal={(total, range) => <span>Tổng số: {total}</span>}
                                        onShowSizeChange={(current, pageSize) => {
                                            setCurrentPage(current);
                                            setRowsPerpage(pageSize);
                                        }}
                                        onChange={(pageNumber) => setCurrentPage(pageNumber)}
                                    />
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