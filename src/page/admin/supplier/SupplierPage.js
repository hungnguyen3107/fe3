import React, { useState, useEffect } from 'react'
import { supplierServices } from '../../../services/supplierService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Pagination, Popconfirm, message, Modal } from 'antd';
import SupplierModal from './modal/SupplierModal';
const SupplierPage = () => {
    const [supplier, setSupplier] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
    const [totalCount, setTotalCount] = useState(0);
    const [isStatusModal, setIsStatusModal] = useState("Add");
    const [isModalOpen, setIsModalOpen] = useState(false);
    //hàm mở,đóng modal
    const showModalAdd = () => {
        setIsModalOpen(true);
        setIsStatusModal("Add");
    };
    const showModalEdit = () => {
        setIsModalOpen(true);
        setIsStatusModal("Edit");
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //lấy dữ liệu nhà cung cấp
    const getSupplier = async () => {
        try {
            const res = await supplierServices.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
                "Name": search
            });
            if (res) {
                setSupplier(res.items);
                setTotalCount(res.totalCount);
            }

        } catch (error) {
            console.error(error);
        }
    }
    //thêm mới nhà cung cấp
    const onFinish = async (values) => {
        if (isStatusModal == "Add") {
            try {
                const res = supplierServices.create(values)
                if (res) {
                    getSupplier();
                    message.success("Thêm mới thành thông");
                }
            } catch (error) {
                console.error(error);
                message.error("Thêm mới thất bại");
            }
        } else {
            try {
                const res = supplierServices.create(values)
                if (res) {
                    getSupplier();
                    message.success("Chỉnh sửa thành thông");
                }
            } catch (error) {
                console.error(error);
                message.error("Chỉnh sửa thất bại");
            }
        }
    }
    useEffect(() => {
        getSupplier();
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
                                    }} onClick={showModalAdd}>Thêm mới</button>
                            </div>

                            <div class="card-body">
                                <div class="table-responsive table-desi">
                                    <table class="table list-digital all-package table-category "
                                        id="editableTable">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên Nhà cung cấp</th>
                                                <th>Địa chỉ</th>
                                                <th>Số điện thoại</th>
                                                <th>Email</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                supplier.map((items, index) => (
                                                    <tr key={index} style={{
                                                        fontWeight: "400",
                                                        fontSize: "14px"
                                                    }}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {items.name}
                                                        </td>

                                                        <td data-field="name">{items.adress}</td>

                                                        <td data-field="price">{items.phone}</td>

                                                        <td data-field="name">{items.email}</td>

                                                        <td >
                                                            <FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "6px" }} onClick={showModalEdit} />
                                                            <Popconfirm
                                                                title="Xóa sản phẩm này?"
                                                                // onConfirm={() => handleDeleteProduct(items.id)}
                                                                okText="Yes"
                                                                cancelText="No"
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </Popconfirm>

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
            <Modal title={isStatusModal === "Add" ? "Thêm mới nhà cung cấp" : "Chỉnh sửa nhà cung cấp"} open={isModalOpen} footer={null} onCancel={handleCancel}>
                <SupplierModal onFinish={onFinish} />
            </Modal>
        </div>

    )
}

export default SupplierPage