import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "../../css/demo3.min.css"
import "../../css/style.min.css"
import { useProductContext } from '../../services/helpers/getDataHelpers'
import { useCartContext } from '../../services/helpers/getDataCartHelper';
import { ratingServices } from '../../services/ratingService';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Grid, message, Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LoginPage from '../login/LoginPage';
import icon from "../../images/icon.png"
import { productServices } from '../../services/productService';
import style from '../../css/product-viewer.module.scss';
import styled from 'styled-components';
import { Modal, Pagination } from 'antd';
import { smoothHorizontalScrolling } from '../../services/helpers/smoothHorizontalScrolling';
const ProductDetailPage = () => {
    const { TabPane } = Tabs;
    const { isModalOpen, handleOk, handleCancel, showModal, handleClickDetail } = useProductContext();
    const { isDataCart, setDataCart, dataUser } = useCartContext();
    const [isRating, setIsRating] = useState(false);
    const [productId, setProductId] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [dataRating, setDataRating] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState();
    const [totalCount, setTotalCount] = useState(0);
    const [countRating, setCountRating] = useState(0);
    const [idCategory, setIdCategory] = useState();
    const [productSimilar, setProductSimilar] = useState([]);
    const [dragDown, setDragDown] = useState(0);
    const [dragProduct, setDragProduct] = useState(0);
    const [isDrag, setIsDrag] = useState(false);
    const [isStatusRating, setIsStatusRating] = useState(false);
    const productSimilarSliderRef = useRef();
    const productSimilarRef = useRef();
    const { id } = useParams();

    const handleRatingClick = (value) => {
        setRating(value);
    };
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    //nút chuyển slider
    const handleScrollProductSimilarRight = () => {
        const maxScrollLeft = productSimilarSliderRef.current.scrollWidth - productSimilarSliderRef.current.clientWidth;
        console.log(maxScrollLeft);
        if (productSimilarSliderRef.current.scrollLeft < maxScrollLeft) {
            smoothHorizontalScrolling(productSimilarSliderRef.current, 250, productSimilarSliderRef.current.clientWidth, productSimilarSliderRef.current.scrollWidth);
        }
    };
    const handleScrollProductSimilarLeft = () => {
        if (productSimilarSliderRef.current.scrollLeft > 0) {
            smoothHorizontalScrolling(productSimilarSliderRef.current, 250, -productSimilarRef.current.clienWidth, productSimilarSliderRef.current.scrolllWidth)
        }
    }
    //lấy dữ liệu sản phẩm theo id 
    const getProductDetail = async () => {
        try {
            const res = await productServices.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
                "Id": id
            });
            if (res) {
                setProductId(res.items);
                setData({
                    image: `https://localhost:7285/Images/${res.items[0].image[0]}`,
                    index: 0
                })
                setIdCategory(res.items[0].category.id);
                // console.log("id", res.items[0].category.id)
            }

        } catch (error) {
            console.error(error);
        }
    }
    //lấy dữ liệu sản phẩm tương tự similar
    const getProductSimilar = async () => {
        try {
            const res = await productServices.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
                CategoryList: idCategory
            });
            if (res) {
                setProductSimilar(res.items);
                console.log(res.items)
                console.log(idCategory)
            }

        } catch (error) {
            console.error(error);
        }
    }
    //lấy dữ liệu đánh giá sao
    const getRating = async () => {
        try {
            const res = await ratingServices.get({
                "Product_id": id,
                "Limit": currentPage,
                "PageIndex": rowsPerPage
            });
            setDataRating(res.items);
            setTotalCount(res.totalCount);
            setIsStatusRating(!isStatusRating);
        } catch (error) {
            console.error(error);
        }
    }
    //lấy số lượng sao
    const getCountRating = async () => {
        try {
            const res = await ratingServices.getCountRating({
                "Product_id": id,
                "Limit": currentPage,
                "PageIndex": rowsPerPage
            });
            setCountRating(res);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    //gửi bình luận đi
    const handleSubmit = (event) => {
        event.preventDefault();
        const res = ratingServices.create({ "star": rating, "content": comment, "product_id": id, "user_id": dataUser.id })
        if (res) {
            message.success("Cảm ơn bạn đã nhận xét sản phẩm!")
            getRating();
        } else {
            message.error(res.error)
        }
    };
    // mở modal bình luận
    const handleClickRating = () => {
        setIsRating(!isRating);
    }
    //giảm số lượng
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    //tăng số lượng
    const increaseQuantity = () => {
        if (quantity < 1000000) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };
    //thêm sản phẩm vào giỏ hàng
    const handleAddToCart = (id) => {
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        const productIndex = products.findIndex(item => item.productId[0].id === id);
        if (productIndex !== -1) {
            const product = products[productIndex];
            console.log(product);
            if (product.productId[0].quantity < product.quantity + quantity) {
                message.error(`Cửa hàng chỉ còn lại ${product.productId[0].quantity} sản phẩm`);
            } else {
                const updatedProducts = [...products];
                updatedProducts[productIndex].quantity += quantity;
                sessionStorage.setItem('products', JSON.stringify(updatedProducts));
                setDataCart(!isDataCart)
                message.success("Thêm vào giỏ hàng thành công !")
            }
        } else {
            if (productId[0].quantity < quantity) {
                message.error(`cửa hàng chỉ còn lại ${productId[0].quantity} sản phẩm`)
            } else {
                const newProduct = { productId: productId, quantity };
                const updatedProducts = [...products, newProduct];
                sessionStorage.setItem('products', JSON.stringify(updatedProducts));
                setDataCart(!isDataCart)
                message.success("Thêm vào giỏ hàng thành công !")

            }
        }
    };
    //load dữ liệu ra
    useEffect(() => {
        getRating();
        getProductDetail();
        getCountRating();
        getProductSimilar();
    }, [currentPage, rowsPerPage, idCategory, id, isStatusRating])

    useEffect(() => {
        JSON.parse(sessionStorage.getItem('products'))
    }, [isDataCart])
    useEffect(() => {
        if (isDrag) {
            if (dragProduct < dragDown) handleScrollProductSimilarRight();
            if (dragProduct > dragDown) handleScrollProductSimilarLeft();
        }
    }, [dragDown, dragProduct, isDrag])
    const onDragStart = e => {
        setIsDrag(true);
        setDragDown(e.screenX);
    }
    const onDragEnd = e => {
        setIsDrag(false);
    }
    const onDragEnter = e => {
        setDragProduct(e.screenX);
    }
    // const imgAction = (action) => {
    //     let i = data.index;
    //     if (action === 'next-img') {
    //         setData({ image: productData.images[i + 1], index: i + 1 });
    //     }
    //     if (action === 'previos-img') {
    //         setData({ image: productData.images[i - 1], index: i - 1 });
    //     }
    // }
    const getRatingPercentage = (rating) => {
        const ratingObj = countRating && countRating.find((item) => item.star === rating);
        return ratingObj ? (ratingObj.count / totalCount * 100).toFixed(2) : '0';
    };
    //tính tổng số sao
    let totalStars = 0;
    countRating && countRating.forEach(value => {
        totalStars += (value.star * value.count);
    });
    //css slider
    const ProductSlider = styled.div`
display: grid;
grid-template-columns:repeat(${productSimilar.length},243px);
gap: 6px;
transition: all 0.3s linear;
user-select: none;
overflow-y: hidden;
overflow-x: auto;
overflow:hidden;
padding-top: 28px;
padding-bottom: 28px;
scroll-behavior: smooth;

.movieItem {
    transform: scale(1);
    max-width: 228px;
    max-height: 414px;
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;
    user-select: none;
    overflow: hidden;
    transform:center left;
    position: relative;
}
`;
    return (
        <main class="main mt-6 single-product">
            <div class="page-content mb-10 pb-9">
                <div class="container">
                    <div class="product product-single row mb-8">
                        <div class="col-md-6">
                            <div class="product-gallery">
                                <div class="product-single-carousel owl-carousel owl-theme owl-nav-inner row cols-1">

                                    <figure class="product-image">
                                        <img src={data ? data.image : null} alt="" data-zoom-image="images/demos/demo3/product/product-1-800x900.jpg" width="800" height="900" style={{ backgroundColor: "#f5f5f5" }} />
                                    </figure>
                                </div>
                                <div class="product-thumbs-wrap">
                                    {productId.map((item, index) => (
                                        <div class="product-thumbs" key={index} style={{ border: data.image === item.image ? '1px solid blue' : '' }}>
                                            {item.image.map((imageItem, imageIndex) => (
                                                <div key={imageIndex} onClick={() => setData({ image: `https://localhost:7285/Images/${imageItem}`, index: imageIndex })}>
                                                    <div class="product-thumb">
                                                        <img src={`https://localhost:7285/Images/${imageItem}`} alt="product thumbnail" width="137" height="154" style={{ backgroundColor: "#f5f5f5" }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                    <button class="thumb-up disabled"><i class="fas fa-chevron-left"></i></button>
                                    <button class="thumb-down disabled"><i class="fas fa-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            {
                                productId.map((items, index) => (
                                    <div class="product-details  product-gallery-sticky" key={index}>
                                        <div class="product-navigation">
                                            <ul class="breadcrumb breadcrumb-lg">
                                                <li><NavLink to="/"><FontAwesomeIcon icon={faHome} /></NavLink></li>
                                                <li><a href="#" class="active">Sản phẩm</a></li>
                                                <li>Chi tiết</li>
                                            </ul>
                                        </div>
                                        <h1 class="product-name">{items.name}</h1>
                                        <div class="product-meta">
                                            SKU:<span class="product-sku">{items.id}</span>
                                            LOẠI SẢN PHẨM:<span class="product-brand">{items.category.name}</span>
                                        </div>
                                        <div class="product-price">
                                            <ins class="new-price">{items.promotionPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</ins>
                                            {
                                                items.isStatus == 1 ? (<del class="old-price">{items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>) : ""
                                            }

                                        </div>
                                        <div class="ratings-container">
                                            <div class="comment-rating ratings-container">

                                                {[1, 2, 3, 4, 5].map((starValue) => (
                                                    <FontAwesomeIcon
                                                        key={starValue}
                                                        icon={faStar}
                                                        className={`star ${starValue <= Math.ceil(totalStars / totalCount) ? 'yellow' : ''}`}
                                                    />
                                                ))}
                                            </div>
                                            <a href="#product-tab-reviews" class="link-to-tab rating-reviews">( {totalCount} reviews )</a>
                                        </div>
                                        <hr class="product-divider" />
                                        <div class="product-form product-qty">
                                            <div class="product-form-group">
                                                <div class="input-group mr-2">
                                                    <button className="quantity-minus" onClick={decreaseQuantity}>
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <input
                                                        className="quantity form-control"
                                                        type="number"
                                                        value={quantity}
                                                        min="1"
                                                        max="1000000"
                                                        readOnly // Đảm bảo người dùng không thể nhập trực tiếp vào input
                                                    />
                                                    <button className="quantity-plus" onClick={increaseQuantity}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                                <button class="btn-product btn-cart text-normal ls-normal font-weight-semi-bold" onClick={() => handleAddToCart(items.id)}><FontAwesomeIcon style={{ marginRight: "6px" }} icon={faCartPlus} />Thêm vào giỏ hàng</button>
                                            </div>
                                        </div>
                                        <hr class="product-divider mb-3" />
                                        <div class="product-footer">
                                            <div class="social-links mr-4">
                                                <a href="#" class="social-link social-facebook fab fa-facebook-f"></a>
                                                <a href="#" class="social-link social-twitter fab fa-twitter"></a>
                                                <a href="#" class="social-link social-pinterest fab fa-pinterest-p"></a>
                                            </div>
                                            <hr class="divider d-lg-show" />
                                            {/* <div class="product-action">
                                                <a class="btn-product btn-wishlist mr-6"><i class="d-icon-heart"></i>Add to wishlist</a>
                                                <a href="#" class="btn-product btn-compare"><i class="d-icon-compare"></i>Add to compare</a>
                                            </div> */}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div class="tab tab-nav-simple product-tabs mb-5">
                            <Tabs >
                                <TabPane tab="Mô tả" key="Description">
                                    <div class="tab-pane active in mb-3" id="product-tab-description">
                                        <div class="">
                                            <div class="">
                                                {
                                                    productId.map((items, index) => (
                                                        <p key={index} dangerouslySetInnerHTML={{ __html: items.description }} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Đánh giá" key="Reviews">
                                    <div class="tab-pane active in" id="product-tab-reviews">
                                        <div class="row">
                                            <div class="col-lg-4 mb-6">
                                                <div class="avg-rating-container">
                                                    <mark>5.0</mark>
                                                    <div class="avg-rating">
                                                        <span class="avg-rating-title">Sao trung bình</span>
                                                        <div class="ratings-container mb-0">

                                                            <div class="comment-rating ratings-container">

                                                                {[1, 2, 3, 4, 5].map((starValue) => (
                                                                    <FontAwesomeIcon
                                                                        key={starValue}
                                                                        icon={faStar}
                                                                        className={`star ${starValue <= Math.ceil(totalStars / totalCount) ? 'yellow' : ''}`}
                                                                    />
                                                                ))}
                                                            </div>

                                                            <span class="rating-reviews">({totalCount} Reviews)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ratings-list mb-2">
                                                    {[5, 4, 3, 2, 1].map((value) => (
                                                        <div class="ratings-item">
                                                            <div class="ratings-container mb-0">
                                                                <div class="comment-rating ratings-container">
                                                                    {[1, 2, 3, 4, 5].map((starValue) => (
                                                                        <FontAwesomeIcon
                                                                            key={starValue}
                                                                            icon={faStar}
                                                                            className={`star ${starValue <= value ? 'yellow' : ''}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div class="rating-percent">
                                                                <span style={{ width: `${getRatingPercentage(value)}%` }}></span>

                                                            </div>
                                                            <div class="progress-value">{`${getRatingPercentage(value)}%`}</div>
                                                        </div>
                                                    ))}
                                                    {/* <div class="ratings-item">
                                                        <div class="ratings-container mb-0">
                                                            <div class="comment-rating ratings-container">
                                                                {[1, 2, 3, 4, 5].map((value) => (
                                                                    <FontAwesomeIcon
                                                                        key={value}
                                                                        icon={faStar}
                                                                        className={`star ${value <= 5 ? 'yellow' : ''}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div class="rating-percent">
                                                            <span style={{ width: "100%" }}></span>
                                                        </div>
                                                        <div class="progress-value">100%</div>
                                                    </div>
                                                    <div class="ratings-item">
                                                        <div class="ratings-container mb-0">
                                                            <div class="comment-rating ratings-container">
                                                                {[1, 2, 3, 4, 5].map((value) => (
                                                                    <FontAwesomeIcon
                                                                        key={value}
                                                                        icon={faStar}
                                                                        className={`star ${value <= 4 ? 'yellow' : ''}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div class="rating-percent">
                                                            <span style={{ width: "0%" }}></span>
                                                        </div>
                                                        <div class="progress-value">0%</div>
                                                    </div>
                                                    <div class="ratings-item">
                                                        <div class="ratings-container mb-0">
                                                            <div class="ratings-full">
                                                                <span class="ratings" style={{ width: "60%" }}></span>
                                                                <span class="tooltiptext tooltip-top">4.00</span>
                                                            </div>
                                                        </div>
                                                        <div class="rating-percent">
                                                            <span style={{ width: "0%" }}></span>
                                                        </div>
                                                        <div class="progress-value">0%</div>
                                                    </div>
                                                    <div class="ratings-item">
                                                        <div class="ratings-container mb-0">
                                                            <div class="ratings-full">
                                                                <span class="ratings" style={{ width: "40%" }}></span>
                                                                <span class="tooltiptext tooltip-top">4.00</span>
                                                            </div>
                                                        </div>
                                                        <div class="rating-percent">
                                                            <span style={{ width: "0%" }}></span>
                                                        </div>
                                                        <div class="progress-value">0%</div>
                                                    </div>
                                                    <div class="ratings-item">
                                                        <div class="ratings-container mb-0">
                                                            <div class="ratings-full">
                                                                <span class="ratings" style={{ width: "20%" }}></span>
                                                                <span class="tooltiptext tooltip-top">4.00</span>
                                                            </div>
                                                        </div>
                                                        <div class="rating-percent">
                                                            <span style={{ width: "0%" }}></span>
                                                        </div>
                                                        <div class="progress-value">0%</div>
                                                    </div> */}
                                                </div>
                                                <a class="btn btn-dark btn-rounded submit-review-toggle" style={{ padding: "1.22em 2.78em", fontWeight: "700", fontSize: "1.4rem", fontFamily: "Poppins, sans-serif" }} onClick={handleClickRating}> Gửi đánh giá</a>
                                            </div>
                                            <div class="col-lg-8 comments pt-2 pb-10 border-no">

                                                <ul class="comments-list" style={{ display: "grid" }}>
                                                    {
                                                        dataRating.map((items, index) => (
                                                            <li key={index}>
                                                                <div class="comment">
                                                                    <figure class="comment-media">
                                                                        {
                                                                            items.user.avatar == null ? (<>
                                                                                <a >
                                                                                    <img src={icon} alt="avatar" />
                                                                                </a>
                                                                            </>) : (<>
                                                                                <a >
                                                                                    <img src={`https://localhost:7285/Images/${items.user.avatar}`} alt="avatar" />
                                                                                </a>
                                                                            </>)
                                                                        }

                                                                    </figure>
                                                                    <div class="comment-body">
                                                                        <div class="comment-rating ratings-container">
                                                                            {[1, 2, 3, 4, 5].map((value) => (
                                                                                <FontAwesomeIcon
                                                                                    key={value}
                                                                                    icon={faStar}
                                                                                    className={`star ${value <= items.star ? 'yellow' : ''}`}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                        <div class="comment-user">
                                                                            <span class="comment-date">by <span class="font-weight-semi-bold text-uppercase text-dark">{items.user.email}</span> on
                                                                                <span class="font-weight-semi-bold text-dark">{new Date(items.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></span>
                                                                        </div>
                                                                        <div class="comment-content mb-5">
                                                                            <p>{items.content}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }

                                                </ul>
                                                <nav class="toolbox toolbox-pagination justify-content-end">
                                                    <Pagination
                                                        current={currentPage}
                                                        pageSize={rowsPerPage}
                                                        defaultPageSize={rowsPerPage}
                                                        // showSizeChanger={true}
                                                        // pageSizeOptions={["10", "20", "30", '100']}
                                                        total={totalCount}
                                                        locale={{ items_per_page: "/ trang" }}
                                                        showTotal={(total, range) => <span>Tổng số: {total}</span>}
                                                        onShowSizeChange={(current, pageSize) => {
                                                            setCurrentPage(current);
                                                            setRowsPerpage(pageSize);
                                                        }}
                                                        onChange={(pageNumber) => setCurrentPage(pageNumber)}
                                                        style={{ display: "flex" }}
                                                    />
                                                </nav>
                                            </div>
                                        </div>

                                        <div class={`review-form-section ${isRating ? 'opened' : ''}`}>
                                            <div class="review-overlay" onClick={handleClickRating}></div>
                                            <div class="review-form-wrapper">
                                                <div class="title-wrapper text-left">
                                                    <h3 class="title title-simple text-left text-normal">Thêm đánh giá</h3>
                                                    <p>Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu *
                                                    </p>
                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="rating-form">
                                                        <label htmlFor="rating" className="text-dark">Số sao của bạn * </label>
                                                        <span className="rating-stars selected">
                                                            {[1, 2, 3, 4, 5].map((value) => (
                                                                <FontAwesomeIcon
                                                                    key={value}
                                                                    icon={faStar}
                                                                    className={`star ${value <= rating ? 'yellow' : ''}`}
                                                                    onClick={() => handleRatingClick(value)}
                                                                />
                                                            ))}
                                                        </span>
                                                    </div>
                                                    <textarea
                                                        id="reply-message"
                                                        cols="30"
                                                        rows="6"
                                                        className="form-control mb-4"
                                                        placeholder="Comment *"
                                                        required
                                                        value={comment}
                                                        onChange={handleCommentChange}
                                                    />
                                                    {
                                                        dataUser ? (<>
                                                            <button
                                                                type="submit"
                                                                style={{
                                                                    padding: "1.22em 2.78em", fontWeight: "700", fontSize: "1.4rem", fontFamily: "Poppins, sans-serif"
                                                                }}
                                                                className="btn btn-primary btn-rounded"
                                                            >
                                                                Gửi<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "5px" }} />
                                                            </button>
                                                        </>) : (<>
                                                            <button
                                                                style={{
                                                                    padding: "1.22em 2.78em", fontWeight: "700", fontSize: "1.4rem", fontFamily: "Poppins, sans-serif"
                                                                }}
                                                                onClick={showModal}
                                                                className="btn btn-primary btn-rounded"
                                                            >
                                                                Gửi<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "5px" }} />
                                                            </button>
                                                        </>)
                                                    }

                                                </form>
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
                                </TabPane>
                            </Tabs>

                        </div>
                        <section class="related-product mt-10">
                            <h2 class="title title-center mb-1 ls-normal">Sản phẩm tương tự</h2>
                            <div class="owl-carousel owl-theme owl-nav-full row cols-2 cols-md-3 cols-lg-4">
                                <ProductsRowContainer draggable='false'>
                                    <ProductSlider
                                        ref={productSimilarSliderRef}
                                        draggable='true'
                                        onDragStart={onDragStart}
                                        onDragEnd={onDragEnd}
                                        onDragEnter={onDragEnter}
                                    >
                                        {
                                            productSimilar.map((items, index) => (
                                                <div class="product text-center" key={index} ref={productSimilarRef} onClick={() => handleClickDetail(items.id)}>
                                                    <figure class="product-media">
                                                        <a style={{ cursor: "pointer" }}>
                                                            <img src={`https://localhost:7285/Images/${items.image[0]}`} alt="product" width="280" height="315" style={{ backgroundColor: "#f5f5f5" }} />
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
                                                            <a href="#" class="btn-product-icon btn-cart" data-toggle="modal" data-target="#addCartModal" title="Add to cart"><FontAwesomeIcon icon={faCartPlus} /></a>

                                                        </div>
                                                        <div class="product-action">
                                                            <a class="btn-product btn-quickview" title="Quick View" style={{ cursor: "pointer" }} onClick={() => handleClickDetail(items.id)}>Chi tiết</a>
                                                        </div>
                                                    </figure>
                                                    <div class="product-details" style={{
                                                        paddingTop: "1.4rem",
                                                        paddingBottom: "2rem"
                                                    }}>
                                                        {/* <div class="product-cat"><a href="demo3-shop.html">Women’s</a>
                                                            </div> */}
                                                        <h3 class="product-name" style={{
                                                            fontFamily: "inherit",
                                                            fontSize: "1.4rem",
                                                            fontWeight: 400,
                                                            letterSpacing: "-0.01em",
                                                            whitespace: "nowrap"
                                                        }}>
                                                            {items.name}
                                                        </h3>
                                                        <div class="product-price" style={{
                                                            fontSize: "1.6rem",
                                                            fontWeight: 600,
                                                            lineHeight: 1.86
                                                        }}>
                                                            <ins class="new-price">{items.promotionPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</ins>
                                                            {
                                                                items.isStatus == 1 ? (<del class="old-price">{items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>) : ""
                                                            }
                                                        </div>
                                                        {/* <div class="ratings-container">
                                                                <div class="ratings-full">
                                                                    <span class="ratings" style={{ width: "60%" }}></span>
                                                                    <span class="tooltiptext tooltip-top"></span>
                                                                </div>
                                                            </div> */}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </ProductSlider>
                                    <div className='btnLeft' onClick={handleScrollProductSimilarLeft}>
                                        <FontAwesomeIcon icon={faAngleLeft} />
                                    </div>
                                    <div className='btnRight' onClick={handleScrollProductSimilarRight}>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </div>
                                </ProductsRowContainer>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductDetailPage

const ProductsRowContainer = styled.div`
    background-color: var(--color-background);
    color: var(--color-white);
    padding: 20px 20px 0;
    position:relative;
    width: 100%;
    height: 100%;
    .btnLeft{
        position:absolute;
        top:30%;
        left:19px;
        z-index:20;
        transform-origin:center;
        current:pointer;
        background-color:rgba(0,0,0,0.5);
        height:100px;
        width:50px;
        border-radius:4px;
        display:flex;
        align-items:center;
        transform:translateY(-20%);
        &:hover svg{
            opacity:1;
            transform:scale(1.2);
        }
        svg {
            opacity:0.7;
            font-size:50px;
            transition:all 0.3s linear;
            color:white;
        }
    }
    .btnRight{
        position:absolute;
        top:30%;
        right:19px;
        z-index:20;
        transform-origin:center;
        current:pointer;
        background-color:rgba(0,0,0,0.5);
        height:100px;
        width:50px;
        border-radius:4px;
        display:flex;
        align-items:center;
        transform:translateY(-20%);
        &:hover svg{
            opacity:1;
            transform:scale(1.2);
        }
        svg {
            opacity:0.7;
            font-size:50px;
            transition:all 0.3s linear;
            color:white;
        }
    }
`;