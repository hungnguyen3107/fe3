import React, { createContext, useState, useContext, useEffect } from 'react';
import { supplierServices } from '../supplierService';
import { categoryServices } from '../categoryService';
import { provinceServices } from '../provinceService';
import { districtServices } from '../districtService';
import { productServices } from '../productService';
import { WardServices } from '../wardService';
import { orderServices } from '../orderService';
import { ratingServices } from '../ratingService';
import { productCategoryParentServices } from '../productCategoryParentService';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);
export const ProductProvider = ({ children }) => {
    const [supplier, setSupplier] = useState([]);
    const [category, setCategory] = useState([]);
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [product, setProduct] = useState([]);
    const [order, setOrder] = useState([]);
    const [dataRating, setDataRating] = useState([]);
    const [productId, setProductId] = useState();
    const [changeCount, setChangeCount] = useState(0);
    const [isChangeStatus, setIsChangeStatus] = useState(2)
    // const [orderId, setOrderId] = useState([]);
    // const [categoryParentId, setCategoryParentId] = useState([]);
    const [categoryParent, setCategoryParent] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const navigate = useNavigate()
    //thay đổi trạng thái 
    const handleChangeStatus = async (id) => {
        if (changeCount < 3) {
            try {
                const res = await orderServices.changeStatus({ id }, { status: isChangeStatus });
                if (res) {
                    setIsChangeStatus((prev) => prev + 1);
                    setChangeCount((prev) => prev + 1);
                }
            } catch (error) {
                console.error("Error:", error);
                // Xử lý lỗi ở đây nếu cần thiết
            }
        }
    };
    //lấy dữ liệu productCategory
    const getProductCategory = async () => {
        try {
            const res = await productCategoryParentServices.get();
            setCategoryParent(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    //lấy dữ liệu đánh giá sao
    const getRating = async () => {
        try {
            const res = await ratingServices.get();
            setDataRating(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    //lấy dữ liệu đơn hàng
    const getOrder = async () => {
        try {
            const res = await orderServices.get();
            setOrder(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    //lấy dữ liệu sản phẩm
    const getProduct = async () => {
        try {
            const res = await productServices.get();
            setProduct(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    const handleOnclickId = async (id) => {
        try {
            const res = await productServices.get({ Id: id });
            setProductId(res.items);
            navigate(`EdirProduct/${id}`)
        } catch (error) {
            console.error(error);
        }
    }
    //xem chi tiết
    const handleClickDetail = async (id) => {
        try {
            const res = await productServices.get({ Id: id });
            setProductId(res.items);
            navigate(`Detail/${id}`)
        } catch (error) {
            console.error(error);
        }
    }
    //xem trang shopPage
    // const handleOnclickCategoryParent = async (id) => {
    //     try {
    //         const res = await productServices.get({ CategoryParent_id: id });
    //         setCategoryParentId(res.items);
    //         navigate(`shop/${id}`)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    //xem chi tiết order
    // const handleClickDetailOrder = async (id) => {
    //     try {
    //         const res = await orderServices.get({ Id: id });
    //         setOrderId(res.items);
    //         navigate(`OrderDetail/${id}`)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    //xóa sản phẩm
    const handleDeleteProduct = async (id) => {
        try {
            const res = await productServices.deleteProduct({ Id: id });
            if (res) {
                getProduct()
            } else {
                message.error('xóa thất bại')
            }
        } catch (error) {
            console.error(error);
        }
    }
    //lấy dữ liệu nhà cung cấp 
    const getSupplier = async () => {
        try {
            const res = await supplierServices.get()
            setSupplier(res.items)
        } catch (error) {
            console.log(error)
        }
    }
    //lấy dữ liệu loại sản phẩm
    const getCategory = async () => {
        try {
            const res = await categoryServices.get()
            setCategory(res.items)
            console.log(category)
        } catch (error) {
            console.log(error)
        }
    }
    //lấy dữ liệu tỉnh
    const getProvince = async () => {
        try {
            const res = await provinceServices.get();
            setProvince(res.items);
        } catch (error) {
            console.log(error)
        }
    }
    //lấy dữ liệu huyện
    const getDistrict = async () => {
        try {
            const res = await districtServices.get();
            setDistrict(res.items);
        } catch (error) {
            console.log(error)
        }
    }
    //lấy dữ liệu xã
    const getWard = async () => {
        try {
            const res = await WardServices.get();
            setWard(res.items);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSupplier();
        getCategory();
        getProvince();
        getDistrict();
        getWard();
        getProduct();
        getOrder();
        getRating();
        getProductCategory();
    }, [isChangeStatus]);
    return (
        <ProductContext.Provider value={{ categoryParent, dataRating, isModalOpen, order, category, supplier, province, district, ward, product, productId, handleOnclickId, getSupplier, getCategory, handleDeleteProduct, handleClickDetail, handleOk, handleCancel, showModal, handleChangeStatus }}>
            {children}
        </ProductContext.Provider>
    );
}