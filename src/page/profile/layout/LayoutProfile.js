import React from 'react'
import { Navigate, Outlet, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
const LayoutProfile = () => {
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.removeItem("roles");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    }
    return (
        <main class="main account">
            <nav class="breadcrumb-nav">
                <div class="container">
                    <ul class="breadcrumb">
                        <li><NavLink to="/"><FontAwesomeIcon icon={faHome} /></NavLink></li>
                        <li>Account</li>
                    </ul>
                </div>
            </nav>
            <div class="page-content mt-4 mb-10 pb-6">
                <div class="container">
                    <h2 class="title title-center mb-10">Tài khoản</h2>
                    <div class="tab tab-vertical gutter-lg">
                        <ul class="nav nav-tabs mb-4 col-lg-3 col-md-4" role="tablist" style={{ width: "27.8%" }}>
                            <li class="nav-item">
                                <NavLink to="/dashboard" className="nav-link " style={{ cursor: "pointer" }} >Trang chủ</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/dashboard/historyOrder" className="nav-link" style={{ cursor: "pointer" }} >Lịch sử mua hàng</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/dashboard/profile" className="nav-link" style={{ cursor: "pointer" }} >Chi tiết tài khoản</NavLink>
                            </li>
                            <li class="nav-item" onClick={logout}>
                                <a class="nav-link" >Đăng xuất</a>
                            </li>
                        </ul>
                        <div className="tab-content col-lg-9 col-md-8">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LayoutProfile