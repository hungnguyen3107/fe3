import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Pagination, Popconfirm, message, Modal, Table, Button } from 'antd';
import { categoryServices } from '../../../../services/categoryService';
import CategoryModal from '../modal/CategoryModal';
const CategoryTable = ({ CategoryParent_id }) => {
    const [category, setCategory] = useState();
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
    //lấy dữ liệu loại sản phẩm 
    const getCategory = async () => {
        try {
            const res = await categoryServices.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
                "CategoryParent_id": CategoryParent_id
            });
            if (res) {
                setCategory(res.items);
                setTotalCount(res.totalCount);
            }

        } catch (error) {
            console.error(error);
        }
    }
    //xóa loại sản phẩm
    const handleDeleteCategory = async (id) => {
        const res = await categoryServices.deleteCategory({ "id": id })
        if (res) {
            await getCategory();
            message.success("xóa loại sản phẩm thành công!")
        } else {
            message.error(res.error)
        }
    }
    const hanldEditCategory = (data) => {
        setCurData(data)
        setIsModalOpen(true);
        setIsStatusModal("Edit");
    }
    useEffect(() => {
        getCategory();
    }, [currentPage, rowsPerPage])
    const columns = [
        {
            title: 'Tên loại sản phẩm ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Thao tác',
            dataIndex: '',
            key: 'x',
            render: (record) => <>
                <FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "6px" }} onClick={() => hanldEditCategory(record)} />
                <Popconfirm
                    title="Xóa sản phẩm này?"
                    onConfirm={() => handleDeleteCategory(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Popconfirm></>,
        },
    ];
    return (
        <div>
            <div style={{ textAlign: "end" }}>
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
                    }} onClick={showModalAdd} >Thêm loại sản phẩm</button>
            </div>

            <Table
                columns={columns}
                dataSource={category}
                pagination={{ pageSize: 8 }}
            />
            <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
                <CategoryModal isStatusModal={isStatusModal} CategoryParent_id={CategoryParent_id} getCategory={getCategory} curData={curData} />
            </Modal>
        </div>

    )
}

export default CategoryTable