import React from 'react'

const ProductReportPage = () => {
    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3> Báo cáo thống kê đơn hàng
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
                                <li class="breadcrumb-item active">Thống kê đơn hàng</li>
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
                                        <table class="review-table table all-package" >
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>số lượng bán</th>
                                                    <th>doanh thu</th>
                                                    <th>Loại sản phẩm</th>
                                                    <th>Nhà cung cấp</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>

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

export default ProductReportPage