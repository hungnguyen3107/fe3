import React from 'react'

const HistoryOrderPage = () => {
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
                    <tr>
                        <td className="order-number"><a href="#">#3596</a></td>
                        <td className="order-date"><span>February 24, 2021</span></td>
                        <td className="order-status"><span>On hold</span></td>
                        <td className="order-total"><span>$900.00 for 5 items</span></td>
                        <td className="order-action"><a href="#" className="btn btn-primary btn-link btn-underline">View</a></td>
                    </tr>
                    <tr>
                        <td className="order-number"><a href="#">#3593</a></td>
                        <td className="order-date"><span>February 21, 2021</span></td>
                        <td className="order-status"><span>On hold</span></td>
                        <td className="order-total"><span>$290.00 for 2 items</span></td>
                        <td className="order-action"><a href="#" className="btn btn-primary btn-link btn-underline">View</a></td>
                    </tr>
                    <tr>
                        <td className="order-number"><a href="#">#2547</a></td>
                        <td className="order-date"><span>January 4, 2021</span></td>
                        <td className="order-status"><span>On hold</span></td>
                        <td className="order-total"><span>$480.00 for 8 items</span></td>
                        <td className="order-action"><a href="#" className="btn btn-primary btn-link btn-underline">View</a></td>
                    </tr>
                    <tr>
                        <td className="order-number"><a href="#">#2549</a></td>
                        <td className="order-date"><span>January 19, 2021</span></td>
                        <td className="order-status"><span>On hold</span></td>
                        <td className="order-total"><span>$680.00 for 5 items</span></td>
                        <td className="order-action"><a href="#" className="btn btn-primary btn-link btn-underline">View</a></td>
                    </tr>
                    <tr>
                        <td className="order-number"><a href="#">#4523</a></td>
                        <td className="order-date"><span>Jun 6, 2021</span></td>
                        <td className="order-status"><span>On hold</span></td>
                        <td className="order-total"><span>$564.00 for 3 items</span></td>
                        <td className="order-action"><a href="#" className="btn btn-primary btn-link btn-underline">View</a></td>
                    </tr>
                    <tr>
                        <td className="order-number"><a href="#">#4526</a></td>
                        <td className="order-date"><span>Jun 19, 2021</span></td>
                        <td className="order-status"><span>On hold</span></td>
                        <td className="order-total"><span>$123.00 for 8 items</span></td>
                        <td className="order-action"><a href="#" className="btn btn-primary btn-link btn-underline">View</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default HistoryOrderPage