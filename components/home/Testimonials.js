"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchHomeData } from "../../redux/reducer/homePageReducer";
import { ImageBaseUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import SkeletonTestimonials  from "../../helpers/SkeletonTestimonials";


const Testimonials = () => {
  const dispatch = useDispatch();
  const { homePageData, loading, dataFetched } = useSelector(
    (state) => state.Home
  );
  const testimonialData = homePageData.testimonials;

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, dataFetched,testimonialData]);


  return (
    <>
     {testimonialData ? (
      <section className="testimonials">
        <div className="container-fluid">
          <div className="row">
            <div className="heading">
              <h3>Testimonials</h3>
            </div>
            <div class="testimonial-carousel">
              <Swiper
                slidesPerView={2}
                spaceBetween={20}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                speed={1500}
                //  loop={true}
                modules={[Autoplay, Navigation]}>
                {testimonialData && testimonialData.length > 0 ? (
                  testimonialData.map((item, index) => (
                    <SwiperSlide>
                      <div className="item">
                        <div className="top-arrow">
                          <img
                            src="img/testimonials-arrow-top.png"
                            alt=""
                          />
                        </div>
                        <p>{item.comment}</p>
                        <div className="bottom-arrow">
                          <span>{item.name}</span>
                          <img
                            src="img/testimonials-arrow-bottom.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <p>Loading...</p>
                )}

                {/* Add more SwiperSlides here */}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
     )
     :
     (
      <SkeletonTestimonials/>
     )
    }
    </>
  );
};

export default Testimonials;
