import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import shopBanner from "../../images/demos/demo3/shop_banner.jpg"
import { useProductContext } from '../../services/helpers/getDataHelpers'
import FilterComponent from './component/FilterComponent';
import { productServices } from '../../services/productService';
import { useParams } from 'react-router-dom';
import { Pagination } from 'antd';
import { categoryServices } from '../../services/categoryService';
import { useCartContext } from '../../services/helpers/getDataCartHelper';
import "../../css/checkbox.css"
const ShopePage = () => {
    const { supplier, handleClickDetail } = useProductContext();
    const { handleAddToCart } = useCartContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(9);
    const [totalCount, setTotalCount] = useState(0);
    const [categoryParentId, setCategoryParentId] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [selectedCheckboxCategory, setSelectedCheckboxCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const { id } = useParams();
    const [inputFrom, setInputFrom] = useState(20000);
    const [inputTo, setInputTo] = useState(100000000);

    const handleInputFromChange = (value) => {
        setInputFrom(value);
    };

    const handleInputToChange = (value) => {
        setInputTo(value);
    };
    console.log(selectedCheckboxes)
    //lọc theo nhà cung cấp 
    const handleCheckboxChange = (event) => {
        const checkboxId = event.target.value;
        const isChecked = event.target.checked;
        setSelectedCheckboxes(prevState => {
            if (isChecked) {
                return [...prevState, checkboxId];
            } else {
                return prevState.filter(id => id !== checkboxId);
            }
        });
    };
    //lọc theo loại sản phẩm
    const handleCheckboxChangeCategory = (event) => {
        const checkboxId = event.target.value;
        const isChecked = event.target.checked;

        setSelectedCheckboxCategory(prevState => {
            if (isChecked) {
                return [...prevState, checkboxId];
            } else {
                return prevState.filter(id => id !== checkboxId);
            }
        });
    };
    //lấy dữ liệu theo yêu cầu 
    const getCategoryParnt = async () => {
        try {
            const params = new URLSearchParams();
            params.append('CategoryParent_id', id);
            params.append('Limit', currentPage);
            params.append('PageIndex', rowsPerPage);
            // Thêm mỗi giá trị trong mảng vào tham số CategoryList
            selectedCheckboxCategory.forEach(category => {
                params.append('CategoryList', category);
            });
            selectedCheckboxes.forEach(supplier => {
                params.append('SupplierList', supplier);
            });
            const res = await productServices.get(params);
            setCategoryParentId(res.items);
            setTotalCount(res.totalCount);
        } catch (error) {
            console.error(error);
        }
    };
    //lấy dữ liệu loại sản phẩm
    const getCategory = async () => {
        try {
            const res = await categoryServices.get({ CategoryParent_id: id })
            setCategory(res.items)
            console.log(res.items)
        } catch (error) {
            console.log(error)
        }
    }
    //hàm tìm kiếm giá
    const handleSearchPrice = async (event) => {
        event.preventDefault();
        try {
            const params = new URLSearchParams();
            params.append('CategoryParent_id', id);
            params.append('Limit', currentPage);
            params.append('PageIndex', rowsPerPage);
            // Thêm mỗi giá trị trong mảng vào tham số CategoryList
            selectedCheckboxCategory.forEach(category => {
                params.append('CategoryList', category);
            });
            selectedCheckboxes.forEach(supplier => {
                params.append('SupplierList', supplier);
            });
            params.append('PriceMin', inputFrom);
            params.append('PriceMax', inputTo);
            const res = await productServices.get(params);
            setCategoryParentId(res.items);
            setTotalCount(res.totalCount);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getCategoryParnt();
        getCategory();
    }, [currentPage, rowsPerPage, selectedCheckboxCategory, selectedCheckboxes]);
    return (
        <main class="main">
            <div class="page-content mb-10 pb-2">
                <div class="container">
                    <ul class="breadcrumb">
                        <li><a href="demo3.html"><FontAwesomeIcon icon={faHome} /></a></li>
                        <li>Shop</li>
                    </ul>

                    <div class="row main-content-wrap gutter-lg">
                        <aside class="col-lg-3 sidebar sidebar-fixed shop-sidebar sticky-sidebar-wrapper">
                            <div class="sidebar-overlay"></div>
                            <a class="sidebar-close" href="#"><i class="d-icon-times"></i></a>
                            <div class="sidebar-content">
                                <div class="sticky-sidebar">
                                    <div class="widget widget-collapsible">
                                        <h3 class="widget-title">Loại sản phẩm</h3>
                                        <ul class="widget-body filter-items search-ul">
                                            {
                                                category.map((items, index) => (
                                                    <li key={index} style={{ width: "100%" }}>
                                                        <p>
                                                            <input type="checkbox" id={`checkbox-${index}`}
                                                                onChange={handleCheckboxChangeCategory}
                                                                value={items.id}
                                                                checked={selectedCheckboxCategory[items.id]} />
                                                            <label htmlFor={`checkbox-${index}`}>
                                                                <span></span> {items.name}
                                                            </label>
                                                        </p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div class="widget widget-collapsible">
                                        <h3 class="widget-title">Giá</h3>
                                        <div class="widget-body mt-3">
                                            <form action="#">
                                                <div class="filter-price-slider" style={{ margin: "4px 16px 3rem 9px" }}>

                                                    <FilterComponent
                                                        inputFrom={inputFrom}
                                                        inputTo={inputTo}
                                                        min={20000}
                                                        max={100000000}
                                                        step={10000}
                                                        forid="display2"
                                                        class="SB-2"
                                                        onInputFromChange={handleInputFromChange}
                                                        onInputToChange={handleInputToChange}
                                                    />
                                                </div>
                                                <div class="filter-actions">
                                                    <div class="filter-price-text mb-4" style={{ display: "flex" }}>Giá:
                                                        <span class="filter-price-range" style={{ marginLeft: "5px" }}>
                                                            <div id="display2"></div>
                                                        </span>
                                                    </div>
                                                    <button type="submit" class="btn btn-dark btn-rounded btn-filter" style={{ fontWeight: "700", fontSize: "1.4rem", fontFamily: "Poppins, sans-serif" }} onClick={handleSearchPrice}>Lọc</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="widget widget-collapsible">
                                        <h3 class="widget-title">Nhà cung cấp</h3>
                                        <ul class="widget-body filter-items">
                                            {supplier.map((items, index) => (
                                                <li key={index} style={{ width: "100%" }}>
                                                    <p>
                                                        <input type="checkbox" id={`checkboxsupplier-${index}`}
                                                            onChange={handleCheckboxChange}
                                                            value={items.id}
                                                            checked={selectedCheckboxes[items.id]} />
                                                        <label htmlFor={`checkboxsupplier-${index}`}>
                                                            <span></span> {items.name}
                                                        </label>
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <div class="col-lg-9 main-content">
                            <div class="shop-banner banner" style={{ backgroundImage: `url(${shopBanner})`, backgroundColor: "#f2f2f3" }}>
                                <div class="banner-content">
                                    <h4 class="banner-subtitle mb-2 d-inline-block text-uppercase font-weight-bold text-white bg-dark">
                                        Through Thursday</h4>
                                    <h1 class="banner-title text-uppercase text-dark font-weight-bold ls-l">20% off
                                        Suede Bags</h1>
                                    <a href="#" class="btn btn-outline btn-rounded btn-dark">Shop now</a>
                                </div>
                            </div>
                            <nav class="toolbox sticky-content sticky-toolbox fix-top">
                                <div class="toolbox-left">
                                    <a href="#" class="toolbox-item left-sidebar-toggle btn btn-sm btn-outline btn-primary btn-rounded d-lg-none">Filters<i class="d-icon-arrow-right"></i></a>

                                </div>

                            </nav>
                            <div class="row cols-2 cols-sm-3 product-wrapper" >
                                {
                                    categoryParentId.map((items, index) => (
                                        <div class="product-wrap" key={index} >
                                            <div class="product text-center" >
                                                <figure class="product-media">
                                                    <a >
                                                        <img src={`https://192.168.243.125:7285/Images/${items.image[0]}`} alt="product" width="280" height="315" />
                                                    </a>
                                                    <div class="product-label-group">
                                                        <label class="product-label label-new">new</label>
                                                        {
                                                            items.isStatus == 1 ?
                                                                (<label class="product-label label-sale">Giảm giá</label>) :
                                                                ""
                                                        }

                                                    </div>
                                                    <div class="product-action-vertical">
                                                        <a href="#" class="btn-product-icon btn-cart" data-toggle="modal" data-target="#addCartModal" title="Add to cart" onClick={() => handleAddToCart(items.id)}><FontAwesomeIcon icon={faCartPlus} /></a>
                                                    </div>
                                                    <div class="product-action">
                                                        <a class="btn-product btn-quickview" title="Quick View" onClick={() => handleClickDetail(items.id)} style={{ cursor: "pointer" }}> Chi tiết</a>
                                                    </div>
                                                </figure>
                                                <div class="product-details">
                                                    <div class="product-cat">
                                                        <a href="demo3-shop.html">Bags & Backpacks</a>
                                                    </div>
                                                    <h3 class="product-name">
                                                        <a href="demo3-product.html">{items.name}</a>
                                                    </h3>
                                                    <div class="product-price">
                                                        <ins class="new-price">{items.promotionPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</ins>
                                                        {
                                                            items.isStatus == 1 ? (<del class="old-price">{items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>) : ""
                                                        }
                                                    </div>
                                                    <div class="ratings-container">
                                                        <div class="ratings-full">
                                                            <span class="ratings" style={{ width: "60%" }}></span>
                                                            <span class="tooltiptext tooltip-top"></span>
                                                        </div>
                                                        <a href="demo3-product.html" class="rating-reviews">( 16 reviews )</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ))
                                }

                            </div>

                            <nav class="toolbox toolbox-pagination">
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
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ShopePage