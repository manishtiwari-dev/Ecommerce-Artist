// SkeletonTestimonials.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from 'react';
import styles from './SkeletonTestimonials.module.css'; // Import CSS styles

const SkeletonTestimonials = () => {
  return (
    // <section className="testimonials">
    //   <div className="container-fluid">
    //     <div className="row">
    //       <div className="heading">
    //         <h3>Testimonials</h3>
    //       </div>
    //       <div className="testimonial-carousel">
    //         {/* Skeleton loading items */}
    //         {[...Array(1)].map((_, index) => (
    //           <div className="item" key={index}>
    //             <div className="top-arrow">
    //               <div className={styles.image}></div>
    //             </div>
    //             <div className={styles.comment}></div>
    //             <div className="bottom-arrow">
    //               {/* <div className={styles.name}></div> */}
    //               <div className={styles.arrow}></div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="testimonials">
  <div className="container-fluid">
    <div className="row">
      <div className="heading">
        <h3>Testimonials</h3>
      </div>
      <div className="testimonial-carousel">
        <Swiper
          slidesPerView={2}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1500}
          loop={true}
          // spaceBetween={20}
        >
          {/* Placeholder items */}
          {[...Array(5)].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="item">
                <div className="top-arrow">
                  <div className={styles.image}></div>
                </div>
                <div className={styles.comment}></div>
                <div className="bottom-arrow">
                  {/* <div className={styles.name}></div> */}
                  <div className={styles.arrow}></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>
</section>

  );
};

export default SkeletonTestimonials;
