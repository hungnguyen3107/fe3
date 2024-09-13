import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';
import { orderServices } from '../../../../services/orderService';

const DemoLine = ({ year }) => {
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    console.log(monthlyRevenue);

    const totalRevenueByMonth = async () => {
        try {
            const monthlyTotal = Array(12).fill(0);
            const res = await orderServices.get({
                "Limit": currentPage,
                "PageIndex": rowsPerPage,
                "Year": year
            });
            res.items.forEach(item => {
                const month = new Date(item.order.createdAt).getMonth();
                monthlyTotal[month] += item.order.price;
            });

            const totalRev = monthlyTotal.reduce((acc, total) => acc + total, 0);
            setMonthlyRevenue([...monthlyTotal]);
            setTotalRevenue(totalRev);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        totalRevenueByMonth();
    }, [year]);

    const data = monthlyRevenue.map((item, index) => ({ tháng: `${index + 1}`, value: item }));

    const config = {
        data,
        xField: 'tháng',
        yField: 'value',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },
    };

    return <Line {...config} />;
};

export default DemoLine;
