import React, { useEffect } from 'react'
import { Form, Input, Button, message, Select, Tabs } from 'antd'
import { categoryServices } from '../../../../services/categoryService';
const CategoryModal = ({ isStatusModal, CategoryParent_id, getCategory, curData }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (curData) {
            form.setFieldsValue({
                Name: curData?.name ? curData?.name : "",
            })
        }
    }, [curData, form])
    // thêm sản phẩm
    const onFinish = (values) => {
        var dataSubmit = {
            ...values,
            "productCategoryParent_id": CategoryParent_id
        }
        if (isStatusModal === "Add") {

            const res = categoryServices.create(dataSubmit)
            if (res) {
                message.success("Thêm loại sản phẩm thành công!")
                getCategory();
            } else {
                message.error(res.error)
            }
        } else {
            const res = categoryServices.updateCategory(curData.id, dataSubmit)
            if (res) {
                getCategory();
                message.success("Chỉnh sửa loại sản phẩm thành công!")
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
                        class="col-xl-3 col-sm-4 mb-0">Tên loại sản phẩm:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="Name"
                            rules={[
                                {
                                    required: true,
                                    message: " Vui lòng điền đầy đủ thông tin!",
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Nhập tên loại sản phẩm" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
                        </Form.Item>
                    </div>
                </div>
                <div class="pull-right" style={{ textAlign: "end" }} >
                    <Button type="button" class="btn btn-primary" htmlType="submit" style={{ fontSize: "14px", backgroundColor: "#ff4c3b ", borderColor: "#ff4c3b ", color: "#fff", borderRadius: "5px", fontWeight: "700", letterSpacing: "1px" }}>Lưu</Button>
                </div>
            </div>

        </Form>
    )
}

export default CategoryModal