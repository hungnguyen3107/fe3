import React, { useState, useEffect } from 'react'
import { supplierServices } from '../../../services/supplierService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Pagination, Popconfirm, message, Modal, Table } from 'antd';
import SupplierModal from './modal/SupplierModal';
const SupplierPage = () => {
    const [supplier, setSupplier] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
    const [totalCount, setTotalCount] = useState(0);
    const [isStatusModal, setIsStatusModal] = useState("Add");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [curData, setCurData] = useState([]);
    //hàm mở,đóng modal
    const showModalAdd = () => {
        setIsModalOpen(true);
        setIsStatusModal("Add");
        setCurData('');
    };
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
    //xóa nhà cung cấp
    const handleDeletesupplier = async (id) => {
        const res = await supplierServices.deleteSupplier({ "id": id })
        if (res) {
            await getSupplier();
            message.success("xóa nhà cung cấp thành công!")
        } else {
            message.error(res.error)
        }
    }
    //lấy dữ liệu chi tiết
    const hanldEditSupplier = (data) => {
        setCurData(data)
        setIsModalOpen(true);
        setIsStatusModal("Edit");
    }
    useEffect(() => {
        getSupplier();
    }, [currentPage, rowsPerPage, search])
    const columns = [

        {
            title: 'Tên nhà cung cấp ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa chỉ ',
            dataIndex: 'adress',
            key: 'adress',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email ',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Thao tác',
            dataIndex: '',
            key: 'x',
            render: (record) => <>
                <FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "6px" }} onClick={() => hanldEditSupplier(record)} />
                <Popconfirm
                    title="Xóa hạng mục này?"
                    onConfirm={() => handleDeletesupplier(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Popconfirm></>
        },
    ];
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3>Danh sách nhà cung cấp
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
                                <li class="breadcrumb-item">Trang chủ</li>
                                <li class="breadcrumb-item active">Danh sách nhà cung cấp</li>
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
                                    <Table
                                        columns={columns}
                                        dataSource={supplier}
                                        pagination={{
                                            current: currentPage,
                                            pageSize: rowsPerPage,
                                            defaultPageSize: rowsPerPage,
                                            showSizeChanger: true,
                                            pageSizeOptions: ["10", "20", "30", "100"],
                                            total: totalCount,
                                            locale: { items_per_page: "/ trang" },
                                            showTotal: (total, range) => <span>Tổng số: {total}</span>,
                                            onShowSizeChange: (current, pageSize) => {
                                                setCurrentPage(current);
                                                setRowsPerpage(pageSize);
                                            },
                                            onChange: (pageNumber) => setCurrentPage(pageNumber),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title={isStatusModal === "Add" ? "Thêm mới nhà cung cấp" : "Chỉnh sửa nhà cung cấp"} open={isModalOpen} footer={null} onCancel={handleCancel}>
                <SupplierModal isStatusModal={isStatusModal} curData={curData} getSupplier={getSupplier} />
            </Modal>
        </div>

    )
}

export default SupplierPage