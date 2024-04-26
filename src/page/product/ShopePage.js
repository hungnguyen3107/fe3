import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import shopBanner from "../../images/demos/demo3/shop_banner.jpg"
import { useProductContext } from '../../services/helpers/getDataHelpers'
import FilterComponent from './component/FilterComponent';
import { productServices } from '../../services/productService';
import { useParams } from 'react-router-dom';
import "../../css/checkbox.css"
const ShopePage = () => {
    const { category, supplier } = useProductContext();
    const [categoryParentId, setCategoryParentId] = useState([]);
    const { id } = useParams();
    const getCategoryParnt = async () => {
        try {
            const res = await productServices.get({ CategoryParent_id: id });
            setCategoryParentId(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getCategoryParnt();
    }, []);
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
                                        <h3 class="widget-title">All Categories</h3>
                                        <ul class="widget-body filter-items search-ul">
                                            {
                                                category.map((items, index) => (
                                                    <li key={index} style={{ width: "100%" }}><a >{items.name}</a></li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div class="widget widget-collapsible">
                                        <h3 class="widget-title">Price</h3>
                                        <div class="widget-body mt-3">
                                            <form action="#">
                                                <div class="filter-price-slider" style={{ margin: "4px 16px 3rem 9px" }}>
                                                    <FilterComponent
                                                        min={20000}
                                                        max={100000000}
                                                        step={10000}
                                                        forid="display2"
                                                        class="SB-2"
                                                    />
                                                </div>
                                                <div class="filter-actions">
                                                    <div class="filter-price-text mb-4" style={{ display: "flex" }}>Price:
                                                        <span class="filter-price-range" style={{ marginLeft: "5px" }}>
                                                            <div id="display2"></div>
                                                        </span>
                                                    </div>
                                                    <button type="submit" class="btn btn-dark btn-rounded btn-filter" style={{ fontWeight: "700", fontSize: "1.4rem", fontFamily: "Poppins, sans-serif" }}>Filter</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="widget widget-collapsible">
                                        <h3 class="widget-title">Supplier</h3>
                                        <ul class="widget-body filter-items">
                                            {supplier.map((items, index) => (
                                                <li key={index} style={{ width: "100%" }}>
                                                    <p>
                                                        <input type="checkbox" id={`checkbox-${index}`} />
                                                        <label htmlFor={`checkbox-${index}`}>
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
                                    <div class="toolbox-item toolbox-sort select-box">
                                        <label>Sort By :</label>
                                        <select name="orderby" class="form-control">
                                            <option value="default">Default</option>
                                            <option value="popularity" selected="selected">Most Popular</option>
                                            <option value="rating">Average rating</option>
                                            <option value="date">Latest</option>
                                            <option value="price-low">Sort forward price low</option>
                                            <option value="price-high">Sort forward price high</option>
                                            <option value>Clear custom sort</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="toolbox-right">
                                    <div class="toolbox-item toolbox-show select-box">
                                        <label>Show :</label>
                                        <select name="count" class="form-control">
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="36">36</option>
                                        </select>
                                    </div>
                                    <div class="toolbox-item toolbox-layout">
                                        <a href="shop-list-mode.html" class="d-icon-mode-list btn-layout"></a>
                                        <a href="shop.html" class="d-icon-mode-grid btn-layout active"></a>
                                    </div>
                                </div>
                            </nav>
                            <div class="row cols-2 cols-sm-3 product-wrapper">
                                <div class="product-wrap">
                                    {
                                        categoryParentId.map((items, index) => (
                                            <div class="product text-center" key={index}>
                                                <figure class="product-media">
                                                    <a href="demo3-product.html">
                                                        <img src={`https://localhost:7285/Images/${items.image[0]}`} alt="product" width="280" height="315" />
                                                    </a>
                                                    <div class="product-label-group">
                                                        <label class="product-label label-new">new</label>
                                                        <label class="product-label label-sale">12% OFF</label>
                                                    </div>
                                                    <div class="product-action-vertical">
                                                        <a href="#" class="btn-product-icon btn-cart" data-toggle="modal" data-target="#addCartModal" title="Add to cart"><i class="d-icon-bag"></i></a>
                                                        <a href="#" class="btn-product-icon btn-wishlist" title="Add to wishlist"><i class="d-icon-heart"></i></a>
                                                    </div>
                                                    <div class="product-action">
                                                        <a href="#" class="btn-product btn-quickview" title="Quick View">Quick
                                                            View</a>
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
                                                        <ins class="new-price">{items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</ins><del class="old-price">$67.99</del>
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
                                        ))
                                    }
                                </div>
                            </div>
                            <nav class="toolbox toolbox-pagination">
                                <p class="show-info">Showing <span>12 of 56</span> Products</p>
                                <ul class="pagination">
                                    <li class="page-item disabled">
                                        <a class="page-link page-link-prev" href="#" aria-label="Previous" tabindex="-1" aria-disabled="true">
                                            <i class="d-icon-arrow-left"></i>Prev
                                        </a>
                                    </li>
                                    <li class="page-item active" aria-current="page"><a class="page-link" href="#">1</a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item page-item-dots"><a class="page-link" href="#">6</a></li>
                                    <li class="page-item">
                                        <a class="page-link page-link-next" href="#" aria-label="Next">
                                            Next<i class="d-icon-arrow-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ShopePage