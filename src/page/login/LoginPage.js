import React, { useEffect, useState } from 'react'
import { Tabs, message } from 'antd';
import { useFormik } from "formik";
import * as Yup from "yup";
import { userServices } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const { TabPane } = Tabs;
    const [activeTab, setActiveTab] = useState("signin");
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const handleTabChange = (key) => {
        setActiveTab(key);
    };
    const formik = useFormik({
        initialValues: {
            Email: "",
            Password: "",
        },
        validationSchema: activeTab === "register" ?
            Yup.object({
                Email: Yup.string()
                    .required("Required")
                    .matches(
                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        "Please enter a valid email address"
                    ),
                Password: Yup.string()
                    .required("Required")
                    .matches(
                        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                        "Password must be 7-19 characters and contain at least one letter, one number and a special character"
                    )
            }) : undefined,
        onSubmit: async (values) => {
            if (activeTab == "register") {
                try {
                    const formData = new FormData();
                    formData.append("Email", values.Email);
                    formData.append("Password", values.Password);
                    formData.append("Role", values.Role = "customer");
                    await userServices.create(formData);
                    message.success("Thêm mới thành công");
                    document.getElementById('signin').click();
                    console.log(formData);
                } catch (error) {
                    console.error(error);
                    message.error("thêm mới thất bại");
                }
            } else {
                try {
                    const res = await userServices.login(values)
                    if (res) {
                        console.log(res.id)
                        sessionStorage.setItem("roles", JSON.stringify(res.roles));
                        sessionStorage.setItem("user", JSON.stringify(res))
                        sessionStorage.setItem("token", res.token)
                        message.success("Đăng nhập thành công")
                        setIsLogin(true)
                        navigate("/");
                        window.location.reload();
                    } else {
                        message.error(res.message)
                    }
                } catch (err) {
                    console.log(err);
                    message.error("Đăng nhập thất bại")
                }
            }

        },
    });
    return (
        <Tabs defaultActiveKey={activeTab} centered onChange={handleTabChange}>
            <TabPane tab="Login" key="signin">
                <form className="infoform" onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="Email"
                            name="Email"
                            value={formik.values.Email}
                            onChange={formik.handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            id="Password"
                            className="form-control"
                            name="Password"
                            value={formik.values.Password}
                            onChange={formik.handleChange}
                            placeholder="Password *"
                            required
                        />
                    </div>
                    <div className="form-footer">
                        <div className="form-checkbox">
                            <input type="checkbox" className="custom-checkbox" id="signin-remember" name="signin-remember" />
                            <label className="form-control-label" htmlFor="signin-remember">Remember me</label>
                        </div>
                        <a href="#" className="lost-link">Lost your password?</a>
                    </div>
                    <button className="btn btn-dark btn-block btn-rounded" type="submit">Login</button>
                </form>
                <div className="form-choice text-center">
                    <label className="ls-m">or Login With</label>
                    <div className="social-links">
                        <a href="#" title=" social-link" className="social-link social-google fab fa-google border-no"></a>
                        <a href="#" title=" social-link" className="social-link social-facebook fab fa-facebook-f border-no"></a>
                        <a href="#" title=" social-link" className="social-link social-twitter fab fa-twitter border-no"></a>
                    </div>
                </div>
            </TabPane>
            <TabPane tab="Register" key="register">

                <form className="infoform" onSubmit={formik.handleSubmit}>

                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="Email"
                            name="Email"
                            value={formik.values.Email}
                            onChange={formik.handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    {formik.errors.Email && (
                        <p className="errorMsg"> {formik.errors.Email} </p>
                    )}
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            id="Password"
                            className="form-control"
                            name="Password"
                            value={formik.values.Password}
                            onChange={formik.handleChange}
                            placeholder="Ví dụ:Abc123!"
                            required
                        />
                    </div>
                    {formik.errors.Password && (
                        <p className="errorMsg"> {formik.errors.Password} </p>
                    )}

                    <button className="btn btn-dark btn-block btn-rounded" type="submit"> Register </button>
                </form>
                <div className="form-choice text-center">
                    <label className="ls-m">or Register With</label>
                    <div className="social-links">
                        <a href="#" title=" social-link" className="social-link social-google fab fa-google border-no"></a>
                        <a href="#" title=" social-link" className="social-link social-facebook fab fa-facebook-f border-no"></a>
                        <a href="#" title=" social-link" className="social-link social-twitter fab fa-twitter border-no"></a>
                    </div>
                </div>
            </TabPane>
        </Tabs>
    )
}

export default LoginPage