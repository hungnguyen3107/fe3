import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Select, Input, Checkbox, Upload, Image, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useProductContext } from '../../../services/helpers/getDataHelpers';
import { productServices } from '../../../services/productService';
import ProductModal from './modal/ProductModal';
import { useParams } from 'react-router-dom';
const { Option } = Select;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const AddProductPage = () => {
    const [form] = Form.useForm();
    const { id } = useParams()
    const [descriptionCkData, setDescriptionCkData] = useState('');
    const [isStatus, setIsStatus] = useState(1);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const { supplier, category, getProduct } = useProductContext();
    const [dataProductDetail, setDataProductDetail] = useState([0]);
    const [fileList, setFileList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerpage] = useState(8);
    //lấy dữ liệu của một sản phẩm 
    const getDataProductDetail = async () => {
        try {
            const res = await productServices.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
                "Id": id
            });
            setDataProductDetail(res.items);

        } catch (error) {
            console.error(error);
        }
    }
    //lấy dữ liệu trạng thái khi click
    const handleCheckboxChange = (value) => {
        setIsStatus(value);
        console.log("isStatus", isStatus);
    };
    console.log(isStatus)
    //hiển thị hình ảnh
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    //lấy file
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setDescriptionCkData(data);
    };
    //hiện thị dữ liệu hình ảnh
    useEffect(() => {
        if (id && dataProductDetail.length > 0 && dataProductDetail[0].image) {
            const newFileList = dataProductDetail[0].image.map((imageName, index) => {
                const imageUrl = `https://localhost:7285/Images/${imageName}`;
                return {
                    uid: `${index + 1}`, // Một giá trị unique identifier cho mỗi ảnh
                    name: imageName, // Tên của ảnh, lấy trực tiếp từ mảng ảnh
                    status: 'done', // Trạng thái của ảnh, ở đây ta đặt là 'done' vì ảnh đã được tải lên thành công
                    url: imageUrl, // Đường dẫn đến ảnh
                };
            });
            setFileList(newFileList);
        }
    }, [id, dataProductDetail]);
    useEffect(() => {
        getDataProductDetail();

    }, [id]);
    //hiện thị dữ liệu một sản phẩm lên form
    useEffect(() => {
        console.log("dataProductDetail:", dataProductDetail[0]);
        if (id && dataProductDetail && dataProductDetail.length > 0) {
            const productDetail = dataProductDetail[0];
            form.setFieldsValue({
                Name: productDetail?.name !== null ? productDetail?.name : "",
                Price: productDetail?.price !== null ? productDetail?.price : "",
                PromotionPrice: productDetail?.promotionPrice !== null ? productDetail?.promotionPrice : "",
                Description: productDetail?.description !== null ? productDetail?.description : "",
                IsStatus: productDetail?.isStatus !== null ? productDetail?.isStatus : "",
                Quantity: productDetail?.quantity !== null ? productDetail?.quantity : "",
                Image: productDetail?.image !== null ? productDetail?.image : "",
                'Category.Id': productDetail?.category?.id !== null ? productDetail?.category?.id : "",
                'Supplier.Id': productDetail?.supplier?.id !== null ? productDetail?.supplier?.id : ""
            });
        } else {
            form.setFieldsValue({
                Name: "",
                Price: undefined,
                PromotionPrice: undefined,
                Description: undefined,
                IsStatus: undefined,
                Quantity: undefined,
                'Category.Id': undefined,
                'Supplier.Id': undefined
            });
        }
    }, [dataProductDetail, form]);
    //hàm gửi dữ liệu đi
    const onFinish = async (values) => {
        if (id && dataProductDetail && dataProductDetail.length > 0) {
            try {
                const formData = new FormData();
                console.log("data", values, isStatus)
                if (fileList && fileList.length > 0) {
                    fileList.forEach(file => {
                        const fileObj = file.originFileObj;
                        formData.append('ImageFiles', fileObj);
                    });
                } else {
                    // Sử dụng ảnh cũ nếu không có ảnh mới và dataProductDetail không null và có ít nhất một phần tử
                    if (dataProductDetail[0] && dataProductDetail[0].image) {
                        formData.append('ImageFiles', dataProductDetail[0].image);
                    }
                }
                formData.append("Name", values.Name);
                formData.append("Price", values.Price);
                formData.append("PromotionPrice", values.PromotionPrice);
                formData.append("Quantity", values.Quantity);
                formData.append("IsStatus", isStatus);
                formData.append("Category.Id", values["Category.Id"]);
                formData.append("Supplier.Id", values["Supplier.Id"]);
                formData.append("Description", descriptionCkData);
                const response = await productServices.updateProduct(id, formData);
                if (response) {
                    getProduct();
                    message.success("Chỉnh sửa thành thông");
                }
            } catch (error) {
                console.error(error);
                message.error("Chỉnh sửa thất bại");
            }
        } else {
            try {
                const formData = new FormData();
                // console.log(values)
                if (fileList) {
                    fileList.forEach(file => {
                        const fileObj = file.originFileObj;
                        formData.append(`ImageFiles`, fileObj);
                        console.log(fileObj);
                    });
                }
                formData.append("Name", values.Name);
                formData.append("Price", values.Price);
                formData.append("PromotionPrice", values.PromotionPrice);
                formData.append("Quantity", values.Quantity);
                formData.append("IsStatus", isStatus);
                formData.append("Category.Id", values["Category.Id"]);
                formData.append("Supplier.Id", values["Supplier.Id"]);
                formData.append("Description", descriptionCkData);
                const response = await productServices.create(formData);
                if (response) {
                    getProduct();
                    message.success("Thêm mới thành công");
                }
                form.resetFields();
                setFileList([]);
            } catch (error) {
                console.error(error);
                message.error("thêm mới thất bại");
            }
        }
    }

    return (
        <div class="page-body">
            <div class="container-fluid">
                <div class="page-header1">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="page-header-left">
                                <h3> {id ? "Edit Products" : "Add Products"}
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
                                <li class="breadcrumb-item active">{id ? "Edit Products" : "Add Products"}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <div class="row product-adding">
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-header">
                                    <h5>General</h5>
                                </div>
                                <div class="card-body">
                                    <div class="digital-add needs-validation">
                                        <Form.Item
                                            style={{ marginBottom: "4px" }}
                                            label={"Tên sản phẩm"}
                                            name="Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Nhập tên sản phẩm",
                                                }
                                            ]}
                                        >
                                            <Input type="text" placeholder="Nhập tên sản phẩm" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                                        </Form.Item>
                                        <div class="form-group">
                                            <Form.Item
                                                style={{ marginBottom: "4px" }}
                                                label={"Số lượng"}
                                                name="Quantity"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Nhập số lượng sản phẩm",
                                                    }
                                                ]}
                                            >
                                                <Input type="number" placeholder="Nhập số lượng sản phẩm" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                                            </Form.Item>
                                        </div>
                                        <div class="form-group">
                                            <Form.Item
                                                style={{ marginBottom: "4px" }}
                                                label={"Giá sản phẩm"}
                                                name="Price"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Nhập giá sản phẩm",
                                                    }
                                                ]}
                                            >
                                                <Input type="number" placeholder="Nhập giá sản phẩm" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                                            </Form.Item>
                                        </div>
                                        <div class="form-group">
                                            <Form.Item
                                                style={{ marginBottom: "4px" }}
                                                label={"Giá khuyến mãi"}
                                                name="PromotionPrice"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Nhập giá khuyến mãi",
                                                    }
                                                ]}
                                            >
                                                <Input type="number" placeholder="Nhập giá khuyến mãi" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                                            </Form.Item>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label"><span>*</span> Status</label>
                                            <div class="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                <Form.Item name="IsStatus"  >
                                                    <Select
                                                        defaultValue={isStatus}
                                                        style={{ width: 120 }}
                                                        onChange={handleCheckboxChange}
                                                        options={[
                                                            { value: 1, label: 'Giảm giá' },
                                                            { value: 2, label: 'Không giảm giá' },
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <label class="col-form-label pt-0"> Product Upload</label>
                                        <Upload
                                            // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                        >
                                            {fileList.length >= 8 ? null : uploadButton}
                                        </Upload>
                                        {previewImage && (
                                            <Image
                                                wrapperStyle={{
                                                    display: 'none',
                                                }}
                                                preview={{
                                                    visible: previewOpen,
                                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                                }}
                                                src={previewImage}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-header">
                                    <h5>{id ? "Edit Description" : "Add Description"}</h5>
                                </div>
                                <div class="card-body">
                                    <div class="digital-add needs-validation">
                                        <div class="form-group mb-0">
                                            <div class="description-sm">
                                                <Form.Item
                                                    style={{ marginBottom: "4px" }}
                                                    name="Description"
                                                    initialValue={descriptionCkData}
                                                >
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={id ? dataProductDetail[0].description : descriptionCkData}
                                                        config={{
                                                            allowedContent: true,
                                                        }}
                                                        onReady={(editor) => {
                                                            editor.editing.view.change((writer) => {
                                                                writer.setStyle(
                                                                    "height",
                                                                    "200px",
                                                                    editor.editing.view.document.getRoot()
                                                                );
                                                            });
                                                        }}
                                                        onChange={handleEditorChange}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header">
                                    <h5>Meta Data</h5>
                                    <ProductModal />
                                </div>
                                <div class="card-body">
                                    <div class="digital-add needs-validation">
                                        <div class="form-group">
                                            <Form.Item
                                                style={{ marginBottom: "4px" }}
                                                label={"Nhà cung cấp"}
                                                name='Supplier.Id'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Chọn nhà cung cung cấp ",
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    allowClear
                                                    showSearch
                                                    placeholder="Chọn nhà cung cấp "
                                                    filterOption={(input, option) =>
                                                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                                        0
                                                    }

                                                >
                                                    {supplier.map((item) => (
                                                        <Option key={item.id} value={item.id}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div class="form-group">
                                            <Form.Item
                                                style={{ marginBottom: "4px" }}
                                                label={"Loại sản phẩm"}
                                                name='Category.Id'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Chọn loại sản phẩm",
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    allowClear
                                                    showSearch
                                                    placeholder="Chọn loại sản phẩm "
                                                    filterOption={(input, option) =>
                                                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                                        0
                                                    }

                                                >
                                                    {category.map((item) => (
                                                        <Option key={item.id} value={item.id}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div class="form-group mb-0">
                                            <div class="product-buttons">
                                                <Button type="button" class="btn btn-primary" htmlType="submit">Add</Button>
                                                <button type="button" class="btn btn-light">Discard</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AddProductPage