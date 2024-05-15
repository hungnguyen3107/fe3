import React, { useState } from 'react'
import DemoPie from './chart/DemoPie'
import DemoLine from './chart/DemoLine'
import { FolderOutlined } from '@ant-design/icons'
import { DatePicker, Space } from 'antd';
import { NavLink } from 'react-router-dom';
const HomeReportPage = () => {
    const [year, setYear] = useState("");
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3>
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
                                <li class="breadcrumb-item active"></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid">

                <div class="row product-adding">
                    <div class="col-xl-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>Doanh thu cửa hàng</h5>
                                <DatePicker onChange={(date) => date && setYear(date.year())} picker="year" />
                            </div>
                            <div class="card-body">
                                <div class="digital-add needs-validation">
                                    <DemoLine year={year} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-xl-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>Thông tin giao hàng</h5>
                                <DatePicker onChange={(date) => date && setYear(date.year())} picker="year" />
                            </div>
                            <div class="card-body">
                                <div class="digital-add needs-validation">
                                    <DemoPie />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row product-adding">
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-header" style={{ borderBottom: "1px solid #E8EAEB" }}>
                                <h5>Trả hàng</h5>

                            </div>
                            <div class="card-body">
                                <div class="digital-add needs-validation">
                                    <ul>

                                        <li style={{ width: "100%", fontSize: "14px", fontWeight: 400, padding: "8px 0px", cursor: "pointer" }}

                                        >
                                            <NavLink to="/OrderReport">
                                                <div style={{ marginTop: "4px", marginBottom: "4px" }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ color: '#08c', marginRight: "10px", fontSize: '24px' }} enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="bill">
                                                        <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30" d="
			M330,390"></path><polygon fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30" points="435 15 390 46 344.99 15 299.99 46 254.99 15 209.99 46 165 15 120 46 75 15 75 495 120 466 165 495 209.99 466 254.99 495 299.99 466 344.99 495 390 466 435 495"></polygon><line x1="255" x2="375" y1="120" y2="120" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30"></line><line x1="255" x2="375" y1="180" y2="180" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30"></line><line x1="255" x2="375" y1="240" y2="240" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30"></line><line x1="135" x2="375" y1="300" y2="300" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30"></line><line x1="135" x2="375" y1="360" y2="360" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30"></line><line x1="135" x2="375" y1="420" y2="420" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30"></line><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30" d="
			M195,106h-31c-16.569,0-30,13.431-30,30l0,0c0,16.569,13.431,30,30,30l0,0c16.569,0,31,13.431,31,30l0,0c0,16.569-14.431,30-31,30
			h-30"></path><line x1="165" x2="165" y1="256" y2="226" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30"></line><line x1="165" x2="165" y1="106" y2="76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="30"></line></svg>Trả hàng theo đơn hàng
                                                </div>
                                            </NavLink>
                                        </li>

                                        <li style={{ width: "100%", fontSize: "14px", fontWeight: 400, padding: "8px 0px", cursor: "pointer" }}

                                        >
                                            <NavLink to="/ProductReport">
                                                <div style={{ marginTop: "4px", marginBottom: "4px" }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ color: '#08c', marginRight: "10px", fontSize: '24px' }} viewBox="0 0 24 24" id="bag"><g fill="none" fill-rule="evenodd" stroke="#200E32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" transform="translate(2.5 1.5)"><path d="M14.01373 20.0000001L5.66590392 20.0000001C2.59954235 20.0000001.247139589 18.8924486.915331812 14.4347827L1.69336385 8.39359272C2.10526317 6.16933642 3.52402748 5.31807783 4.76887874 5.31807783L14.9473685 5.31807783C16.2105264 5.31807783 17.5469108 6.23340964 18.0228834 8.39359272L18.8009154 14.4347827C19.3684211 18.3890161 17.0800916 20.0000001 14.01373 20.0000001zM14.1510298 5.09839819C14.1510298 2.71232585 12.216736.7779932 9.83066366.7779932L9.83066366.7779932C8.68166274.773163349 7.57805185 1.22619323 6.76386233 2.03694736 5.9496728 2.84770148 5.49199087 3.94938696 5.49199087 5.09839819L5.49199087 5.09839819"></path><line x1="12.796" x2="12.751" y1="9.602" y2="9.602"></line><line x1="6.966" x2="6.92" y1="9.602" y2="9.602"></line></g></svg>Trả hàng theo sản phẩm </div>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-header" style={{ borderBottom: "1px solid #E8EAEB" }}>
                                <h5>Thanh toán</h5>

                            </div>
                            <div class="card-body">
                                <div class="digital-add needs-validation">
                                    <ul>
                                        <li style={{ width: "100%", fontSize: "14px", fontWeight: 400, padding: "8px 0px", cursor: "pointer" }}

                                        >
                                            <div style={{ marginTop: "4px", marginBottom: "4px" }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ marginRight: "10px", color: "#08c" }} viewBox="0 0 52 52" id="user"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"><path d="m27.672 21.95.01-.01a12.833 12.833 0 0 1 9.422-4.1C44.227 17.84 50 23.613 50 30.736H28.993"></path><path d="M42.762 10.968c0 3.124-2.532 6.875-5.656 6.875-.848 0-1.649-.279-2.37-.743a6.27 6.27 0 0 1-1.602-1.487 15.77 15.77 0 0 1-.035-.035c-1.033-1.324-1.66-3.042-1.66-4.61A5.668 5.668 0 0 1 37.106 5.3c3.124 0 5.656 2.543 5.656 5.668zM38.435 46.7H2c0-10.062 8.155-18.217 18.217-18.217S38.435 36.638 38.435 46.7z"></path><path d="M28.228 18.774c0 2.215-.903 4.644-2.347 6.514l-.05.05c-.655.837-1.427 1.575-2.28 2.1-1.017.656-2.15 1.05-3.33 1.05-4.415 0-8.008-5.3-8.008-9.714s3.593-8.007 8.007-8.007 8.008 3.594 8.008 8.007z"></path></g><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"><path d="m27.672 21.95.01-.01a12.833 12.833 0 0 1 9.422-4.1C44.227 17.84 50 23.613 50 30.736H28.993"></path><path d="M42.762 10.968c0 3.124-2.532 6.875-5.656 6.875-.848 0-1.649-.279-2.37-.743a6.27 6.27 0 0 1-1.602-1.487 15.77 15.77 0 0 1-.035-.035c-1.033-1.324-1.66-3.042-1.66-4.61A5.668 5.668 0 0 1 37.106 5.3c3.124 0 5.656 2.543 5.656 5.668zM38.435 46.7H2c0-10.062 8.155-18.217 18.217-18.217S38.435 36.638 38.435 46.7z"></path><path d="M28.228 18.774c0 2.215-.903 4.644-2.347 6.514l-.05.05c-.655.837-1.427 1.575-2.28 2.1-1.017.656-2.15 1.05-3.33 1.05-4.415 0-8.008-5.3-8.008-9.714s3.593-8.007 8.007-8.007 8.008 3.594 8.008 8.007z"></path></g></svg>Báo cáo thanh toán theo nhân viên</div>
                                        </li>
                                        <li style={{ width: "100%", fontSize: "14px", fontWeight: 400, padding: "8px 0px", cursor: "pointer" }}

                                        >
                                            <div style={{ marginTop: "4px", marginBottom: "4px" }}><FolderOutlined style={{ fontSize: '24px', color: '#08c', marginRight: "10px" }} /> Báo cáo theo phương thức thanh toán</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-header" style={{ borderBottom: "1px solid #E8EAEB" }}>
                                <h5>Đơn hàng</h5>

                            </div>
                            <div class="card-body">
                                <div class="digital-add needs-validation">
                                    <ul>
                                        <li style={{ width: "100%", fontSize: "14px", fontWeight: 400, padding: "8px 0px", cursor: "pointer" }}

                                        >
                                            <NavLink to="/OrderReport">
                                                <div style={{ marginTop: "4px", marginBottom: "4px" }}><FolderOutlined style={{ fontSize: '24px', color: '#08c', marginRight: "10px" }} />Báo cáo thống kê theo đơn hàng</div>
                                            </NavLink>
                                        </li>
                                        <li style={{ width: "100%", fontSize: "14px", fontWeight: 400, padding: "8px 0px", cursor: "pointer" }}

                                        >
                                            <NavLink to="/ProductReport">
                                                <div style={{ marginTop: "4px", marginBottom: "4px" }}><FolderOutlined style={{ fontSize: '24px', color: '#08c', marginRight: "10px" }} /> Báo cáo thống kê theo sản phẩm</div>
                                            </NavLink>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeReportPage