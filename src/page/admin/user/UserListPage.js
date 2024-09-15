import React, { useEffect, useState } from 'react'
import { Popconfirm, message } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { userServices } from '../../../services/userService';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UserListPage = () => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate()
    //lấy dữ liệu người dùng
    const getUser = async () => {
        try {
            const res = await userServices.get();
            setUser(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    //chuyển đến trang chi tiết
    const handleOnclickUserId = async (id) => {
        try {
            navigate(`EdirUser/${id}`)
        } catch (error) {
            console.error(error);
        }
    }
    //xóa người dùng dùng
    const DeleteUser = async (id) => {
        try {
            const res = await userServices.deleteUser({ Id: id });
            if (res) {
                getUser();
            } else {
                message.error('xóa thất bại')
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3>User List
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
                                <li class="breadcrumb-item">Users</li>
                                <li class="breadcrumb-item active">User List</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="card">
                    <div class="card-header">
                        <form class="form-inline search-form search-box">
                            <div class="form-group">
                                <input class="form-control-plaintext" type="search" placeholder="Search.." /><span
                                    class="d-sm-none mobile-search"><i data-feather="search"></i></span>
                            </div>
                        </form>

                        <NavLink to="/User" class="btn btn-primary mt-md-0 mt-2" style={{
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
                        }}>Thêm mới</NavLink>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive table-desi">
                            <table class="all-package coupon-table table table-striped">
                                <thead>
                                    <tr>
                                        <th>Ảnh</th>
                                        <th>Họ</th>
                                        <th>Tên</th>
                                        <th>Email</th>
                                        <th>SĐT</th>
                                        <th>Quyền</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        user.map((items, index) => (
                                            <tr key={index} style={{
                                                fontWeight: "400",
                                                fontSize: "14px"
                                            }}>

                                                <td>
                                                    <img src={`https://localhost:7285/Images/${items.avatar}`} alt="" />
                                                </td>

                                                <td>{items.firstName}</td>

                                                <td>{items.lastName}</td>

                                                <td>{items.email}</td>

                                                <td>{items.phoneNumber}</td>

                                                <td>{items.roles}</td>
                                                <td>
                                                    <a href="javascript:void(0)">
                                                        <FontAwesomeIcon icon={faPenToSquare} style={{ paddingRight: "6px" }} onClick={() => handleOnclickUserId(items.id)} />
                                                    </a>
                                                    <a >
                                                        <Popconfirm onConfirm={() => DeleteUser(items.id)} title="Xóa sản phẩm này?" cancelText='Hủy' okText='Đồng ý'>
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
    )
}

export default UserListPage