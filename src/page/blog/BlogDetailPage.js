import React from 'react'
import { useProductContext } from '../../services/helpers/getDataHelpers'
const BlogDetailPage = () => {
  const { dataBlodDetail } = useProductContext();
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
                        <i class="d-icon-search"></i>
                      </button>
                    </form>
                  </div>
                  <div class="widget widget-collapsible">
                    <h3 class="widget-title">Popular Posts</h3>
                    <div class="widget-body">
                      <div class="post-col">
                        <div class="post post-list-sm">
                          <figure class="post-media">
                            <a href="post-single.html">
                              <img src="images/blog/1_xs.jpg" width="90" height="90" alt="post" />
                            </a>
                          </figure>
                          <div class="post-details">
                            <div class="post-meta">
                              <a href="#" class="post-date">Nov 22, 2020</a>
                            </div>
                            <h4 class="post-title"><a href="post-single.html">The Best
                              Choice For
                              Spending Time</a></h4>
                          </div>
                        </div>
                        <div class="post post-list-sm">
                          <figure class="post-media">
                            <a href="post-single.html">
                              <img src="images/blog/2_xs.jpg" width="90" height="90" alt="post" />
                            </a>
                          </figure>
                          <div class="post-details">
                            <div class="post-meta">
                              <a href="#" class="post-date">Jun 6, 2019</a>
                            </div>
                            <h4 class="post-title"><a href="post-single.html">Women's
                              Fashion
                              Summer Dress</a></h4>
                          </div>
                        </div>
                        <div class="post post-list-sm">
                          <figure class="post-media">
                            <a href="post-single.html">
                              <img src="images/blog/3_xs.jpg" width="90" height="90" alt="post" />
                            </a>
                          </figure>
                          <div class="post-details">
                            <div class="post-meta">
                              <a href="#" class="post-date">May 13, 2020</a>
                            </div>
                            <h4 class="post-title"><a href="post-single.html">Women’s
                              Sneaker</a></h4>
                          </div>
                        </div>
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

export default BlogDetailPage