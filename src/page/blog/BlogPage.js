import React, { useEffect, useState } from 'react'
import { fetchAllBlog } from '../../services/blogService';
import { List } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useProductContext } from '../../services/helpers/getDataHelpers';
const BlogPage = () => {
    const [dataBlog, setDataBlog] = useState([]);
    const { handleClickBlog } = useProductContext();
    console.log("blog", dataBlog)
    const getBlog = async () => {
        try {
            let res = await fetchAllBlog();
            setDataBlog(res.data);
        } catch (error) {
            console.error("Error fetching law data:", error);
        }
    }
    useEffect(() => {
        getBlog();
    }, [])
    return (
        <main class="main">
            <nav class="breadcrumb-nav">
                <div class="container">
                    <ul class="breadcrumb">
                        <li><a href="demo1.html"><i class="d-icon-home"></i></a></li>
                        <li><a href="#" class="active">Blog</a></li>
                        <li>Listing</li>
                    </ul>
                </div>
            </nav>
            <div class="page-content with-sidebar">
                <div class="container">
                    <div class="row gutter-lg">
                        <div class="col-lg-9">
                            <div class="posts">
                                <List
                                    pagination={{
                                        onChange: (page) => {
                                            console.log(page);
                                        },
                                        pageSize: 6,
                                    }}
                                    dataSource={dataBlog.slice(4)}
                                    renderItem={(items) => (
                                        <article class="post post-list mb-4" >
                                            <figure class="post-media overlay-zoom">
                                                <a href="post-single.html">
                                                    <img src={items.image_url} style={{ width: "335px", height: "250px", float: "right" }} alt="post" />
                                                </a>
                                            </figure>
                                            <div class="post-details">
                                                <h4 class="post-title" style={{ fontSize: "1.8rem", fontWeight: "700", fontFamily: "Poppins, sans-serif", letterSpacing: 0, lineHeight: 1.2, textTransform: "uppercase" }}>{items.title}
                                                </h4>
                                                <p class="post-content" style={{ fontSize: "1.4rem", fontWeight: "400", fontFamily: "Poppins, sans-serif", margin: "0 0 2rem" }}>
                                                    {items.content}
                                                </p>
                                                <a className="btn btn-link btn-underline " style={{ textDecoration: "none", fontSize: "1.4rem", fontWeight: "700", fontFamily: "Poppins, sans-serif", color: "#26c" }} onClick={() => handleClickBlog(items.title)}>Read
                                                    more<FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faArrowRight} /></a>
                                            </div>
                                        </article>
                                    )}
                                />

                            </div>
                        </div>
                        <div class="col-lg-3  ">
                            <div class="">
                                <div class="" data-sticky-options="{'top': 89, 'bottom': 70}">
                                    <div class="widget widget-search border-no mb-2">
                                        <form action="#" class="input-wrapper input-wrapper-inline btn-absolute">
                                            <input type="text" class="form-control" name="search" autocomplete="off" placeholder="Search in Blog" required />
                                            <button class="btn btn-search btn-link" type="submit">
                                                <i class="d-icon-search"></i>
                                            </button>
                                        </form>
                                    </div>
                                    <div class="widget widget-collapsible">
                                        <h3 class="widget-title">Popular Posts</h3>
                                        <div class="widget-body">
                                            <div class="post-col">
                                                {
                                                    dataBlog.slice(0, 4).map((items, index) => (
                                                        <div class="post post-list-sm" key={index}>
                                                            <figure class="post-media">
                                                                <a href="post-single.html">
                                                                    <img src={items.image_url} width="90" height="90" alt="post" />
                                                                </a>
                                                            </figure>
                                                            <div class="post-details">
                                                                <h4 class="post-title"><a onClick={() => handleClickBlog(items.title)}>{items.title}</a></h4>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div class="widget widget-collapsible">
                                        <h3 class="widget-title">About us</h3>
                                        <div class="widget-body">
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                                nonummy nibh euismod tincidunt.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BlogPage