import React, { useEffect, useState } from 'react'
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
import { message, Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LoginPage from '../login/LoginPage';
import icon from "../../images/icon.png"
import { productServices } from '../../services/productService';
import { Modal } from 'antd';
const ProductDetailPage = () => {
    const { TabPane } = Tabs;
    const { isModalOpen, handleOk, handleCancel, showModal } = useProductContext();
    const { isDataCart, setDataCart, dataUser } = useCartContext();
    const [isRating, setIsRating] = useState(false);
    const [productId, setProductId] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [dataRating, setDataRating] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
    const { id } = useParams();
    const handleRatingClick = (value) => {
        setRating(value);
    };
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    // const getProductDetail = async () => {
    //     try {
    //         const res = await productServices.get({
    //             Id: id,
    //             Limit: currentPage,
    //             PageIndex: rowsPerPage,
    //         });
    //         setProductId(res.items);
    //         console.log("productdetail", productId)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const getProductDetail = async () => {
        try {
            const res = await productServices.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
                "Id": id
            });
            if (res) {
                setProductId(res.items);
            }

        } catch (error) {
            console.error(error);
        }
    }
    //lấy dữ liệu đánh giá sao
    const getRating = async () => {
        try {
            const res = await ratingServices.get({ "Product_id": id });
            setDataRating(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const res = ratingServices.create({ "star": rating, "content": comment, "product_id": id, "user_id": dataUser.id })
        if (res) {
            message.success("Cảm ơn bạn đã nhận xét sản phẩm!")
        } else {
            message.error(res.error)
        }
    };
    const handleClickRating = () => {
        setIsRating(!isRating);
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    const increaseQuantity = () => {
        if (quantity < 1000000) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };
    const handleAddToCart = (id) => {
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        const productIndex = products.findIndex(item => item.productId[0].id === id);
        if (productIndex !== -1) {
            const product = products[productIndex];
            console.log(product);
            if (product.productId[0].quantity < product.quantity) {
                message.error(`Cửa hàng chỉ còn lại ${products[0].quantity} sản phẩm`);
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
    useEffect(() => {
        getRating();
        getProductDetail()
    }, [])
    useEffect(() => {
        JSON.parse(sessionStorage.getItem('products'))
    }, [isDataCart])
    return (
        <main class="main mt-6 single-product">
            <div class="page-content mb-10 pb-9">
                <div class="container">
                    <div class="product product-single row mb-8">
                        <div class="col-md-6">
                            <div class="product-gallery">
                                <div class="product-single-carousel owl-carousel owl-theme owl-nav-inner row cols-1">
                                    {
                                        productId.map((items, index) => (
                                            <figure class="product-image">
                                                <img src={`https://localhost:7285/Images/${items.image[0]}`} data-zoom-image="images/demos/demo3/product/product-1-800x900.jpg" alt="Blue Pinafore Denim Dress" width="800" height="900" style={{ backgroundColor: "#f5f5f5" }} />
                                            </figure>
                                        ))
                                    }
                                </div>
                                <div class="product-thumbs-wrap">
                                    <div class="product-thumbs">
                                        <div class="product-thumb active">
                                            <img src="images/demos/demo3/product/product-1-137x154.jpg" alt="product thumbnail" width="137" height="154" style={{ backgroundColor: "#f5f5f5" }} />
                                        </div>
                                        <div class="product-thumb">
                                            <img src="images/demos/demo3/product/product-2-137x154.jpg" alt="product thumbnail" width="137" height="154" style={{ backgroundColor: "#f5f5f5" }} />
                                        </div>
                                        <div class="product-thumb">
                                            <img src="images/demos/demo3/product/product-3-137x154.jpg" alt="product thumbnail" width="137" height="154" style={{ backgroundColor: "#f5f5f5" }} />
                                        </div>
                                        <div class="product-thumb">
                                            <img src="images/demos/demo3/product/product-4-137x154.jpg" alt="product thumbnail" width="137" height="154" style={{ backgroundColor: "#f5f5f5" }} />
                                        </div>
                                        <div class="product-thumb">
                                            <img src="images/demos/demo3/product/product-5-137x154.jpg" alt="product thumbnail" width="137" height="154" style={{ backgroundColor: "#f5f5f5" }} />
                                        </div>
                                        <div class="product-thumb">
                                            <img src="images/demos/demo3/product/product-6-137x154.jpg" alt="product thumbnail" width="137" height="154" style={{ backgroundColor: "#f5f5f5" }} />
                                        </div>
                                    </div>
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
                                                <li><a href="#" class="active">Products</a></li>
                                                <li>Detail</li>
                                            </ul>
                                        </div>
                                        <h1 class="product-name">{items.name}</h1>
                                        <div class="product-meta">
                                            SKU:<span class="product-sku">{items.id}</span>
                                            CATEGORIES:<span class="product-brand">{items.category.name}</span>
                                        </div>
                                        <div class="product-price">{items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                        <div class="ratings-container">
                                            <div class="ratings-full">
                                                <span class="ratings" style={{ width: "80%" }}></span>
                                                <span class="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="#product-tab-reviews" class="link-to-tab rating-reviews">( 6 reviews )</a>
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
                                                <button class="btn-product btn-cart text-normal ls-normal font-weight-semi-bold" onClick={() => handleAddToCart(items.id)}><FontAwesomeIcon style={{ marginRight: "6px" }} icon={faCartPlus} />Add to Cart</button>
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
                                <TabPane tab="Description" key="Description">
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
                                <TabPane tab="Reviews" key="Reviews">
                                    <div class="tab-pane active in" id="product-tab-reviews">
                                        <div class="row">
                                            <div class="col-lg-4 mb-6">
                                                <div class="avg-rating-container">
                                                    <mark>5.0</mark>
                                                    <div class="avg-rating">
                                                        <span class="avg-rating-title">Average Rating</span>
                                                        <div class="ratings-container mb-0">
                                                            <div class="ratings-full">
                                                                <span class="ratings" style={{ width: "100%" }}></span>
                                                                <span class="tooltiptext tooltip-top"></span>
                                                            </div>
                                                            <span class="rating-reviews">(2 Reviews)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ratings-list mb-2">
                                                    <div class="ratings-item">
                                                        <div class="ratings-container mb-0">
                                                            <div class="ratings-full">
                                                                <span class="ratings" style={{ width: "100%" }}></span>
                                                                <span class="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div class="rating-percent">
                                                            <span style={{ width: "100%" }}></span>
                                                        </div>
                                                        <div class="progress-value">100%</div>
                                                    </div>
                                                    <div class="ratings-item">
                                                        <div class="ratings-container mb-0">
                                                            <div class="ratings-full">
                                                                <span class="ratings" style={{ width: "80%" }}></span>
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
                                                    </div>
                                                </div>
                                                <a class="btn btn-dark btn-rounded submit-review-toggle" style={{ padding: "1.22em 2.78em", fontWeight: "700", fontSize: "1.4rem", fontFamily: "Poppins, sans-serif" }} onClick={handleClickRating}>Submit
                                                    Review</a>
                                            </div>
                                            <div class="col-lg-8 comments pt-2 pb-10 border-no">
                                                <nav class="toolbox">
                                                    <div class="toolbox-left">
                                                        <div class="toolbox-item">
                                                            <a href="#" class="btn btn-outline btn-rounded">All Reviews</a>
                                                        </div>
                                                        <div class="toolbox-item">
                                                            <a href="#" class="btn btn-outline btn-rounded">With Images</a>
                                                        </div>
                                                        <div class="toolbox-item">
                                                            <a href="#" class="btn btn-outline btn-rounded">With Videos</a>
                                                        </div>
                                                    </div>
                                                    <div class="toolbox-right">
                                                        <div class="toolbox-item toolbox-sort select-box text-dark">
                                                            <label>Sort By :</label>
                                                            <select name="orderby" class="form-control" fdprocessedid="y6cvg">
                                                                <option value="">Default Order</option>
                                                                <option value="newest" selected="selected">Newest Reviews
                                                                </option>
                                                                <option value="oldest">Oldest Reviews</option>
                                                                <option value="high_rate">Highest Rating</option>
                                                                <option value="low_rate">Lowest Rating</option>
                                                                <option value="most_likely">Most Likely</option>
                                                                <option value="most_unlikely">Most Unlikely</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </nav>
                                                <ul class="comments-list">
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
                                                                            <span class="comment-date">by <span class="font-weight-semi-bold text-uppercase text-dark">{items.user.firstName} {items.user.lastName}</span> on
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
                                                        <li class="page-item page-item-dots"><a class="page-link" href="#">6</a>
                                                        </li>
                                                        <li class="page-item">
                                                            <a class="page-link page-link-next" href="#" aria-label="Next">
                                                                Next <FontAwesomeIcon icon={faArrowRight} />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>

                                        <div class={`review-form-section ${isRating ? 'opened' : ''}`}>
                                            <div class="review-overlay" onClick={handleClickRating}></div>
                                            <div class="review-form-wrapper">
                                                <div class="title-wrapper text-left">
                                                    <h3 class="title title-simple text-left text-normal">Add a Review</h3>
                                                    <p>Your email address will not be published. Required fields are marked *
                                                    </p>
                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="rating-form">
                                                        <label htmlFor="rating" className="text-dark">Your rating * </label>
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
                                                                Submit<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "5px" }} />
                                                            </button>
                                                        </>) : (<>
                                                            <button
                                                                style={{
                                                                    padding: "1.22em 2.78em", fontWeight: "700", fontSize: "1.4rem", fontFamily: "Poppins, sans-serif"
                                                                }}
                                                                onClick={showModal}
                                                                className="btn btn-primary btn-rounded"
                                                            >
                                                                Submit<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "5px" }} />
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
                            {/* <ul class="nav nav-tabs justify-content-center" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" href="#product-tab-description">Description</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#product-tab-additional">Additional information</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#product-tab-shipping-returns">Shipping &amp; Returns</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#product-tab-reviews">Reviews (1)</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active in mb-3" id="product-tab-description">
                                    <div class="row mt-6">
                                        <div class="col-md-6">
                                            <h5 class="description-title mb-4 font-weight-semi-bold ls-m">Features</h5>
                                            <p class="mb-2">
                                                Praesent id enim sit amet.Tdio vulputate eleifend in in tortor.
                                                ellus massa. siti iMassa ristique sit amet condim vel, facilisis
                                                quimequistiqutiqu amet condim Dilisis Facilisis quis sapien. Praesent id
                                                enim sit amet.
                                            </p>
                                            <ul class="mb-8">
                                                <li>Praesent id enim sit amet.Tdio vulputate</li>
                                                <li>Eleifend in in tortor. ellus massa.Dristique sitii</li>
                                                <li>Massa ristique sit amet condim vel</li>
                                                <li>Dilisis Facilisis quis sapien. Praesent id enim sit amet</li>
                                            </ul>
                                            <h5 class="description-title mb-3 font-weight-semi-bold ls-m">Specifications
                                            </h5>
                                            <table class="table">
                                                <tbody>
                                                    <tr>
                                                        <th class="font-weight-semi-bold text-dark pl-0">Material</th>
                                                        <td class="pl-4">Praesent id enim sit amet.Tdio</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="font-weight-semi-bold text-dark pl-0">Claimed Size</th>
                                                        <td class="pl-4">Praesent id enim sit</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="font-weight-semi-bold text-dark pl-0">Recommended Use
                                                        </th>
                                                        <td class="pl-4">Praesent id enim sit amet.Tdio vulputate eleifend
                                                            in in tortor. ellus massa. siti</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="font-weight-semi-bold text-dark border-no pl-0">
                                                            Manufacturer</th>
                                                        <td class="border-no pl-4">Praesent id enim</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="product-tab-additional">
                                    <ul class="list-none">
                                        <li><label>Brands:</label>
                                            <p>Cinderella, SLS</p>
                                        </li>
                                        <li><label>Color:</label>
                                            <p>Black, Blue, Brown, Green</p>
                                        </li>
                                        <li><label>Size:</label>
                                            <p>Ectra Large, Large, Medium, Small</p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="tab-pane " id="product-tab-shipping-returns">
                                    <h6 class="mb-2">Free Shipping</h6>
                                    <p class="mb-0">We deliver to over 100 countries around the world. For full details of
                                        the delivery options we offer, please view our <a href="#" class="text-primary">Delivery
                                            information</a> We hope you’ll love every
                                        purchase, but if you ever need to return an item you can do so within a month of
                                        receipt. For full details of how to make a return, please view our <a href="#" class="text-primary">Returns information</a></p>
                                </div>
                                <div class="tab-pane active in mb-3" id="product-tab-description">
                                    <div class="row mt-6">
                                        <div class="col-md-6">
                                            <h5 class="description-title mb-4 font-weight-semi-bold ls-m">Features</h5>
                                            <p class="mb-2">
                                                Praesent id enim sit amet.Tdio vulputate eleifend in in tortor.
                                                ellus massa. siti iMassa ristique sit amet condim vel, facilisis
                                                quimequistiqutiqu amet condim Dilisis Facilisis quis sapien. Praesent id
                                                enim sit amet.
                                            </p>
                                            <ul class="mb-8">
                                                <li>Praesent id enim sit amet.Tdio vulputate</li>
                                                <li>Eleifend in in tortor. ellus massa.Dristique sitii</li>
                                                <li>Massa ristique sit amet condim vel</li>
                                                <li>Dilisis Facilisis quis sapien. Praesent id enim sit amet</li>
                                            </ul>
                                            <h5 class="description-title mb-3 font-weight-semi-bold ls-m">Specifications
                                            </h5>
                                            <table class="table">
                                                <tbody>
                                                    <tr>
                                                        <th class="font-weight-semi-bold text-dark pl-0">Material</th>
                                                        <td class="pl-4">Praesent id enim sit amet.Tdio</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="font-weight-semi-bold text-dark pl-0">Claimed Size</th>
                                                        <td class="pl-4">Praesent id enim sit</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="font-weight-semi-bold text-dark pl-0">Recommended Use
                                                        </th>
                                                        <td class="pl-4">Praesent id enim sit amet.Tdio vulputate eleifend
                                                            in in tortor. ellus massa. siti</td>
                                                    </tr>
                                                    <tr>
                                                        <th class="font-weight-semi-bold text-dark border-no pl-0">
                                                            Manufacturer</th>
                                                        <td class="border-no pl-4">Praesent id enim</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <section class="related-product mt-10">
                            <h2 class="title title-center mb-1 ls-normal">Related Products</h2>
                            <div class="owl-carousel owl-theme owl-nav-full row cols-2 cols-md-3 cols-lg-4" data-owl-options="{
							'items': 5,
							'nav': false,
							'loop': false,
							'dots': true,
							'margin': 20,
							'responsive': {
								'0': {
									'items': 2
								},
								'768': {
									'items': 3
								},
								'992': {
									'items': 4,
									'dots': false,
									'nav': true
								}
							}
						}">
                                <div class="product text-center">
                                    <figure class="product-media">
                                        <a href="demo3-product.html">
                                            <img src="images/demos/demo3/products/2.jpg" alt="product" width="280" height="315" />
                                        </a>
                                        <div class="product-action-vertical">
                                            <a href="#" class="btn-product-icon btn-cart" data-toggle="modal" data-target="#addCartModal" title="Add to cart"><i class="d-icon-bag"></i></a>
                                            <a href="#" class="btn-product-icon btn-wishlist" title="Add to wishlist"><i class="d-icon-heart"></i></a>
                                        </div>
                                        <div class="product-action">
                                            <a href="#" class="btn-product btn-quickview" title="Quick View">Quick View</a>
                                        </div>
                                    </figure>
                                    <div class="product-details">
                                        <div class="product-cat"><a href="demo3-shop.html">Bags</a></div>
                                        <h3 class="product-name">
                                            <a href="demo3-product.html">Fashional Handbag</a>
                                        </h3>
                                        <div class="product-price">
                                            <span class="price">$83.32</span>
                                        </div>
                                        <div class="ratings-container">
                                            <div class="ratings-full">
                                                <span class="ratings" style={{ width: "20%" }}></span>
                                                <span class="tooltiptext tooltip-top"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="product text-center">
                                    <figure class="product-media">
                                        <a href="demo3-product.html">
                                            <img src="images/demos/demo3/products/4.jpg" alt="product" width="280" height="315" />
                                        </a>
                                        <div class="product-label-group">
                                            <label class="product-label label-new">new</label>
                                        </div>
                                        <div class="product-action-vertical">
                                            <a href="#" class="btn-product-icon btn-cart" data-toggle="modal" data-target="#addCartModal" title="Add to cart"><i class="d-icon-bag"></i></a>
                                            <a href="#" class="btn-product-icon btn-wishlist" title="Add to wishlist"><i class="d-icon-heart"></i></a>
                                        </div>
                                        <div class="product-action">
                                            <a href="#" class="btn-product btn-quickview" title="Quick View">Quick View</a>
                                        </div>
                                    </figure>
                                    <div class="product-details">
                                        <div class="product-cat"><a href="demo3-shop.html">Bags</a></div>
                                        <h3 class="product-name">
                                            <a href="demo3-product.html">A Dress-suit Valise</a>
                                        </h3>
                                        <div class="product-price">
                                            <span class="price">$242.12</span>
                                        </div>
                                        <div class="ratings-container">
                                            <div class="ratings-full">
                                                <span class="ratings" style={{ width: "60%" }}></span>
                                                <span class="tooltiptext tooltip-top"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="product text-center">
                                    <figure class="product-media">
                                        <a href="demo3-product.html">
                                            <img src="images/demos/demo3/products/5.jpg" alt="product" width="280" height="315" />
                                        </a>
                                        <div class="product-label-group">
                                            <label class="product-label label-sale">27% off</label>
                                        </div>
                                        <div class="product-action-vertical">
                                            <a href="#" class="btn-product-icon btn-cart" data-toggle="modal" data-target="#addCartModal" title="Add to cart"><i class="d-icon-bag"></i></a>
                                            <a href="#" class="btn-product-icon btn-wishlist" title="Add to wishlist"><i class="d-icon-heart"></i></a>
                                        </div>
                                        <div class="product-action">
                                            <a href="#" class="btn-product btn-quickview" title="Quick View">Quick View</a>
                                        </div>
                                    </figure>
                                    <div class="product-details">
                                        <div class="product-cat"><a href="demo3-shop.html">Watch</a></div>
                                        <h3 class="product-name">
                                            <a href="demo3-product.html">Fashion Electric Wrist Watch</a>
                                        </h3>
                                        <div class="product-price">
                                            <ins class="new-price">$472.14</ins><del class="old-price">$524.45</del>
                                        </div>
                                        <div class="ratings-container">
                                            <div class="ratings-full">
                                                <span class="ratings" style={{ width: "40%" }}></span>
                                                <span class="tooltiptext tooltip-top"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="product text-center">
                                    <figure class="product-media">
                                        <a href="demo3-product.html">
                                            <img src="images/demos/demo3/products/6.jpg" alt="product" width="280" height="315" />
                                        </a>
                                        <div class="product-action-vertical">
                                            <a href="#" class="btn-product-icon btn-cart" data-toggle="modal" data-target="#addCartModal" title="Add to cart"><i class="d-icon-bag"></i></a>
                                            <a href="#" class="btn-product-icon btn-wishlist" title="Add to wishlist"><i class="d-icon-heart"></i></a>
                                        </div>
                                        <div class="product-action">
                                            <a href="#" class="btn-product btn-quickview" title="Quick View">Quick View</a>
                                        </div>
                                    </figure>
                                    <div class="product-details">
                                        <div class="product-cat"><a href="demo3-shop.html">Women’s</a></div>
                                        <h3 class="product-name">
                                            <a href="demo3-product.html">Fashional Handbag</a>
                                        </h3>
                                        <div class="product-price">
                                            <span class="price">$72.34</span>
                                        </div>
                                        <div class="ratings-container">
                                            <div class="ratings-full">
                                                <span class="ratings" style={{ width: "80%" }}></span>
                                                <span class="tooltiptext to oltip-top"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductDetailPage