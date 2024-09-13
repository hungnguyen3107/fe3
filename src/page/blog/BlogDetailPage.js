import React, { useState, useEffect } from 'react'
import { useProductContext } from '../../services/helpers/getDataHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchAllBlog } from '../../services/blogService';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { Alert, Spin, Switch } from 'antd';
const BlogDetailPage = () => {
  const { dataBlodDetail } = useProductContext();
  const [dataBlog, setDataBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handleClickBlog } = useProductContext();
  const getBlog = async () => {
    try {
      let res = await fetchAllBlog();
      setDataBlog(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching law data:", error);
    }
  }
  useEffect(() => {
    getBlog();
  }, [])
  console.log("detail", dataBlodDetail);
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
          <Spin spinning={loading}>
            <div class="row gutter-lg">
              <div class="col-lg-9">
                <div class="posts">
                  {dataBlodDetail && dataBlodDetail.map((item, index) => (
                    <div key={index}>
                      <h5 style={{ fontWeight: 700 }}>{item.title}</h5>
                      {item.detail_data[0] && item.detail_data[0].map((item, index) => (
                        <div key={index}>
                          <h2 style={{ fontWeight: 700, lineHeight: 1.5, fontSize: "2.4rem" }}>{item.h2}</h2>
                          {item.p && item.p.map((paragraph, paragraphIndex) => (
                            <div key={paragraphIndex}>
                              {paragraph.map((content, contentIndex) => (
                                <div key={contentIndex}>
                                  {content.text && <p style={{ fontSize: "1.4rem", fontWeight: 400, fontFamily: "Poppins, sans-serif" }}>{content.text}</p>}
                                  {content.src && <img src={content.src} alt={`Image ${paragraphIndex}-${contentIndex}`} />}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

              </div>
              <div class="col-lg-3  ">
                <div class="">
                  <div class="" data-sticky-options="{'top': 89, 'bottom': 70}">
                    <div class="widget widget-search border-no mb-2">
                      <form action="#" class="input-wrapper input-wrapper-inline btn-absolute">
                        <input type="text" class="form-control" name="search" autocomplete="off" placeholder="Search in Blog" required />
                        <button class="btn btn-search btn-link" type="submit">
                          <FontAwesomeIcon icon={faSearch} />
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
          </Spin>
        </div>
      </div>
    </main>
  )
}

export default BlogDetailPage