import React, { useState, useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import logo from "../../images/logo.png";
import logo_footer from "../../images/logo-footer.png"
import product1 from "../../images/wishlist/product-1.jpg";
import { useCartContext } from '../../services/helpers/getDataCartHelper';
import { NavLink } from "react-router-dom";
import { Modal } from 'antd';
import LoginPage from '../../page/login/LoginPage';
import icon from "../../images/icon.png"
import "../../css/demo3.min.css"
const UserLayout = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const [isUser, setUser] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { dataProducts, calculateTotalQuantity, calculateTotalPrice, isDataCart, handleRemoveItem } = useCartContext();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const handleClickUser = () => {
        setUser(!isUser);
    }
    const handleClickCart = () => {
        setIsCart(!isCart);
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        JSON.parse(sessionStorage.getItem('products'))
    }, [isDataCart])
    const totalQuantity = calculateTotalQuantity();
    const totalPrice = calculateTotalPrice();
    return (
        <>
            <body class="home">
                <div class="page-wrapper">
                    <h1 class="d-none">Riode - Responsive eCommerce HTML Template</h1>
                    <header class="header">
                        <div class="header-top">
                            <div class="container">
                                <div class="header-left">
                                    <p class="welcome-msg">Welcome to Riode store message or remove it!</p>
                                </div>
                                <div class="header-right">
                                    <div class="dropdown">
                                        <a href="#currency">USD</a>
                                        <ul class="dropdown-box">
                                            <li><a href="#USD">USD</a></li>
                                            <li><a href="#EUR">EUR</a></li>
                                        </ul>
                                    </div>

                                    <div class="dropdown ml-5">
                                        <a href="#language">ENG</a>
                                        <ul class="dropdown-box">
                                            <li>
                                                <a href="#USD">ENG</a>
                                            </li>
                                            <li>
                                                <a href="#EUR">FRH</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <span class="divider"></span>
                                    <a href="contact-us.html" class="contact d-lg-show"><FontAwesomeIcon icon={faLocationDot} style={{ marginRight: "0.9rem" }} />Contact</a>
                                    <a href="#" class="help d-lg-show"><FontAwesomeIcon icon={faCircleInfo} style={{ marginRight: "0.9rem" }} /> Need Help</a>
                                    {!user ? (
                                        <>
                                            <a className="login-toggle link-to-tab d-md-show" onClick={showModal}>
                                                <FontAwesomeIcon icon={faUser} style={{ marginRight: "0.9rem" }} />
                                                Sign in
                                            </a>
                                            <span className="delimiter">/</span>
                                            <a href="#register" className="register-toggle link-to-tab d-md-show ml-0">Register</a>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                                        <div className="login-popup">
                                            <div className="form-box">
                                                <LoginPage />
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <div class={`header-middle sticky-header ${isSticky ? 'fixed' : ''}`}>
                            <div class="container">
                                <div class="header-left">
                                    <a href="#" class="mobile-menu-toggle">
                                        <i class="d-icon-bars2"></i>
                                    </a>
                                    <a href="demo3.html" class="logo">
                                        <img src={logo} alt="logo" width="153" height="44" />
                                    </a>
                                    <div class="header-search hs-simple">
                                        <form action="#" class="input-wrapper">
                                            <input type="text" class="form-control" name="search" autocomplete="off" placeholder="Search..." required />
                                            <button class="btn btn-search" type="submit" title="submit-button">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div class="header-right">
                                    <a href="tel:#" class="icon-box icon-box-side">
                                        <div class="icon-box-icon mr-0 mr-lg-2">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </div>
                                        <div class="icon-box-content d-lg-show">
                                            <h4 class="icon-box-title">Call Us Now:</h4>
                                            <p>0(800) 123-456</p>
                                        </div>
                                    </a>
                                    <span class="divider"></span>
                                    <div class={`dropdown wishlist wishlist-dropdown off-canvas ${isUser ? "opened" : ""}`} >
                                        {
                                            user ? (<>
                                                <a class="wishlist-toggle" title="wishlist" onClick={handleClickUser}>
                                                    {
                                                        user.avatar ? (<><img src={`https://localhost:7285/Images/${user.avatar}`} width={28} height={28} /></>) : (<><img src={icon} width={28} height={28} /></>)
                                                    }

                                                </a>
                                            </>) : ""
                                        }
                                        <div class="canvas-overlay" onClick={handleClickUser}></div>

                                        <div class={`dropdown-box scrollable`}>
                                            <div class="canvas-header">
                                                <h4 class="canvas-title">Order</h4>
                                                <a href="#" class="btn btn-dark btn-link btn-icon-right btn-close" onClick={handleClickUser}>close<i class="d-icon-arrow-right"></i><span class="sr-only">wishlist</span></a>
                                            </div>
                                            <div class="products scrollable">
                                                <div class="product product-wishlist">
                                                    <figure class="product-media">
                                                        <a href="product.html">
                                                            <img src={product1} width="100" height="100" alt="product" />
                                                        </a>
                                                        <button class="btn btn-link btn-close">
                                                            <i class="fas fa-times"></i><span class="sr-only">Close</span>
                                                        </button>
                                                    </figure>
                                                    <div class="product-detail">
                                                        <a href="product.html" class="product-name">Girl's Dark Bag</a>
                                                        <div class="price-box">
                                                            <span class="product-price">$84.00</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="product product-wishlist">
                                                    <figure class="product-media">
                                                        <a href="product.html">
                                                            <img src="images/wishlist/product-2.jpg" width="100" height="100" alt="product" />
                                                        </a>
                                                        <button class="btn btn-link btn-close">
                                                            <i class="fas fa-times"></i><span class="sr-only">Close</span>
                                                        </button>
                                                    </figure>
                                                    <div class="product-detail">
                                                        <a href="product.html" class="product-name">Women's Fashional Comforter
                                                        </a>
                                                        <div class="price-box">
                                                            <span class="product-price">$84.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="product product-wishlist">
                                                    <figure class="product-media">
                                                        <a href="product.html">
                                                            <img src="images/wishlist/product-3.jpg" width="100" height="100" alt="product" />
                                                        </a>
                                                        <button class="btn btn-link btn-close">
                                                            <i class="fas fa-times"></i><span class="sr-only">Close</span>
                                                        </button>
                                                    </figure>
                                                    <div class="product-detail">
                                                        <a href="product.html" class="product-name">Wide Knickerbockers</a>
                                                        <div class="price-box">
                                                            <span class="product-price">$84.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="wishlist.html" class="btn btn-dark wishlist-btn mt-4"><span>Go To
                                                Order</span></a>
                                        </div>
                                    </div>
                                    <span class="divider"></span>
                                    <div class={`dropdown cart-dropdown type2 off-canvas mr-0 mr-lg-2 ${isCart ? "opened" : ""}`}>
                                        <a class="cart-toggle label-block link" onClick={handleClickCart}>
                                            <div class="cart-label d-lg-show">
                                                <span class="cart-name">Shopping Cart:</span>
                                                <span class="cart-price">{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            </div>

                                            <i ><FontAwesomeIcon icon={faBagShopping} /><span class="cart-count">{totalQuantity}</span></i>
                                        </a>
                                        <div class="canvas-overlay" onClick={handleClickCart}></div>

                                        <div class="dropdown-box">
                                            <div class="canvas-header">
                                                <h4 class="canvas-title">Shopping Cart</h4>
                                                <a class="btn btn-dark btn-link btn-icon-right btn-close" onClick={handleClickCart}>close<FontAwesomeIcon icon={faArrowRight} /><span class="sr-only">Cart</span></a>
                                            </div>
                                            <div class="products scrollable">
                                                {dataProducts && dataProducts.map((items, index) => (
                                                    <div class="product product-cart" key={index}>
                                                        <figure class="product-media">
                                                            <a >
                                                                <img src={`https://localhost:7285/Images/${items.productId[0].image[0]}`} alt="product" width="80" height="88" />
                                                            </a>
                                                            <button class="btn btn-link btn-close" onClick={() => handleRemoveItem(items.productId[0].id)}>
                                                                <i class="fas fa-times"></i><span class="sr-only">Close</span>
                                                            </button>
                                                        </figure>
                                                        <div class="product-detail">
                                                            <a class="product-name">{items.productId[0].name}</a>
                                                            <div class="price-box">
                                                                <span class="product-quantity">{items.quantity}</span>
                                                                <span class="product-price">{items.productId[0].price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div class="cart-total">
                                                <label>Subtotal:</label>
                                                <span class="price">{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            </div>

                                            <div class="cart-action">
                                                <NavLink to="/cart" class="btn btn-dark btn-link"
                                                    style={{ display: "inline-block", marginBottom: "2rem", borderBottom: "2px solid #26c", padding: 0 }}
                                                >View Cart</NavLink>
                                                <a href="checkout.html" class="btn btn-dark"><span>Go To Checkout</span></a>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="header-search hs-toggle mobile-search">
                                        <a href="#" class="search-toggle">
                                            <i class="d-icon-search"></i>
                                        </a>
                                        <form action="#" class="input-wrapper">
                                            <input type="text" class="form-control" name="search" autocomplete="off" placeholder="Search your keyword..." required />
                                            <button class="btn btn-search" type="submit" title="submit-button">
                                                <i class="d-icon-search"></i>
                                            </button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <div class="header-bottom d-lg-show w-100" style={{ background: "#28475c", color: "#fff", padding: "5px 2.2rem" }}>
                                <div class="header-left">
                                    <nav class="main-nav">
                                        <ul class="menu">
                                            <li class="active">
                                                <NavLink to="/">Home</NavLink>
                                            </li>
                                            {
                                                user ? (<>
                                                    <li class="submenu">
                                                        <a href="#">Pages</a>
                                                        <ul>
                                                            <li style={{ display: "block" }}><NavLink to="/contact" >Contact Us</NavLink></li>
                                                            <li style={{ display: "block" }}><NavLink to="/dashboard" style={{ cursor: "pointer" }}>My Account</NavLink></li>

                                                        </ul>
                                                    </li>
                                                </>) : ""

                                            }
                                            <li>
                                                <a >Blog</a>
                                                <ul>
                                                    <li><NavLink to="/Blog" >Tin tức sản phẩm</NavLink></li>
                                                    <li><NavLink >Tư vấn hướng dẫn</NavLink></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="about-us.html">About Us</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="header-right">
                                    <a href="#">Limited Time Offer</a>
                                    <a href="https://d-themes.com/buynow/riodehtml" class="ml-6">Buy Riode!</a>
                                </div>
                            </div>
                        </div>
                    </header>
                    <Outlet />
                    <footer class="footer appear-animate" data-animation-options="{'name': 'fadeIn', 'duration': '1s'}" style={{ visibility: "visible", opacity: 1 }}>
                        <div class="container">
                            <div class="footer-top">
                                <div class="row align-items-center">
                                    <div class="col-lg-3">
                                        <a href="demo3.html" class="logo-footer">
                                            <img src={logo_footer} alt="logo-footer" width="154" height="43" />
                                        </a>

                                    </div>
                                    <div class="col-lg-9">
                                        <div class="widget widget-newsletter form-wrapper form-wrapper-inline">
                                            <div class="newsletter-info mx-auto mr-lg-2 ml-lg-4">
                                                <h4 class="widget-title">Subscribe to our Newsletter</h4>
                                                <p>Get all the latest information, Sales and Offers.</p>
                                            </div>
                                            <form action="#" class="input-wrapper input-wrapper-inline">
                                                <input type="email" class="form-control" name="email" id="newsletter_email" placeholder="Email address here..." required />
                                                <button class="btn btn-primary btn-md btn-rounded ml-2" type="submit">subscribe<i class="d-icon-arrow-right"></i></button>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="footer-middle">
                                <div class="row">
                                    <div class="col-lg-3 col-md-6">
                                        <div class="widget widget-info">
                                            <h4 class="widget-title">Contact Info</h4>
                                            <ul class="widget-body">
                                                <li>
                                                    <label>Phone:</label>
                                                    <a href="tel:#">Toll Free (123) 456-7890</a>
                                                </li>
                                                <li>
                                                    <label>Email:</label>
                                                    <a href="https://d-themes.com/cdn-cgi/l/email-protection#d0bdb1b9bc90a2b9bfb4b5feb3bfbd"><span class="__cf_email__" data-cfemail="c2afa3abae82b0abada6a7eca1adaf">[email&#160;protected]</span></a>
                                                </li>
                                                <li>
                                                    <label>Address:</label>
                                                    <a href="#">123 Street Name, City, England</a>
                                                </li>
                                                <li>
                                                    <label>WORKING DAYS / HOURS:</label>
                                                </li>
                                                <li>
                                                    <a href="#">Mon - Sun / 9:00 AM - 8:00 PM</a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                        <div class="widget ml-lg-4">
                                            <h4 class="widget-title">My Account</h4>
                                            <ul class="widget-body">
                                                <li style={{ width: "100%" }}>
                                                    <a href="about-us.html">About Us</a>
                                                </li>
                                                <li style={{ width: "100%" }}>
                                                    <a href="#">Order History</a>
                                                </li >
                                                <li style={{ width: "100%" }}>
                                                    <a href="#">Returns</a>
                                                </li>
                                                <li style={{ width: "100%" }}>
                                                    <a href="#">Custom Service</a>
                                                </li>
                                                <li style={{ width: "100%" }}>
                                                    <a href="#">Terms &amp; Condition</a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                        <div class="widget ml-lg-4">
                                            <h4 class="widget-title">Contact Info</h4>
                                            <ul class="widget-body">
                                                <li style={{ width: "100%" }}>
                                                    <a href="#">Sign in</a>
                                                </li>
                                                <li style={{ width: "100%" }}>
                                                    <a href="cart.html">View Cart</a>
                                                </li>
                                                <li style={{ width: "100%" }}>
                                                    <a href="wishlist.html">My Wishlist</a>
                                                </li>
                                                <li style={{ width: "100%" }}>
                                                    <a href="#">Track My Order</a>
                                                </li>
                                                <li style={{ width: "100%" }}>
                                                    <a href="#">Help</a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                        <div class="widget widget-instagram">
                                            <h4 class="widget-title">Instagram</h4>
                                            <figure class="widget-body row">
                                                <div class="col-3">
                                                    <img src="images/instagram/01.jpg" alt="instagram 1" width="64" height="64" />
                                                </div>
                                                <div class="col-3">
                                                    <img src="images/instagram/02.jpg" alt="instagram 2" width="64" height="64" />
                                                </div>
                                                <div class="col-3">
                                                    <img src="images/instagram/03.jpg" alt="instagram 3" width="64" height="64" />
                                                </div>
                                                <div class="col-3">
                                                    <img src="images/instagram/04.jpg" alt="instagram 4" width="64" height="64" />
                                                </div>
                                                <div class="col-3">
                                                    <img src="images/instagram/05.jpg" alt="instagram 5" width="64" height="64" />
                                                </div>
                                                <div class="col-3">
                                                    <img src="images/instagram/06.jpg" alt="instagram 6" width="64" height="64" />
                                                </div>
                                                <div class="col-3">
                                                    <img src="images/instagram/07.jpg" alt="instagram 7" width="64" height="64" />
                                                </div>
                                                <div class="col-3">
                                                    <img src="images/instagram/08.jpg" alt="instagram 8" width="64" height="64" />
                                                </div>
                                            </figure>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="footer-bottom">
                                <div class="footer-left">
                                    <figure class="payment">
                                        <img src="images/payment.png" alt="payment" width="159" height="29" />
                                    </figure>
                                </div>
                                <div class="footer-center">
                                    <p class="copyright">Riode eCommerce &copy; 2021. All Rights Reserved</p>
                                </div>
                                <div class="footer-right">
                                    <div class="social-links">
                                        <a href="#" title="social-link" class="social-link social-facebook fab fa-facebook-f"></a>
                                        <a href="#" title="social-link" class="social-link social-twitter fab fa-twitter"></a>
                                        <a href="#" title="social-link" class="social-link social-linkedin fab fa-linkedin-in"></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </footer>
                </div>

                <div class="sticky-footer sticky-content fix-bottom">
                    <a href="demo3.html" class="sticky-link">
                        <i class="d-icon-home"></i>
                        <span>Home</span>
                    </a>
                    <a href="demo3-shop.html" class="sticky-link">
                        <i class="d-icon-volume"></i>
                        <span>Categories</span>
                    </a>
                    <a href="wishlist.html" class="sticky-link">
                        <i class="d-icon-heart"></i>
                        <span>Wishlist</span>
                    </a>
                    <a href="account.html" class="sticky-link">
                        <i class="d-icon-user"></i>
                        <span>Account</span>
                    </a>
                    <div class="header-search hs-toggle dir-up">
                        <a href="#" class="search-toggle sticky-link">
                            <i class="d-icon-search"></i>
                            <span>Search</span>
                        </a>
                        <form action="#" class="input-wrapper">
                            <input type="text" class="form-control" name="search" autocomplete="off" placeholder="Search your keyword..." required />
                            <button class="btn btn-search" type="submit" title="submit-button">
                                <i class="d-icon-search"></i>
                            </button>
                        </form>
                    </div>
                </div>

                <a id="scroll-top" href="#top" title="Top" role="button" class="scroll-top"><i class="d-icon-arrow-up"></i></a>

                <div class="mobile-menu-wrapper">
                    <div class="mobile-menu-overlay">
                    </div>

                    <a class="mobile-menu-close" href="#"><i class="d-icon-times"></i></a>

                    <div class="mobile-menu-container scrollable">
                        <form action="#" class="input-wrapper">
                            <input type="text" class="form-control" name="search" autocomplete="off" placeholder="Search your keyword..." required />
                            <button class="btn btn-search" type="submit" title="submit-button">
                                <i class="d-icon-search"></i>
                            </button>
                        </form>

                        <ul class="mobile-menu mmenu-anim">
                            <li>
                                <a href="demo3.html">Home</a>
                            </li>
                            <li>
                                <a href="demo3-shop.html">Categories</a>
                                <ul>
                                    <li>
                                        <a href="#">
                                            Variations 1
                                        </a>
                                        <ul>
                                            <li><a href="shop-classic-filter.html">Classic Filter</a></li>
                                            <li><a href="shop-left-toggle-sidebar.html">Left Toggle Filter</a></li>
                                            <li><a href="shop-right-toggle-sidebar.html">Right Toggle Sidebar</a></li>
                                            <li><a href="shop-horizontal-filter.html">Horizontal Filter </a>
                                            </li>
                                            <li><a href="shop-navigation-filter.html">Navigation Filter</a></li>
                                            <li><a href="shop-off-canvas-filter.html">Off-Canvas Filter </a></li>
                                            <li><a href="shop-top-banner.html">Top Banner</a></li>
                                            <li><a href="shop-inner-top-banner.html">Inner Top Banner</a></li>
                                            <li><a href="shop-with-bottom-block.html">With Bottom Block</a></li>
                                            <li><a href="shop-category-in-page-header.html">Category In Page Header</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Variations 2
                                        </a>
                                        <ul>
                                            <li><a href="shop-grid-3cols.html">3 Columns Mode</a></li>
                                            <li><a href="shop-grid-4cols.html">4 Columns Mode</a></li>
                                            <li><a href="shop-grid-5cols.html">5 Columns Mode</a></li>
                                            <li><a href="shop-grid-6cols.html">6 Columns Mode</a></li>
                                            <li><a href="shop-grid-7cols.html">7 Columns Mode</a></li>
                                            <li><a href="shop-grid-8cols.html">8 Columns Mode</a></li>
                                            <li><a href="shop-list-mode.html">List Mode</a></li>
                                            <li><a href="shop-pagination.html">Pagination</a></li>
                                            <li><a href="shop-infinite-ajaxscroll.html">Infinite Ajaxscroll </a></li>
                                            <li><a href="shop-loadmore-button.html">Loadmore Button</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Variations 3
                                        </a>
                                        <ul>
                                            <li><a href="shop-category-grid-shop.html">Category Grid Shop</a></li>
                                            <li><a href="shop-category%2bproducts.html">Category + Products</a></li>
                                            <li><a href="shop-default-1.html">Shop Default 1 </a>
                                            </li>
                                            <li><a href="shop-default-2.html">Shop Default 2</a></li>
                                            <li><a href="shop-default-3.html">Shop Default 3</a></li>
                                            <li><a href="shop-default-4.html">Shop Default 4</a></li>
                                            <li><a href="shop-default-5.html">Shop Default 5</a></li>
                                            <li><a href="shop-default-6.html">Shop Default 6</a></li>
                                            <li><a href="shop-default-7.html">Shop Default 7</a></li>
                                            <li><a href="shop-default-8.html">Shop Default 8</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="demo3-product.html">Products</a>
                                <ul>
                                    <li>
                                        <a href="#">Product Pages</a>
                                        <ul>
                                            <li><a href="product-simple.html">Simple Product</a></li>
                                            <li><a href="product-featured.html">Featured &amp; On Sale</a></li>
                                            <li><a href="product.html">Variable Product</a></li>
                                            <li><a href="product-variable-swatch.html">Variation Swatch
                                                Product</a></li>
                                            <li><a href="product-grouped.html">Grouped Product </a></li>
                                            <li><a href="product-external.html">External Product</a></li>
                                            <li><a href="product-in-stock.html">In Stock Product</a></li>
                                            <li><a href="product-out-stock.html">Out of Stock Product</a></li>
                                            <li><a href="product-upsell.html">Upsell Products</a></li>
                                            <li><a href="product-cross-sell.html">Cross Sell Products</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Product Layouts</a>
                                        <ul>
                                            <li><a href="product-vertical.html">Vertical Thumb</a></li>
                                            <li><a href="product-horizontal.html">Horizontal Thumb</a></li>
                                            <li><a href="product-gallery.html">Gallery Type</a></li>
                                            <li><a href="product-grid.html">Grid Images</a></li>
                                            <li><a href="product-masonry.html">Masonry Images</a></li>
                                            <li><a href="product-sticky.html">Sticky Info</a></li>
                                            <li><a href="product-sticky-both.html">Left & Right Sticky</a></li>
                                            <li><a href="product-left-sidebar.html">With Left Sidebar</a></li>
                                            <li><a href="product-right-sidebar.html">With Right Sidebar</a></li>
                                            <li><a href="product-full.html">Full Width Layout </a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Product Features</a>
                                        <ul>
                                            <li><a href="product-sale.html">Sale Countdown</a></li>
                                            <li><a href="product-hurryup.html">Hurry Up Notification </a></li>
                                            <li><a href="product-attribute-guide.html">Attribute Guide </a></li>
                                            <li><a href="product-sticky-cart.html">Add Cart Sticky</a></li>
                                            <li><a href="product-thumbnail-label.html">Labels on Thumbnail</a>
                                            </li>
                                            <li><a href="product-more-description.html">More Description
                                                Tabs</a></li>
                                            <li><a href="product-accordion-data.html">Data In Accordion</a></li>
                                            <li><a href="product-tabinside.html">Data Inside</a></li>
                                            <li><a href="product-video.html">Video Thumbnail </a>
                                            </li>
                                            <li><a href="product-360-degree.html">360 Degree Thumbnail </a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Pages</a>
                                <ul>
                                    <li><a href="about-us.html">About</a></li>
                                    <li><a href="contact-us.html">Contact Us</a></li>
                                    <li><a href="account.html">Login</a></li>
                                    <li><a href="faq.html">FAQs</a></li>
                                    <li><a href="error-404.html">Error 404</a>
                                        <ul>
                                            <li><a href="error-404.html">Error 404-1</a></li>
                                            <li><a href="error-404-1.html">Error 404-2</a></li>
                                            <li><a href="error-404-2.html">Error 404-3</a></li>
                                            <li><a href="error-404-3.html">Error 404-4</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="coming-soon.html">Coming Soon</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="blog-classic.html">Blog</a>
                                <ul>
                                    <li><a href="blog-classic.html">Classic</a></li>
                                    <li><a href="blog-listing.html">Listing</a></li>
                                    <li>
                                        <a href="#">Grid</a>
                                        <ul>
                                            <li><a href="blog-grid-2col.html">Grid 2 columns</a></li>
                                            <li><a href="blog-grid-3col.html">Grid 3 columns</a></li>
                                            <li><a href="blog-grid-4col.html">Grid 4 columns</a></li>
                                            <li><a href="blog-grid-sidebar.html">Grid sidebar</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Masonry</a>
                                        <ul>
                                            <li><a href="blog-masonry-2col.html">Masonry 2 columns</a></li>
                                            <li><a href="blog-masonry-3col.html">Masonry 3 columns</a></li>
                                            <li><a href="blog-masonry-4col.html">Masonry 4 columns</a></li>
                                            <li><a href="blog-masonry-sidebar.html">Masonry sidebar</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Mask</a>
                                        <ul>
                                            <li><a href="blog-mask-grid.html">Blog mask grid</a></li>
                                            <li><a href="blog-mask-masonry.html">Blog mask masonry</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="post-single.html">Single Post</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="element.html">Elements</a>
                                <ul>
                                    <li>
                                        <a href="#">Elements 1</a>
                                        <ul>
                                            <li><a href="element-accordions.html">Accordions</a></li>
                                            <li><a href="element-alerts.html">Alert &amp; Notification</a></li>
                                            <li><a href="element-banner-effect.html">Banner Effect
                                            </a></li>
                                            <li><a href="element-banner.html">Banner
                                            </a></li>
                                            <li><a href="element-blog-posts.html">Blog Posts</a></li>
                                            <li><a href="element-breadcrumb.html">Breadcrumb
                                            </a></li>
                                            <li><a href="element-buttons.html">Buttons</a></li>
                                            <li><a href="element-cta.html">Call to Action</a></li>
                                            <li><a href="element-countdown.html">Countdown
                                            </a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Elements 2</a>
                                        <ul>
                                            <li><a href="element-counter.html">Counter </a></li>
                                            <li><a href="element-creative-grid.html">Creative Grid
                                            </a></li>
                                            <li><a href="element-animation.html">Entrance Effect
                                            </a></li>
                                            <li><a href="element-floating.html">Floating
                                            </a></li>
                                            <li><a href="element-hotspot.html">Hotspot
                                            </a></li>
                                            <li><a href="element-icon-boxes.html">Icon Boxes</a></li>
                                            <li><a href="element-icons.html">Icons</a></li>
                                            <li><a href="element-image-box.html">Image box
                                            </a></li>
                                            <li><a href="element-instagrams.html">Instagrams</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Elements 3</a>
                                        <ul>
                                            <li><a href="element-categories.html">Product Category</a></li>
                                            <li><a href="element-products.html">Products</a></li>
                                            <li><a href="element-product-banner.html">Products + Banner
                                            </a></li>
                                            <li><a href="element-product-grid.html">Products + Grid
                                            </a></li>
                                            <li><a href="element-product-single.html">Product Single
                                            </a>
                                            </li>
                                            <li><a href="element-product-tab.html">Products + Tab
                                            </a></li>
                                            <li><a href="element-single-product.html">Single Product
                                            </a></li>
                                            <li><a href="element-slider.html">Slider
                                            </a></li>
                                            <li><a href="element-social-link.html">Social Icons </a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Elements 4</a>
                                        <ul>
                                            <li><a href="element-subcategory.html">Subcategory
                                            </a></li>
                                            <li><a href="element-svg-floating.html">Svg Floating
                                            </a></li>
                                            <li><a href="element-tabs.html">Tabs</a></li>
                                            <li><a href="element-testimonials.html">Testimonials
                                            </a></li>
                                            <li><a href="element-titles.html">Title</a></li>
                                            <li><a href="element-typography.html">Typography</a></li>
                                            <li><a href="element-vendor.html">Vendor
                                            </a></li>
                                            <li><a href="element-video.html">Video
                                            </a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="riode.html">Buy Riode!</a></li>
                        </ul>

                    </div>
                </div>

            </body>

        </>

    )
}

export default UserLayout