// SkeletonBannerSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from 'react';
import styles from './SkeletonBannerSlider.module.css'; // Import CSS styles

const SkeletonBannerSlider = () => {
  const isLoading = true; // Set to true when data is fetching

  return (
    // <div className="banner-slider">
    //   <div id="carouselId" className="carousel slide position-relative">
    //     <div className="carousel-inner" role="listbox">
    //       <div className="carousel-indicators">
    //         <div className={styles.carouselControl}></div>
    //         <div className={styles.carouselControl}></div>
    //         {/* Add more controls if needed */}
    //       </div>
    //       <div className={styles.carouselContent}>
    //         {/* Skeleton loading items */}
    //         {[...Array(3)].map((_, index) => (
    //           <div className="items" key={index}>
    //             <div className="content">
    //               <div className={styles.skeletonText}>  </div>
    //             </div>
    //             <div className="image">
    //               <div className={styles.skeletonImage}></div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>


    // Simulating loading state

    <div className="banner-slider">

      <div className="carousel-inner" role="listbox">
        <div className="carousel-indicators">
          <div className={styles.carouselControl}></div>
          <div className={styles.carouselControl}></div>
          {/* Add more controls if needed */}
        </div>
        <div className={styles.carouselContent}>

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

            {isLoading ? (
              // Render skeleton loading items if data is loading
              [...Array(3)].map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="items">
                    <div className="content">
                      <div className={styles.skeletonText}>Digital Painting</div>
                    </div>
                    <div className="image">
                      <div className={styles.skeletonImage}></div>
                    </div>
                  </div>
                </SwiperSlide>

              ))
            ) : (
              // Render actual content if data is available
              <>
                {/* Render SwiperSlides with actual content here */}
                {/* Example:
                <SwiperSlide>
                  <div className="items">
                    <div className="content">
                      {/* Actual content here *}
                    </div>
                    <div className="image">
                      {/* Actual content here *}
                    </div>
                  </div>
                </SwiperSlide>
                */}
              </>
            )}
          </Swiper>
        </div>
      </div>

    </div>




  );
};

export default SkeletonBannerSlider;
