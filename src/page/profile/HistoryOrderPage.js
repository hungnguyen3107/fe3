import React, { useEffect, useState } from 'react'
import { orderServices } from '../../services/orderService';
import { useCartContext } from '../../services/helpers/getDataCartHelper';
const HistoryOrderPage = () => {
    const [historyOrder, setHistoryOrder] = useState([])
    const { dataUser } = useCartContext();
    //lấy dữ liệu đơn hàng của từng người dùng
    const getHistoryOrder = async () => {
        try {
            const res = await orderServices.get({ "User_id": dataUser.id });
            setHistoryOrder(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    //load dữ liệu
    useEffect(() => {
        getHistoryOrder();
    }, [])
    return (
        <div >
            <table className="order-table" style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.4rem" }}>
                <thead>
                    <tr>
                        <th className="pl-2">Order</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th className="pr-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        historyOrder.map((items, index) => (
                            <tr key={index}>
                                <td className="order-number"><a href="#">{index + 1}</a></td>
                                <td className="order-date"><span>February 24, 2021</span></td>
                                {items.order.status === 1 ? (
                                    <td class="order-success" >
                                        <span>Chờ xác nhận</span>
                                    </td>
                                ) : items.order.status === 2 ? (
                                    <td class="order-success" >
                                        <span>Đang vận chuyển</span>
                                    </td>
                                ) : (
                                    <td class="order-success">
                                        <span>Hoàn thành</span>
                                    </td>
                                )}

                                <td className="order-total"><span>{items.order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></td>
                                <td className="order-action"><a href="#" className="btn btn-primary btn-link btn-underline">View</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default HistoryOrderPage