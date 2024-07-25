"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { fetchHomeData } from "../../redux/reducer/homePageReducer";
import { ImageBaseUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import SkeletonBannerSlider from "../../helpers/SkeletonBannerSlider";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { homePageData, loading, dataFetched } = useSelector(
    (state) => state.Home
  );
  const sliderData = homePageData.slider;

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, dataFetched]);

  return (
    <>
    {sliderData ? (
      <div className="banner-slider">
        <div
          id="carouselId"
          className="carousel slide position-relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" role="listbox">
            <div className="carousel-indicators">
              {/* <button
                type="button"
                data-bs-target="#carouselId"
                data-bs-slide-to="0"
                className="carousel-control-first"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselId"
                data-bs-slide-to="1"
                className="carousel-control-second"
              ></button> */}
              {/* <button
                type="button"
                data-bs-target="#carouselId"
                data-bs-slide-to="2"
              ></button> */}
            </div>
            <Swiper
              id="carouselId"
              slidesPerView={1}
              className="carousel slide"
              //  loop={true}
              autoplay={{ delay: 5000 }}
              modules={[Autoplay, Navigation]}
              navigation={{
                prevEl: ".carousel-control-first",
                nextEl: ".carousel-control-second",
              }}
            >
              {sliderData && sliderData.length > 0 ? (
                sliderData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="items">
                      <div className="content">
                        <h2>{item.title_one}</h2>
                      </div>
                      <div className="image">
                        <img
                          src={`${ImageBaseUrl}${item.image}`}
                          className="d-block w-100"
                          alt={item.title_one}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                "No Records"
              )}
            </Swiper>
            
          </div>
        </div>
      </div>
    )
    :
    (
        <SkeletonBannerSlider/>
    )
  }
    </>
  );
};

export default HeroSection;

