import React, { useEffect } from 'react'
import { Form, Input, Button, message, Select, Tabs } from 'antd'
import { productCategoryParentServices } from '../../../../services/productCategoryParentService';
const { Option } = Select;
const CategoryParentModal = ({ curData, isStatusModal, getCategoryParent }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (isStatusModal === "Edit") {
            form.setFieldsValue({
                Name: curData?.name ? curData?.name : "",
            })
        } else {
            form.setFieldsValue({
                Name: "",
            })
        }
    }, [curData, form])
    // thêm sản phẩm
    const onFinish = async (values) => {
        if (isStatusModal === "Add") {
            const res = await productCategoryParentServices.create(values)
            if (res) {
                message.success("Thêm hạng mục sản phẩm thành công!")
                await getCategoryParent();
            } else {
                message.error(res.error)
            }
        }
        else {
            const res = await productCategoryParentServices.updateCategoryParent(curData.id, values)
            if (res) {
                await getCategoryParent();
                message.success("Chỉnh sửa hạng mục sản phẩm thành công!")
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
                        class="col-xl-3 col-sm-4 mb-0">Tên Hạng mục:</label>
                    <div class="col-xl-8 col-sm-7">
                        <Form.Item
                            style={{ marginBottom: "4px" }}

                            name="Name"
                            rules={[
                                {
                                    required: true,
                                    message: " Vui long điền đầy đủ thông tin!",
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Nhập tên danh mục" style={{ lineHeight: "2.5", padding: "0.48rem 0.75rem", borderRadius: "0.25rem", fontWeight: "400" }} />
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

export default CategoryParentModal