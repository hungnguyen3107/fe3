import React from 'react'
import { useCartContext } from '../../../services/helpers/getDataCartHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
const ProfileAdminPage = () => {
    const { dataUser } = useCartContext()
    return (
        <div className="page-body">
            <div className="container-fluid">
                <div className="page-header1">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="page-header-left">
                                <h3>Profile
                                    <small>Multikart Admin panel</small>
                                </h3>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ol className="breadcrumb pull-right">
                                <li className="breadcrumb-item">
                                    <a href="index.html">
                                        <i data-feather="home"></i>
                                    </a>
                                </li>
                                <li className="breadcrumb-item">Settings</li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card">
                            <div className="card-body" style={{ fontSize: "14px" }}>
                                <div className="profile-details text-center">
                                    <img src={`https://192.168.243.125:7285/Images/${dataUser.avatar}`} alt=""
                                        className="img-fluid img-90 rounded-circle blur-up lazyloaded" />
                                    <h5 className="f-w-600 mb-0">{dataUser.firstName} {dataUser.lastName}</h5>
                                    <span>{dataUser.email}</span>
                                    <div className="social">
                                        <div className="form-group btn-showcase">
                                            <button className="btn social-btn btn-fb d-inline-block"> <FontAwesomeIcon icon={faFacebookF} /></button>
                                            <button className="btn social-btn btn-twitter d-inline-block"><FontAwesomeIcon icon={faGoogle} style={{ height: "17px" }} /></button>
                                            <button className="btn social-btn btn-google d-inline-block me-0"><FontAwesomeIcon icon={faTwitter} style={{ height: "17px" }} /></button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card tab2-card">
                            <div className="card-body" style={{ fontSize: "14px" }}>
                                <ul className="nav nav-tabs nav-material" id="top-tab" role="tablist">
                                    <li className="nav-item"><a className="nav-link active" id="top-profile-tab"
                                        data-bs-toggle="tab" href="#top-profile" role="tab"
                                        aria-controls="top-profile" aria-selected="true"><i data-feather="user"
                                            className="me-2"></i>Profile</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="top-tabContent">
                                    <div className="tab-pane fade show active" id="top-profile" role="tabpanel"
                                        aria-labelledby="top-profile-tab">
                                        <h5 className="f-w-600">Profile</h5>
                                        <div className="table-responsive profile-table">
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <td>First Name:</td>
                                                        <td>{dataUser.firstName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Last Name:</td>
                                                        <td>{dataUser.lastName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email:</td>
                                                        <td>{dataUser.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gender:</td>
                                                        <td>Male</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mobile Number:</td>
                                                        <td>{dataUser.phoneNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>DOB:</td>
                                                        <td>Dec, 15 1993</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Roles:</td>
                                                        <td>{dataUser.roles}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileAdminPage