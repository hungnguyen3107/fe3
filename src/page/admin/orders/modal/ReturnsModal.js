import React, { useState, useEffect } from 'react';
import { orderServices } from '../../../../services/orderService';
import { useParams } from 'react-router-dom';
import { Table, Input, message, Button } from 'antd';
import { returnServices } from '../../../../services/returnService';

const ReturnsModal = ({ getDetailOrder }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState([]);
    const [totalReturnPrice, setTotalReturnPrice] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [data, setData] = useState([]);
    const [productId, setProductId] = useState();
    const [salePrice, setSalePrice] = useState({});
    const [availableQuantities, setAvailableQuantities] = useState({});

    const updateData = (key, field, value) => {
        setData(prevData => {
            const newData = [...prevData];
            const itemIndex = newData.findIndex(item => item.product_id === key);
            if (itemIndex > -1) {
                newData[itemIndex] = {
                    ...newData[itemIndex],
                    [field]: value,
                };
                if (field === 'quantity') {
                    newData[itemIndex].price = value * salePrice[key];
                }
            } else {
                newData.push({
                    order_id: id,
                    product_id: key,
                    [field]: value,
                    quantity: field === 'quantity' ? value : 0,
                    reason: field === 'reason' ? value : '',
                    price: field === 'quantity' ? value * salePrice[key] : 0
                });
            }
            return newData;
        });
    };
    console.log("data", data);
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const hasSelected = selectedRowKeys.length > 0;

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleOnclickReturn = async () => {
        try {
            const res = await returnServices.create({ returns: data });
            if (res) {
                getDetailOrder();
                message.success("Trả hàng thành công");
            } else {
                message.error("Trả hàng thất bại");
            }
        } catch (error) {
            message.error("Trả hàng thất bại");
            console.error(error);
        }
    };

    const getOrderReturn = async () => {
        try {
            const res = await orderServices.getId({ Order_id: id });
            if (res) {
                setOrderId(res.items);
                const prices = {};
                const quantities = {};
                res.items.forEach(item => {
                    prices[item.id] = item.orderItem.price;
                    quantities[item.id] = item.orderItem.quantity;
                });
                setSalePrice(prices);
                setAvailableQuantities(quantities);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let returnPrice = 0;
        data.forEach(item => {
            returnPrice += item.price;
        });
        setTotalReturnPrice(returnPrice);
    }, [data, id]);

    useEffect(() => {
        getOrderReturn();
    }, [id]);

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'orderItems',
            render: (orderItems) => (
                <img src={`https://localhost:7285/Images/${orderItems.image[0]}`} alt="product" style={{ width: 50, height: 50 }} />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'orderItems',
            render: (orderItems) => (
                <p>{orderItems.name}</p>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'orderItem',
            render: (_, record) => (
                <Input
                    type="number"
                    value={data.find(item => item.product_id === record.id)?.quantity || ''}
                    onChange={(e) => {
                        const value = Math.min(parseInt(e.target.value, 10) || 0, availableQuantities[record.id]);
                        updateData(record.id, 'quantity', value);
                    }}
                    disabled={!selectedRowKeys.includes(record.id)}
                    min={0}
                    max={availableQuantities[record.id]}
                />
            ),
        },
        {
            title: 'Lý do',
            dataIndex: 'orderItem',
            render: (_, record) => (
                <Input
                    type="text"
                    value={data.find(item => item.product_id === record.id)?.reason || ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        updateData(record.id, 'reason', value);
                    }}
                    disabled={!selectedRowKeys.includes(record.id)}
                />
            ),
        },
        {
            title: 'Giá bán',
            dataIndex: 'orderItem',
            render: (orderItem) => (
                <span>{orderItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            ),
        },
    ];

    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span
                    style={{
                        marginLeft: 8,
                        marginRight: 8
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
                <Button type="button" className="btn btn-primary" htmlType="submit" onClick={handleOnclickReturn} style={{ fontSize: "14px", backgroundColor: "#ff4c3b ", borderColor: "#ff4c3b ", color: "#fff", borderRadius: "5px", fontWeight: "700", letterSpacing: "1px" }}>Trả hàng</Button>
            </div>
            <Table
                rowSelection={rowSelection}
                rowKey="id"
                columns={columns}
                dataSource={orderId}
            />
            <div>
                <h3>Tổng giá trị trả hàng: {totalReturnPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
            </div>
        </div>
    );
};

export default ReturnsModal;
