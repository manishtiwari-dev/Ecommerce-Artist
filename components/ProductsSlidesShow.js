"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/reducer/cartReducer';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductsSlidesShow = ({category, title}) => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.Product);

    return (
        <>
            <h1 class="fw-bold mb-0">{title}</h1>
            <div class="vesitable mt-5">
                <div class=" vegetable-carousel justify-content-center">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={40}
                        // centeredSlides={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        speed={1500}
                        loop={true}
                        modules={[Autoplay, Navigation]}
                    >
                        {products.map((item) => {
                            if (item.category === category) {
                                return (
                                    <SwiperSlide>
                                        <Link href={`/single-product/${item.id}`}>
                                            <div class="border border-primary rounded position-relative vesitable-item">
                                                <div class="vesitable-img">
                                                    <Image width={500} height={500} src={item.image} class="img-fluid w-100 rounded-top" alt="" />
                                                </div>
                                                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>{item.category}</div>
                                                <div class="p-4 pb-0 rounded-bottom">
                                                    <h4>{item.title}</h4>
                                                    <p className='text-black'>{item.desc}</p>
                                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                                        <p class="text-dark fs-5 fw-bold">{item.price}</p>
                                                        <button onClick={(e) => {
                                                            e.preventDefault();
                                                            dispatch(addToCart({ product: item, user: { id: 1, name: "Ritesh" } }))
                                                        }} class="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            }
                        })}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default ProductsSlidesShow
