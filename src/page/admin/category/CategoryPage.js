import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Pagination, Popconfirm, message, Modal, Table, Select } from 'antd';
import { productCategoryParentServices } from '../../../services/productCategoryParentService';
import { categoryServices } from '../../../services/categoryService';
import CategoryParentModal from './modal/CategoryParentModal';
import CategoryTable from './table/CategoryTable';
const { Option } = Select;
const CategoryPage = () => {
    const [search, setSearch] = useState("");
    const [categoryParent, setCategoryParent] = useState([]);
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
    //lấy dữ liệu của danh mục sản phẩm
    const getCategoryParent = async () => {
        try {
            const res = await productCategoryParentServices.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
                "Name": search
            });
            if (res) {
                setCategoryParent(res.items);
                setTotalCount(res.totalCount);
            }

        } catch (error) {
            console.error(error);
        }
    }

    //xóa hạng mục sản phẩm
    const handleDeleteCategoryParent = async (id) => {
        const res = await productCategoryParentServices.deleteCategoryParent({ "id": id })
        if (res) {
            await getCategoryParent();
            message.success("xóa hạng mục sản phẩm thành công!")
        } else {
            message.error(res.error)
        }
    }
    //lấy dữ liệu chi tiết
    const hanldEditCategoryParent = (data) => {
        setCurData(data)
        setIsModalOpen(true);
        setIsStatusModal("Edit");
    }
    useEffect(() => {
        getCategoryParent();
    }, [currentPage, rowsPerPage, search])
    const columns = [
        {
            title: 'Tên danh mục sản phẩm ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Thao tác',
            dataIndex: '',
            key: 'x',
            render: (record) => <>
                <FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "6px" }} onClick={() => hanldEditCategoryParent(record)} />
                <Popconfirm
                    title="Xóa hạng mục này?"
                    onConfirm={() => handleDeleteCategoryParent(record.id)}
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
                                <h3>Danh mục sản phẩm
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
                                <li class="breadcrumb-item active">Danh mục sản phẩm</li>
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
                                        expandable={{
                                            expandedRowRender: (record) => {
                                                return <CategoryTable CategoryParent_id={record.id} />
                                            },

                                        }}
                                        dataSource={categoryParent.map((item) => {
                                            return {
                                                ...item,
                                                key: item.id
                                            }
                                        })}
                                        pagination={{ pageSize: 8 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
                <CategoryParentModal categoryParent={categoryParent} curData={curData} isStatusModal={isStatusModal} getCategoryParent={getCategoryParent} />
            </Modal>
        </div>
    )
}

export default CategoryPage