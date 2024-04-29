import React, { useEffect, useState } from 'react'
import { Form, Select, Input, Modal, Upload, Button, Tabs, message, Space } from "antd";
import { LockOutlined, MailOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { userServices } from '../../../services/userService';
import { useParams } from 'react-router-dom';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const options = [
    { value: 'Admin', label: 'Admin', emoji: '👑', desc: 'Administrator' },
    { value: 'Nhân viên', label: 'Nhân viên', emoji: '👨‍💼', desc: 'Employee' },
    { value: 'Quản lý', label: 'Quản lý', emoji: '👨‍💻', desc: 'Manager' },
];
const UserPage = () => {
    const [form] = Form.useForm();
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState("");
    const [fileList, setFileList] = useState(null);
    const [dataUserDetail, setDataUserDetail] = useState([])
    const { id } = useParams()
    //hiển thị thông tin người dùng
    const getUserDetail = async () => {
        try {
            const res = await userServices.get({ Id: id });
            setDataUserDetail(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getUserDetail();
        if (dataUserDetail[0]) {
            setSelectedValues(dataUserDetail[0].roles);
        }
    }, [id])
    useEffect(() => {
        // console.log("dataUserDetail:", dataUserDetail[0]);
        if (id && dataUserDetail[0]) {
            const userDetail = dataUserDetail[0];
            form.setFieldsValue({
                LastName: userDetail?.lastName !== null ? userDetail?.lastName : "",
                FirstName: userDetail?.firstName !== null ? userDetail?.firstName : "",
                Email: userDetail?.email !== null ? userDetail?.email : "",
                Password: userDetail?.password !== null ? userDetail?.password : "",
                PhoneNumber: userDetail?.phoneNumber !== null ? userDetail?.phoneNumber : "",
                Role: userDetail?.roles && userDetail.roles.length > 0 ? userDetail.roles : "",
                Image: userDetail?.avatar !== null ? userDetail?.avatar : "",
            });
        }
    }, [dataUserDetail, form]);
    const handleCancel = () => setPreviewOpen(false);
    const handleChangeRole = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setSelectedValues(selectedValues);
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url?.substring(file.url?.lastIndexOf('/') + 1));
    };
    const handleChange = ({ file, fileList }) => {
        const newFileList = file ? [file] : [];

        if (fileList.length === 0) {
            setFileList(null);
            setPreviewImage('');
            setPreviewTitle('');
            setPreviewOpen(false);
        } else {
            setFileList(newFileList.length > 0 ? { ...newFileList[0] } : null);
            setPreviewImage('');
            setPreviewTitle('');
            setPreviewOpen(false);
        }
    };
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
    const onFinish = async (values) => {
        if (id && dataUserDetail[0]) {
            try {
                const formData = new FormData();
                console.log("data", values)
                if (fileList) {
                    const fileObj = fileList.originFileObj;
                    formData.append(`ImageFile`, fileObj);
                    console.log(fileObj)
                }
                formData.append("LastName", values.LastName);
                formData.append("FirstName", values.FirstName);
                formData.append("Email", values.Email);
                formData.append("Password", values.Password);
                formData.append("PhoneNumber", values.PhoneNumber);
                formData.append("Role", values.Role);
                const response = await userServices.updatUser(id, formData);
                if (response) {
                    message.success("chỉnh sửa thành công");
                }
            } catch (error) {
                console.error(error);
                message.error("chỉnh sửa thất bại");
            }
        } else {
            try {
                const formData = new FormData();
                console.log("Data", values)
                if (fileList) {
                    const fileObj = fileList.originFileObj;
                    formData.append(`ImageFile`, fileObj);
                    console.log(fileObj)
                }
                formData.append("LastName", values.LastName);
                formData.append("FirstName", values.FirstName);
                formData.append("Email", values.Email);
                formData.append("Password", values.Password);
                formData.append("PhoneNumber", values.PhoneNumber);
                formData.append("Role", values.Role);
                const response = await userServices.create(formData);
                // console.log(response);
                message.success("Thêm mới thành công");
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
                                <h3>Create User
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
                                <li class="breadcrumb-item">Users </li>
                                <li class="breadcrumb-item active">Create User </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card tab2-card">
                            <div class="card-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row product-adding">

                                                <Form
                                                    layout="vertical"
                                                    form={form}
                                                    initialValues={{
                                                        remember: true,
                                                    }}
                                                    onFinish={onFinish}
                                                >
                                                    <div class="form">
                                                        <div class="form-group mb-3 row">
                                                            <Upload
                                                                //  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                                listType="picture-card"
                                                                fileList={fileList ? [fileList] : []}
                                                                name='ImageFile'
                                                                onPreview={handlePreview}
                                                                onChange={handleChange}
                                                                style={{ textAlign: "center" }}
                                                            >
                                                                {fileList ? null : uploadButton}
                                                            </Upload>
                                                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                            </Modal>
                                                        </div>
                                                        <div class="form-group mb-3 row">
                                                            <label for="validationCustom02"
                                                                class="col-xl-3 col-sm-4 mb-0">Last Name :</label>
                                                            <div class="col-xl-8 col-sm-7">
                                                                {/* <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="LastName"
                                                                    name="LastName"
                                                                    value={formik.values.LastName}
                                                                    onChange={formik.handleChange}
                                                                    placeholder=""
                                                                    required
                                                                /> */}
                                                                <Form.Item
                                                                    style={{ marginBottom: "4px" }}

                                                                    name="LastName"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: " LastName",
                                                                        }
                                                                    ]}
                                                                >
                                                                    <Input type="text" placeholder="LastName" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div class="form-group mb-3 row">
                                                            <label for="validationCustom02"
                                                                class="col-xl-3 col-sm-4 mb-0">First Name :</label>
                                                            <div class="col-xl-8 col-sm-7">
                                                                {/* <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="FirstName"
                                                                    name="First Name"
                                                                    // value={formik.values.Email}
                                                                    // onChange={formik.handleChange}
                                                                    placeholder=""
                                                                    required
                                                                /> */}
                                                                <Form.Item
                                                                    style={{ marginBottom: "4px" }}

                                                                    name="FirstName"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: " FirstName",
                                                                        }
                                                                    ]}
                                                                >
                                                                    <Input type="text" placeholder="FirstName" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div class="form-group mb-3 row">
                                                            <label for="validationCustom02"
                                                                class="col-xl-3 col-sm-4 mb-0">Email :</label>
                                                            <div class="col-xl-8 col-sm-7">
                                                                {/* <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="Email"
                                                                    name="Email"
                                                                    // value={formik.values.Email}
                                                                    // onChange={formik.handleChange}
                                                                    placeholder="Enter your email"
                                                                    required
                                                                /> */}
                                                                <Form.Item
                                                                    style={{ marginBottom: "4px" }}
                                                                    // label={"Số lượng"}
                                                                    name="Email"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Nhập Email",
                                                                        }
                                                                    ]}
                                                                >
                                                                    <Input type="email" placeholder="Email" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                                                                </Form.Item>
                                                            </div>
                                                            <label for="validationCustom02"
                                                                class="col-xl-3 col-sm-4 mb-0">Password :</label>
                                                            <div class="col-xl-8 col-sm-7">
                                                                {/* <input
                                                                    type="password"
                                                                    id="Password"
                                                                    className="form-control"
                                                                    name="Password"
                                                                    // value={formik.values.Password}
                                                                    // onChange={formik.handleChange}
                                                                    placeholder="Password *"
                                                                    required
                                                                /> */}
                                                                <Form.Item
                                                                    style={{ marginBottom: "4px" }}

                                                                    name="Password"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: " Password",
                                                                        }
                                                                    ]}
                                                                >
                                                                    <Input type="password" placeholder="Password" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                                                                </Form.Item>
                                                            </div>
                                                        </div>

                                                        <div class="form-group mb-3 row">
                                                            <label for="validationCustom02"
                                                                class="col-xl-3 col-sm-4 mb-0">Phone Number :</label>
                                                            <div class="col-xl-8 col-sm-7">
                                                                {/* <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="PhoneNumber"
                                                                    name="Phone Number"
                                                                    // value={formik.values.Email}
                                                                    // onChange={formik.handleChange}
                                                                    placeholder=""
                                                                    required
                                                                /> */}
                                                                <Form.Item
                                                                    style={{ marginBottom: "4px" }}

                                                                    name="PhoneNumber"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: " PhoneNumber",
                                                                        }
                                                                    ]}
                                                                >
                                                                    <Input type="number" placeholder="PhoneNumber" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div class="form-group mb-3 row">
                                                            <label for="validationCustom02"
                                                                class="col-xl-3 col-sm-4 mb-0">Quyền :</label>
                                                            <div class="col-xl-8 col-sm-7">
                                                                {/* <select class="form-control digits"
                                                                    id="exampleFormControlSelect1">
                                                                    <option>Admin</option>
                                                                    <option>Nhân viên</option>
                                                                </select> */}
                                                                <Form.Item
                                                                    style={{ marginBottom: "4px" }}
                                                                    name='Role'
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Chọn quyền",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select
                                                                        mode="multiple"
                                                                        style={{ width: '100%' }}
                                                                        placeholder="Chọn vai trò"
                                                                        value={selectedValues}
                                                                        onChange={handleChangeRole}
                                                                        options={options}
                                                                        optionRender={(option) => (
                                                                            <Space>
                                                                                <span role="img" aria-label={option.data.label}>
                                                                                    {option.data.emoji}
                                                                                </span>
                                                                                {option.data.desc}
                                                                            </Space>
                                                                        )}
                                                                    />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div class="pull-right" >
                                                            <Button type="button" class="btn btn-primary" htmlType="submit" style={{ float: "inline-end", fontSize: "14px", backgroundColor: "#ff4c3b ", borderColor: "#ff4c3b ", color: "#fff", borderRadius: "5px", fontWeight: "700", letterSpacing: "1px" }}>Save</Button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserPage