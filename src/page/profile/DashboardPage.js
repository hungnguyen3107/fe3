import React from 'react'
import { Navigate, Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const DashboardPage = () => {
    return (
        <div class="tab-pane active" id="dashboard">
            <p class="mb-0">
                Hello <span>User</span> (not <span>User</span>? <a href="#" class="text-primary">Log
                    out</a>)
            </p>
            <p class="mb-8">
                From your account dashboard you can view your
                <a href="#orders" class="link-to-tab text-primary">recent orders, manage your
                    shipping and
                    billing
                    addresses,<br />and edit your password and account details</a>.
            </p>
            <NavLink to="/" className="btn btn-dark btn-rounded" style={{ fontWeight: "700", fontSize: "1.4rem", fontFamily: "Poppins, sans-serif" }}>Go To Shop<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "5px" }} /></NavLink>
        </div>
    )
}

export default DashboardPage