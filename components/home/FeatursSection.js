import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeatursSection = () => {
    return (
        <>
            <div class="container-fluid service py-5">
                <div class="container py-5">
                    <div class="row g-4 justify-content-center">
                        <div class="col-md-6 col-lg-4">
                            <Link href="#">
                                <div class="service-item bg-secondary rounded border border-secondary">
                                    <Image width={500} height={500} src="/img/featur-1.jpg" class="img-fluid rounded-top w-100" alt=""/>
                                        <div class="px-4 rounded-bottom">
                                            <div class="service-content bg-primary text-center p-4 rounded">
                                                <h5 class="text-white">Fresh Apples</h5>
                                                <h3 class="mb-0">20% OFF</h3>
                                            </div>
                                        </div>
                                </div>
                            </Link>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <Link href="#">
                                <div class="service-item bg-dark rounded border border-dark">
                                    <Image width={500} height={500} src="/img/featur-2.jpg" class="img-fluid rounded-top w-100" alt=""/>
                                        <div class="px-4 rounded-bottom">
                                            <div class="service-content bg-light text-center p-4 rounded">
                                                <h5 class="text-primary">Tasty Fruits</h5>
                                                <h3 class="mb-0">Free delivery</h3>
                                            </div>
                                        </div>
                                </div>
                            </Link>
                        </div>
                        <div class="col-md-6 col-lg-4">
                            <Link href="#">
                                <div class="service-item bg-primary rounded border border-primary">
                                    <Image width={500} height={500} src="/img/featur-3.jpg" class="img-fluid rounded-top w-100" alt=""/>
                                        <div class="px-4 rounded-bottom">
                                            <div class="service-content bg-secondary text-center p-4 rounded">
                                                <h5 class="text-white">Exotic Vegitable</h5>
                                                <h3 class="mb-0">Discount 30$</h3>
                                            </div>
                                        </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeatursSection
