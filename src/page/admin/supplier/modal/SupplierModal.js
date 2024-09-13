import React, { useState, useEffect } from 'react'
import { supplierServices } from '../../../../services/supplierService'
import { Form, Input, Button, message } from 'antd'
const SupplierModal = ({ curData, getSupplier, isStatusModal }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (curData) {
            form.setFieldsValue({
                Name: curData?.name ? curData?.name : "",
                Email: curData?.email ? curData?.email : "",
                Adress: curData?.adress ? curData?.adress : "",
                Phone: curData?.phone ? curData?.phone : ""
            })
        }
    }, [curData, form])
    // thêm sản phẩm
    const onFinish = async (values) => {
        if (isStatusModal === "Add") {

            const res = await supplierServices.create(values)
            if (res) {
                message.success("Thêm nhà cung cấp thành công!")
                await getSupplier();
            } else {
                message.error(res.error)
            }
        } else {
            const res = await supplierServices.updateSupplier(curData.id, values)
            if (res) {
                await getSupplier();
                message.success("Chỉnh sửa nhà cung cấp thành công!")
            } else {
                message.error(res.error)
            }
        }

    }
    return (
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
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Tên :</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="Name"
                            rules={[
                                {
                                    required: true,
                                    message: " LastName",
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Name" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                        </Form.Item>
                    </div>
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Email :</label>
                    <div class="col-xl-8 col-sm-7">
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
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Địa chỉ :</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            // label={"Số lượng"}
                            name="Adress"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập địa chỉ",
                                }
                            ]}
                        >
                            <Input type="text" placeholder="text" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                        </Form.Item>
                    </div>
                </div>
                <div class="form-group mb-3 row">
                    <label for="validationCustom02"
                        class="col-xl-3 col-sm-4 mb-0">Số điện thoại :</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="Phone"
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
                <div class="pull-right" style={{ textAlign: "end" }} >
                    <Button type="button" class="btn btn-primary" htmlType="submit" style={{ fontSize: "14px", backgroundColor: "#ff4c3b ", borderColor: "#ff4c3b ", color: "#fff", borderRadius: "5px", fontWeight: "700", letterSpacing: "1px" }}>Save</Button>
                </div>
            </div>
        </Form>
    )
}

export default SupplierModal