import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Popconfirm, Pagination } from "antd";
import { ratingServices } from '../../../services/ratingService';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const ProductReviewPage = () => {
    const [dataRating, setDataRating] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
    const [search, setSearch] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    //lấy dữ liệu bình luận theo sản phẩm
    const getRating = async () => {
        try {
            const res = await ratingServices.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
                "Name": search
            });
            if (res) {
                setDataRating(res.items);
                setTotalCount(res.totalCount);
            }

        } catch (error) {
            console.error(error);
        }
    }
    //xóa n=bình luận trong từng sản phẩm
    const handleDeleteRating = async (id) => {
        try {
            const res = await ratingServices.deleteRating({
                "Id": id,
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
            });
            if (res) {
                getRating();
            }
        } catch (error) {
            console.error(error);
        }
    }
    //load dữ liệu ra
    useEffect(() => {
        getRating();
    }, [currentPage, rowsPerPage, search])
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3>Product Review
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
                                <li class="breadcrumb-item active">Product Review</li>
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
                                        <table class="review-table table all-package">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Customer Name</th>
                                                    <th>Product Name</th>
                                                    <th>Rating</th>
                                                    <th>Comment</th>
                                                    <th>Published</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dataRating.map((items, index) => (
                                                        <tr key={index}>

                                                            <td>01</td>
                                                            <td>{items.user.email}</td>
                                                            <td>{items.nameProduct}</td>
                                                            <td>
                                                                <div class="comment-rating ratings-container">
                                                                    {[1, 2, 3, 4, 5].map((value) => (
                                                                        <FontAwesomeIcon
                                                                            key={value}
                                                                            icon={faStar}
                                                                            className={`star ${value <= items.star ? 'yellow' : ''}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td>{items.content}</td>
                                                            <td class="td-check">
                                                                <Popconfirm
                                                                    title="Xóa sản phẩm này?"
                                                                    onConfirm={() => handleDeleteRating(items.id)}
                                                                    okText="Yes"
                                                                    cancelText="No"
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} />
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
            </div>
        </div>
    )
}

export default ProductReviewPage