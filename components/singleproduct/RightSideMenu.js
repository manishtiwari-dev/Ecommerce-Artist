import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RightSideMenu = () => {
    return (
        <>
            <div class="row g-4 fruite">
                <div class="col-lg-12">
                    <h4 class="mb-4">Featured products</h4>
                    <div class="d-flex align-items-center justify-content-start">
                        <div class="rounded" style={{width: '100px', height: '100px'}}>
                            <Image width={100} height={100} src="/img/featur-1.jpg" class="img-fluid rounded" alt="Image" />
                        </div>
                        <div>
                            <h6 class="mb-2">Big Banana</h6>
                            <div class="d-flex mb-2">
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="d-flex mb-2">
                                <h5 class="fw-bold me-2">2.99 $</h5>
                                <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-start">
                        <div class="rounded" style={{width: '100px', height: '100px'}}>
                            <Image width={100} height={100} src="/img/featur-2.jpg" class="img-fluid rounded" alt="" />
                        </div>
                        <div>
                            <h6 class="mb-2">Big Banana</h6>
                            <div class="d-flex mb-2">
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="d-flex mb-2">
                                <h5 class="fw-bold me-2">2.99 $</h5>
                                <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-start">
                        <div class="rounded" style={{width: '100px', height: '100px'}}>
                            <Image width={100} height={100} src="/img/featur-3.jpg" class="img-fluid rounded" alt="" />
                        </div>
                        <div>
                            <h6 class="mb-2">Big Banana</h6>
                            <div class="d-flex mb-2">
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="d-flex mb-2">
                                <h5 class="fw-bold me-2">2.99 $</h5>
                                <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-start">
                        <div class="rounded me-4" style={{width: '100px', height: '100px'}}>
                            <Image width={100} height={100} src="/img/vegetable-item-4.jpg" class="img-fluid rounded" alt="" />
                        </div>
                        <div>
                            <h6 class="mb-2">Big Banana</h6>
                            <div class="d-flex mb-2">
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="d-flex mb-2">
                                <h5 class="fw-bold me-2">2.99 $</h5>
                                <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-start">
                        <div class="rounded me-4" style={{width: '100px', height: '100px'}}>
                            <Image width={100} height={100} src="/img/vegetable-item-5.jpg" class="img-fluid rounded" alt="" />
                        </div>
                        <div>
                            <h6 class="mb-2">Big Banana</h6>
                            <div class="d-flex mb-2">
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="d-flex mb-2">
                                <h5 class="fw-bold me-2">2.99 $</h5>
                                <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-start">
                        <div class="rounded me-4" style={{width: '100px', height: '100px'}}>
                            <Image width={100} height={100} src="/img/vegetable-item-6.jpg" class="img-fluid rounded" alt="" />
                        </div>
                        <div>
                            <h6 class="mb-2">Big Banana</h6>
                            <div class="d-flex mb-2">
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="d-flex mb-2">
                                <h5 class="fw-bold me-2">2.99 $</h5>
                                <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center my-4">
                        <Link href="#" class="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</Link>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="position-relative">
                        <Image width={100} height={100} src="/img/banner-fruits.jpg" class="img-fluid w-100 rounded" alt="" />
                        <div class="position-absolute" style={{top: '50%', right: '10px', transform: 'translateY(-50%)'}}>
                            <h3 class="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightSideMenu
