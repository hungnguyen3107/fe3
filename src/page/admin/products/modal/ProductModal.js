import React, { useState } from 'react';
import { Button, Modal, Tabs, message } from 'antd';
import { productCategoryParentServices } from '../../../../services/productCategoryParentService';
import { categoryServices } from '../../../../services/categoryService';
import { supplierServices } from '../../../../services/supplierService';
import { useProductContext } from '../../../../services/helpers/getDataHelpers';
const ProductModal = () => {
    const { TabPane } = Tabs;
    const { categoryParent, getSupplier, getCategory, getProductCategory } = useProductContext();
    const [dataCategory, setDataCategory] = useState();
    const [dataCategoryParent, setDataCategoryParent] = useState();
    const [dataSupplier, setDataSupplier] = useState();
    const [dataAdress, setDataAdress] = useState();
    const [dataPhone, setDataPhone] = useState();
    const [dataEmail, setDataEmail] = useState();
    const [categoryParentId, setCategoryParentId] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Supplier");
    const handleTabChange = (key) => {
        setActiveTab(key);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (activeTab == "Supplier") {
            const res = supplierServices.create({ "name": dataSupplier, "adress": dataAdress, "dataPhone": dataPhone, "email": dataEmail })
            if (res) {
                setDataSupplier("");
                setDataAdress("");
                setDataPhone("");
                setDataEmail("");
                getSupplier();
                message.success("Thêm nhà cung cấp thành công!")
            } else {
                message.error(res.error)
            }
        } else if (activeTab == "Category") {
            const res = categoryServices.create({ "name": dataCategory, "productCategoryParent_id": categoryParentId })
            if (res) {
                setDataCategory("");
                getCategory();
                message.success("Thêm loại sản phẩm thành công!")
            } else {
                message.error(res.error)
            }
        } else {
            const res = productCategoryParentServices.create({ "name": dataCategoryParent })
            if (res) {
                setDataCategoryParent("");
                getProductCategory();
                message.success("Thêm loại sản phẩm thành công!")
            } else {
                message.error(res.error)
            }
        }
    };
    const handleOk = (event) => {
        //setIsModalOpen(false);
        // event.preventDefault();
        handleSubmit(event)
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm mới
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <Tabs defaultActiveKey={activeTab} centered onChange={handleTabChange}>
                    <TabPane tab="Supplier" key="Supplier" >
                        <form className="infoform" onSubmit={handleSubmit}>
                            <div class="form-group mb-3 row">
                                <label for="validationCustom02"
                                    class="col-xl-2 col-sm-3 mb-0">Tên nhà cung cấp :</label>
                                <div class="col-xl-8 col-sm-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="supplier"
                                        name="supplier"
                                        value={dataSupplier}
                                        onChange={(event) => setDataSupplier(event.target.value)}
                                        placeholder=" nhập tên nhà cung cấp "
                                        required
                                    />
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label for="validationCustom02"
                                    class="col-xl-2 col-sm-3 mb-0">Địa chỉ :</label>
                                <div class="col-xl-8 col-sm-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="adress"
                                        name="adress"
                                        value={dataAdress}
                                        onChange={(event) => setDataAdress(event.target.value)}
                                        placeholder=" nhập địa chỉ "
                                        required
                                    />
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label for="validationCustom02"
                                    class="col-xl-2 col-sm-3 mb-0">Số điện thoại :</label>
                                <div class="col-xl-8 col-sm-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={dataPhone}
                                        onChange={(event) => setDataPhone(event.target.value)}
                                        placeholder="Nhập số điện thoại"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label for="validationCustom02"
                                    class="col-xl-2 col-sm-3 mb-0">Email :</label>
                                <div class="col-xl-8 col-sm-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={dataEmail}
                                        onChange={(event) => setDataEmail(event.target.value)}
                                        placeholder="Nhập Email"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </TabPane>
                    <TabPane tab="Category" key="Category">
                        <div class="form-group mb-3 row">
                            <label for="validationCustom02"
                                class="col-xl-2 col-sm-3 mb-0">Loại sản phẩm :</label>
                            <div class="col-xl-8 col-sm-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    name="category"
                                    value={dataCategory}
                                    onChange={(event) => setDataCategory(event.target.value)}
                                    placeholder="nhập tên loại sản phẩm "
                                    required
                                />
                            </div>
                        </div>
                        <div class="form-group mb-3 row">
                            <label for="validationCustom02"
                                class="col-xl-2 col-sm-3 mb-0">Chọn hạng mục :</label>
                            <div class="col-xl-8 col-sm-7">
                                <select
                                    id="province"
                                    className="form-control"
                                    name="province_id"
                                    required
                                    value={categoryParentId}
                                    onChange={(event) => setCategoryParentId(event.target.value)}
                                >
                                    <option value="">Chọn Hạng mục</option>
                                    {categoryParent.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="CategoryParent" key="CategoryParent">
                        <div class="form-group mb-3 row">
                            <label for="validationCustom02"
                                class="col-xl-2 col-sm-3 mb-0">Hạng mục :</label>
                            <div class="col-xl-8 col-sm-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="categoryParent"
                                    name="categoryParent"
                                    value={dataCategoryParent}
                                    onChange={(event) => setDataCategoryParent(event.target.value)}
                                    placeholder="Nhập hạng mục chứa loại sản phẩm"
                                    required
                                />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    );
};
export default ProductModal