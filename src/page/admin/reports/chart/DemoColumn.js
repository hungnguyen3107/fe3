import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { orderServices } from '../../../../services/orderService';

const DemoColumn = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const totalRevenueAndProfitByMonth = async () => {
        try {
            const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
            const monthlyData = Array.from({ length: 12 }, (_, i) => ({
                tháng: months[i],
                "Doanh thu trung bình": 0,
                "Lợi nhuận trung bình": 0
            }));

            const res = await orderServices.getReportRevenue({
                "Limit": rowsPerPage,
                "PageIndex": currentPage
            });

            console.log('API response:', res);

            if (res && res.items) {
                res.items.forEach(item => {
                    const month = new Date(item.order.createdAt).getMonth();
                    const orderRevenue = item.order.price;
                    let ordertotal = 0;
                    let orderProfit = 0;
                    if (item.orderItem && typeof item.orderItem.quantity === 'number') {
                        const orderQuantity = item.orderItem.quantity;
                        const orderInportPrice = item.orderItems.inportPrice;
                        orderProfit += (orderRevenue - orderInportPrice) * orderQuantity;
                        ordertotal += orderRevenue * orderQuantity;
                    } else {
                        console.warn('Invalid orderItem:', item.orderItem);
                    }
                    monthlyData[month]["Doanh thu trung bình"] += ordertotal;
                    monthlyData[month]["Lợi nhuận trung bình"] += orderProfit;
                });
            }

            setMonthlyData(monthlyData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const mapMonthlyData = (monthlyData) => {
        const mappedData = [];
        monthlyData.forEach((item, index) => {
            mappedData.push({
                tháng: item.tháng,
                type: "Doanh thu trung bình",
                value: item["Doanh thu trung bình"]
            });
            mappedData.push({
                tháng: item.tháng,
                type: "Lợi nhuận trung bình",
                value: item["Lợi nhuận trung bình"]
            });
        });
        return mappedData;
    };

    useEffect(() => {
        totalRevenueAndProfitByMonth();
    }, [currentPage, rowsPerPage]);

    const data = mapMonthlyData(monthlyData);
    console.log('Mapped data:', data);

    const config = {
        data,
        xField: 'tháng',
        yField: 'value',
        colorField: 'type',
        group: true,

        style: {
            // Padding inside the rectangle
            inset: 0,
        },
    };

    return <Column {...config} />;
};

export default DemoColumn;