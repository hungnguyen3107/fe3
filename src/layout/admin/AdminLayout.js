import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../../css/admin/style.css"
import "../../css/admin/bootstrap.css"
import "../../css/admin/css2.css"
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { NavLink } from "react-router-dom";
import { Popover } from 'antd'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import logo from '../../images/logo-footer.png'
const content = (
    <ul style={{ width: "120px" }}>
        <li style={{ width: "100%" }} ><NavLink to="Profile"><FontAwesomeIcon icon={faUser} /> Profile</NavLink></li>
        <li style={{ width: "100%" }}><a href="javascript:void(0)"><i data-feather="mail"></i>Inbox</a></li>
        <li style={{ width: "100%" }}><a href="javascript:void(0)"><i data-feather="lock"></i>Lock Screen</a></li>
        <li style={{ width: "100%" }}><a href="javascript:void(0)"><i data-feather="settings"></i>Settings</a></li>
        <li style={{ width: "100%" }}><a href="javascript:void(0)"><i data-feather="log-out"></i>Logout</a></li>
    </ul>
);
const AdminLayout = () => {
    const [isOpentSidebar, setIsOpentSidebar] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const role = JSON.parse(sessionStorage.getItem("roles"));
    const rolesString = sessionStorage.getItem("roles");
    const isEmployee = rolesString && rolesString.includes("Employee");
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
                                    <Popover placement="bottom" content={content}>
                                        <img
                                            class="align-self-center pull-right img-50 blur-up lazyloaded"
                                            src={`https://localhost:7285/Images/${user.avatar}`} alt="header-user" style={{ width: "50px" }} />
                                    </Popover>

                                    <div class="dotted-animation"><span class="animate-circle"></span><span
                                        class="main-circle"></span></div>
                                </div>

                                {/* <ul class="profile-dropdown onhover-show-div p-20">
                                    <li><a href="javascript:void(0)"><i data-feather="user"></i>Edit Profile</a></li>
                                    <li><a href="javascript:void(0)"><i data-feather="mail"></i>Inbox</a></li>
                                    <li><a href="javascript:void(0)"><i data-feather="lock"></i>Lock Screen</a></li>
                                    <li><a href="javascript:void(0)"><i data-feather="settings"></i>Settings</a></li>
                                    <li><a href="javascript:void(0)"><i data-feather="log-out"></i>Logout</a></li>
                                </ul> */}
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
                            <img class="img-60" src={`https://localhost:7285/Images/${user.avatar}`} alt="#" />
                            <div>
                                <h6 class="f-14">{user.lastName}</h6>
                                <p>{role}</p>
                            </div>
                        </div>

                        <ul class="sidebar-menu">
                            <li>
                                <a class="sidebar-header" href="index.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    <span>Trang chủ</span>
                                </a>
                            </li>

                            <li>
                                <NavLink to="/" className="sidebar-header" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                    <span>Sản phẩm</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Category" className="sidebar-header" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#fff" d="M16.97,10.79C18.64,10.80,19.99,12.17,20,13.88L20,13.88L20,16.90C19.99,18.61,18.64,19.99,16.97,20L16.97,20L14.00,20C12.33,20.00,10.98,18.61,10.98,16.90L10.98,16.90L10.98,13.88C10.98,12.17,12.33,10.79,14.00,10.79L14.00,10.79ZM4.25,10.79C4.56,10.76,4.86,10.91,5.03,11.18C5.20,11.45,5.20,11.79,5.03,12.06C4.86,12.33,4.56,12.48,4.25,12.45L4.25,12.45L3.03,12.45C2.26,12.45,1.63,13.09,1.62,13.88L1.62,13.88L1.62,16.86C1.64,17.65,2.27,18.28,3.03,18.29L3.03,18.29L6.01,18.29C6.39,18.30,6.75,18.15,7.01,17.88C7.28,17.61,7.42,17.25,7.42,16.86L7.42,16.86L7.42,12.38L7.41,12.27C7.40,11.97,7.54,11.69,7.79,11.53C8.07,11.35,8.43,11.36,8.70,11.55C8.98,11.75,9.10,12.10,9.02,12.43L9.02,12.43L9.02,16.89C9.02,18.60,7.66,20.00,5.99,20.00L5.99,20.00L3.03,20.00C1.37,19.96,0.03,18.59,0.00,16.89L0.00,16.89L0.00,13.88C0.00,13.06,0.32,12.27,0.89,11.69C1.46,11.11,2.23,10.79,3.03,10.79L3.03,10.79ZM16.97,12.45L14.00,12.45C13.23,12.45,12.60,13.09,12.60,13.88L12.60,13.88L12.60,16.90C12.60,17.28,12.75,17.65,13.01,17.92C13.27,18.19,13.63,18.34,14.00,18.33L14.00,18.33L16.97,18.33C17.34,18.34,17.70,18.19,17.96,17.92C18.22,17.65,18.37,17.28,18.37,16.90L18.37,16.90L18.37,13.88C18.37,13.50,18.22,13.14,17.96,12.87C17.69,12.60,17.34,12.45,16.97,12.45L16.97,12.45ZM16.97,0.00C18.62,0.04,19.96,1.41,20.00,3.10L20.00,3.10L20.00,6.11C20.00,6.93,19.69,7.72,19.13,8.31C18.57,8.89,17.80,9.23,17.00,9.24L17.00,9.24L15.78,9.24C15.36,9.19,15.05,8.83,15.05,8.41C15.05,7.98,15.36,7.62,15.78,7.58L15.78,7.58L16.97,7.58C17.34,7.58,17.70,7.42,17.96,7.15C18.23,6.87,18.37,6.50,18.37,6.12L18.37,6.12L18.37,3.10C18.36,2.31,17.73,1.67,16.97,1.67L16.97,1.67L14.00,1.67C13.23,1.67,12.60,2.31,12.60,3.10L12.60,3.10L12.60,7.62L12.59,7.72C12.53,8.13,12.18,8.44,11.77,8.43C11.55,8.43,11.35,8.33,11.20,8.17C11.05,8.01,10.97,7.80,10.98,7.58L10.98,7.58L10.98,3.10C10.98,2.28,11.29,1.49,11.86,0.91C12.43,0.33,13.20,0.00,14.00,0.00L14.00,0.00ZM5.99,0.00C7.67,0.01,9.03,1.39,9.03,3.10L9.03,3.10L9.03,6.12C9.03,6.94,8.71,7.73,8.14,8.31C7.57,8.89,6.80,9.21,5.99,9.21L5.99,9.21L3.03,9.21C1.36,9.20,0.01,7.83,0.00,6.12L0.00,6.12L0.00,3.10C0.01,1.39,1.36,0.01,3.03,0.00L3.03,0.00ZM5.99,1.67L3.03,1.67C2.66,1.66,2.29,1.81,2.03,2.08C1.76,2.35,1.61,2.71,1.61,3.10L1.61,3.10L1.61,6.12C1.60,6.51,1.75,6.89,2.02,7.16C2.29,7.44,2.65,7.59,3.03,7.58L3.03,7.58L5.99,7.58C6.37,7.58,6.73,7.42,6.99,7.15C7.26,6.87,7.40,6.50,7.40,6.12L7.40,6.12L7.40,3.10C7.39,2.31,6.77,1.67,5.99,1.67L5.99,1.67Z" />
                                    </svg>
                                    <span>Danh mục sản phẩm</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Supplier" className="sidebar-header" >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="distribution"><path fill="#fff" fill-rule="evenodd" d="m4.14,34.49c-.09.15-.14.33-.14.51v8c0,.55.45,1,1,1h12c.55,0,1-.45,1-1v-8c0-.19-.05-.36-.14-.51l-1.71-2.98c-.18-.31-.51-.5-.87-.5H6.71c-.36,0-.69.19-.87.5l-1.71,2.98h0Zm26,0c-.09.15-.14.33-.14.51v8c0,.55.45,1,1,1h12c.55,0,1-.45,1-1v-8c0-.19-.05-.36-.14-.51l-1.71-2.98c-.18-.31-.51-.5-.87-.5h-8.57c-.36,0-.69.19-.87.5l-1.71,2.98h0Zm-14.14,1.51v6H6v-6h10Zm26,0v6h-10v-6h10Zm-30,5h2c.55,0,1-.45,1-1s-.45-1-1-1h-2c-.55,0-1,.45-1,1s.45,1,1,1h0Zm26,0h2c.55,0,1-.45,1-1s-.45-1-1-1h-2c-.55,0-1,.45-1,1s.45,1,1,1h0Zm-4.71-8l-.57,1h3.28v-1h-2.71Zm4.71,0v1h3.28l-.57-1h-2.71Zm-30.71,0l-.57,1h3.28v-1h-2.71Zm4.71,0v1h3.28l-.57-1h-2.71Zm7.94-4.35c-.14-.38-.51-.65-.94-.65-.55,0-1,.45-1,1v2c0,.55.45,1,1,1h2c.55,0,1-.45,1-1,0-.43-.27-.79-.65-.94l1.36-1.36c.39-.39.39-1.02,0-1.42-.39-.39-1.02-.39-1.42,0l-1.36,1.36h0Zm6.71,1.41c-.38.14-.65.51-.65.94,0,.55.45,1,1,1h2c.55,0,1-.45,1-1v-2c0-.55-.45-1-1-1-.43,0-.79.27-.94.65l-1.36-1.36c-.39-.39-1.02-.39-1.42,0-.39.39-.39,1.02,0,1.42l1.36,1.36h0ZM12.11,10.53c-.07.14-.11.3-.11.47v14c0,.55.45,1,1,1h22c.55,0,1-.45,1-1v-14c0-.17-.04-.33-.11-.47l-2.99-5.98c-.17-.34-.52-.55-.89-.55H16c-.38,0-.73.21-.89.55l-2.99,5.98h0Zm1.89,1.47h20v12H14v-12h0Zm2,11h3c.55,0,1-.45,1-1s-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h0Zm17-4c0-.55-.45-1-1-1h-5c-.55,0-1,.45-1,1v3c0,.55.45,1,1,1h5c.55,0,1-.45,1-1v-3h0Zm-2,1v1h-3v-1h3Zm-15,0h2c.55,0,1-.45,1-1s-.45-1-1-1h-2c-.55,0-1,.45-1,1s.45,1,1,1h0Zm9-14v4h8.38l-2-4h-6.38Zm-10.38,4h8.38v-4h-6.38l-2,4h0Z"></path></svg>
                                    <span>nhà cung cấp </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/ProductReview" className="sidebar-header" >
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></svg> */}
                                    <FontAwesomeIcon icon={faStar} />
                                    <span>Đánh giá</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/OrderList" className="sidebar-header" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
                                    <span>Hóa đơn</span>
                                </NavLink>
                            </li>
                            {
                                isEmployee ? '' : (<li>
                                    <NavLink to="/UserList" className="sidebar-header" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                                        <span>Tài khoản</span>
                                    </NavLink>
                                </li>)
                            }
                            <li>
                                <NavLink to="/HomeReport" className="sidebar-header" href="reports.html">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
                                    <span>Báo cáo</span>
                                </NavLink>
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