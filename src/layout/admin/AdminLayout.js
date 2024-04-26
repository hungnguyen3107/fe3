import React, { useState } from 'react'
import "../../css/admin/style.css"
import "../../css/admin/bootstrap.css"
import "../../css/admin/css2.css"
// import "../../css/admin/fontawesome.css"
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import logo from '../../images/logo-footer.png'
const AdminLayout = () => {
    const [isOpentSidebar, setIsOpentSidebar] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const role = JSON.parse(sessionStorage.getItem("roles"));
    const navigate = useNavigate();
    const handleClickSidebar = () => {
        setIsOpentSidebar(!isOpentSidebar);
        console.log(isOpentSidebar);
    }
    const logout = () => {
        sessionStorage.removeItem("roles");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    }
    return (
        <div class="page-wrapper">
            <div class="page-main-header">
                <div class="main-header-right row">
                    <div class="main-header-left d-lg-none w-auto">
                        <div class="logo-wrapper">
                            <a href="index.html">
                                <img class="blur-up lazyloaded d-block d-lg-none"
                                    src="assets/images/dashboard/multikart-logo-black.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <div class="mobile-sidebar w-auto" >
                        <div class="media-body text-end switch-sm">
                            <label class="switch" onClick={handleClickSidebar}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-left" id="sidebar-toggle">
                                    <line x1="17" y1="10" x2="3" y2="10"></line>
                                    <line x1="21" y1="6" x2="3" y2="6"></line>
                                    <line x1="21" y1="14" x2="3" y2="14"></line>
                                    <line x1="17" y1="18" x2="3" y2="18"></line>
                                </svg>
                            </label>
                        </div>
                    </div>
                    <div class="nav-right col">
                        <ul class="nav-menus">
                            <li><a href="javascript:void(0)"><i class="right_side_toggle"
                                data-feather="message-square"></i><span class="dot"></span></a></li>
                            <li class="onhover-dropdown">

                                <div class="media align-items-center" >
                                    <img
                                        class="align-self-center pull-right img-50 blur-up lazyloaded"
                                        src={user.avatar} alt="header-user" />
                                    <div class="dotted-animation"><span class="animate-circle"></span><span
                                        class="main-circle"></span></div>
                                </div>

                                <ul class="profile-dropdown onhover-show-div p-20">
                                    <li><a href="javascript:void(0)"><i data-feather="user"></i>Edit Profile</a></li>
                                    <li><a href="javascript:void(0)"><i data-feather="mail"></i>Inbox</a></li>
                                    <li><a href="javascript:void(0)"><i data-feather="lock"></i>Lock Screen</a></li>
                                    <li><a href="javascript:void(0)"><i data-feather="settings"></i>Settings</a></li>
                                    <li><a href="javascript:void(0)"><i data-feather="log-out"></i>Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div class="d-lg-none mobile-toggle pull-right"><i data-feather="more-horizontal"></i></div>
                    </div>
                </div>
            </div>

            <div class="page-body-wrapper">

                <div class={`page-sidebar ${isOpentSidebar ? 'open' : ''}`}>
                    <div class="main-header-left d-none d-lg-block">
                        <div class="logo-wrapper"><a href="index.html"><img class="blur-up lazyloaded"
                            src={logo} alt="" /></a></div>
                    </div>
                    <div class="sidebar custom-scrollbar">
                        <a href="javascript:void(0)" class="sidebar-back d-lg-none d-block"><i class="fa fa-times"
                            aria-hidden="true"></i></a>

                        <div class="sidebar-user" >
                            <img class="img-60" src={user.avatar} alt="#" />
                            <div>
                                <h6 class="f-14">{user.lastName}</h6>
                                <p>{role}</p>
                            </div>
                        </div>

                        <ul class="sidebar-menu">
                            <li>
                                <a class="sidebar-header" href="index.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    <span>Dashboard</span>
                                </a>
                            </li>

                            <li>
                                <a class="sidebar-header" href="javascript:void(0)">
                                    <NavLink to="/" style={{ color: "#fff" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        <span>Products</span>
                                    </NavLink>
                                </a>
                            </li>

                            <li>
                                <a class="sidebar-header" href="javascript:void(0)">
                                    <NavLink to="/OrderList" style={{ color: "#fff" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
                                        <span>Orders</span>
                                    </NavLink>
                                </a>
                            </li>

                            <li>
                                <a class="sidebar-header" href="javascript:void(0)">
                                    <NavLink to="/UserList" style={{ color: "#fff" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                                        <span>Users</span>
                                    </NavLink>
                                </a>
                            </li>

                            <li>
                                <a class="sidebar-header" href="reports.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
                                    <span>Reports</span>
                                </a>
                            </li>
                            <li>
                                <a class="sidebar-header" onClick={logout} style={{ cursor: "pointer" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                                    <span>Login</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="right-sidebar" id="right_side_bar">
                    <div>
                        <div class="container p-0">
                            <div class="modal-header p-l-20 p-r-20">
                                <div class="col-sm-8 p-0">
                                    <h6 class="modal-title font-weight-bold">FRIEND LIST</h6>
                                </div>
                                <div class="col-sm-4 text-end p-0">
                                    <i class="me-2" data-feather="settings"></i>
                                </div>
                            </div>
                        </div>
                        <div class="friend-list-search mt-0">
                            <input type="text" placeholder="search friend" />
                            <i class="fa fa-search"></i>
                        </div>
                        <div class="p-l-30 p-r-30 friend-list-name">
                            <div class="chat-box">
                                <div class="people-list friend-list">
                                    <ul class="list">
                                        <li class="clearfix">
                                            <img class="rounded-circle user-image blur-up lazyloaded"
                                                src="assets/images/dashboard/user.jpg" alt="" />
                                            <div class="status-circle online"></div>
                                            <div class="about">
                                                <div class="name">Vincent Porter</div>
                                                <div class="status">Online</div>
                                            </div>
                                        </li>
                                        <li class="clearfix">
                                            <img class="rounded-circle user-image blur-up lazyloaded"
                                                src="assets/images/dashboard/user1.jpg" alt="" />
                                            <div class="status-circle away"></div>
                                            <div class="about">
                                                <div class="name">Ain Chavez</div>
                                                <div class="status">28 minutes ago</div>
                                            </div>
                                        </li>
                                        <li class="clearfix">
                                            <img class="rounded-circle user-image blur-up lazyloaded"
                                                src="assets/images/dashboard/user2.jpg" alt="" />
                                            <div class="status-circle online"></div>
                                            <div class="about">
                                                <div class="name">Kori Thomas</div>
                                                <div class="status">Online</div>
                                            </div>
                                        </li>
                                        <li class="clearfix">
                                            <img class="rounded-circle user-image blur-up lazyloaded"
                                                src="assets/images/dashboard/user3.jpg" alt="" />
                                            <div class="status-circle online"></div>
                                            <div class="about">
                                                <div class="name">Erica Hughes</div>
                                                <div class="status">Online</div>
                                            </div>
                                        </li>
                                        <li class="clearfix">
                                            <img class="rounded-circle user-image blur-up lazyloaded"
                                                src="assets/images/dashboard/user3.jpg" alt="" />
                                            <div class="status-circle offline"></div>
                                            <div class="about">
                                                <div class="name">Ginger Johnston</div>
                                                <div class="status">2 minutes ago</div>
                                            </div>
                                        </li>
                                        <li class="clearfix">
                                            <img class="rounded-circle user-image blur-up lazyloaded"
                                                src="assets/images/dashboard/user5.jpg" alt="" />
                                            <div class="status-circle away"></div>
                                            <div class="about">
                                                <div class="name">Prasanth Anand</div>
                                                <div class="status">2 hour ago</div>
                                            </div>
                                        </li>
                                        <li class="clearfix">
                                            <img class="rounded-circle user-image blur-up lazyloaded"
                                                src="assets/images/dashboard/designer.jpg" alt="" />
                                            <div class="status-circle online"></div>
                                            <div class="about">
                                                <div class="name">Hileri Jecno</div>
                                                <div class="status">Online</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet />
                <footer class="footer">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6 footer-copyright text-start">
                                <p class="mb-0">Copyright 2019 © Multikart All rights reserved.</p>
                            </div>
                            <div class="col-md-6 pull-right text-end">
                                <p class=" mb-0">Hand crafted & made with<i class="fa fa-heart"></i></p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default AdminLayout