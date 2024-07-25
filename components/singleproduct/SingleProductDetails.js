import { addToCart } from '../../redux/reducer/cartReducer';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const SingleProductDetails = ({prod}) => {
    const dispatch = useDispatch();
    const [showDescription, setShowDescription] = useState(true)
    const [showReviews, setShowReviews] = useState(false)

    const handleShowDescription = () => {
        setShowDescription(true);
        setShowReviews(false);
    }

    const handleShowReviews = () => {
        setShowDescription(false);
        setShowReviews(true);
    }

    return (
        <>
            <div class="row g-4">
                <div class="col-lg-6">
                    <div class="border rounded">
                        <Link href="#">
                            <Image width={500} height={500} src={prod.image} class="img-fluid rounded" alt="Image" />
                        </Link>
                    </div>
                </div>
                <div class="col-lg-6">
                    <h4 class="fw-bold mb-3">{prod.title}</h4>
                    <p class="mb-3">Category: {prod.category}</p>
                    <h5 class="fw-bold mb-3">{prod.price}</h5>
                    <div class="d-flex mb-4">
                        <i class="fa fa-star text-secondary"></i>
                        <i class="fa fa-star text-secondary"></i>
                        <i class="fa fa-star text-secondary"></i>
                        <i class="fa fa-star text-secondary"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <p class="mb-4">{prod.desc}</p>
                    <button onClick={() => dispatch(addToCart({product: prod, user: {id: 1, name: "Ritesh"}}))} class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
                </div>
                <div class="col-lg-12">
                    <nav>
                        <div class="nav nav-tabs mb-3">
                            <button class={`nav-link border-white border-bottom-0 ${showDescription ? ' active' : ''}`} onClick={handleShowDescription} type="button" role="tab"
                                id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                aria-controls="nav-about" aria-selected="true">Description</button>
                            <button class={`nav-link border-white border-bottom-0 ${showReviews ? ' active' : ''}`} onClick={handleShowReviews} type="button" role="tab"
                                id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                                aria-controls="nav-mission" aria-selected="false">Reviews</button>
                        </div>
                    </nav>
                    <div class="tab-content mb-5">
                        <div class={`tab-pane ${showDescription ? ' active' : ''}`} id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                            <p>{prod.desc}</p>
                            <div class="px-2">
                                <div class="row g-4">
                                    <div class="col-6">
                                        <div class="row bg-light align-items-center text-center justify-content-center py-2">
                                            <div class="col-6">
                                                <p class="mb-0">Weight</p>
                                            </div>
                                            <div class="col-6">
                                                <p class="mb-0">1 kg</p>
                                            </div>
                                        </div>
                                        <div class="row text-center align-items-center justify-content-center py-2">
                                            <div class="col-6">
                                                <p class="mb-0">Country of Origin</p>
                                            </div>
                                            <div class="col-6">
                                                <p class="mb-0">Agro Farm</p>
                                            </div>
                                        </div>
                                        <div class="row bg-light text-center align-items-center justify-content-center py-2">
                                            <div class="col-6">
                                                <p class="mb-0">Quality</p>
                                            </div>
                                            <div class="col-6">
                                                <p class="mb-0">Organic</p>
                                            </div>
                                        </div>
                                        <div class="row text-center align-items-center justify-content-center py-2">
                                            <div class="col-6">
                                                <p class="mb-0">Artist</p>
                                            </div>
                                            <div class="col-6">
                                                <p class="mb-0">{prod.artist}</p>
                                            </div>
                                        </div>
                                        <div class="row bg-light text-center align-items-center justify-content-center py-2">
                                            <div class="col-6">
                                                <p class="mb-0">Color</p>
                                            </div>
                                            <div class="col-6">
                                                <p class="mb-0">{prod.color}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class={`tab-pane ${showReviews ? ' active' : ''}`} id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                            <div class="d-flex">
                                <Image width={500} height={500} src="/img/avatar.jpg" class="img-fluid rounded-circle p-3" style={{width: '100px', height: '100px'}} alt="" />
                                <div class="">
                                    <p class="mb-2" style={{fontSize: '14px'}}>April 12, 2024</p>
                                    <div class="d-flex justify-content-between">
                                        <h5>Jason Smith</h5>
                                        <div class="d-flex mb-3">
                                            <i class="fa fa-star text-secondary"></i>
                                            <i class="fa fa-star text-secondary"></i>
                                            <i class="fa fa-star text-secondary"></i>
                                            <i class="fa fa-star text-secondary"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                    </div>
                                    <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                                        words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                </div>
                            </div>
                            <div class="d-flex">
                                <Image width={500} height={500} src="/img/avatar.jpg" class="img-fluid rounded-circle p-3" style={{width: '100px', height: '100px'}} alt="" />
                                <div class="">
                                    <p class="mb-2" style={{fontSize: '14px'}}>April 12, 2024</p>
                                    <div class="d-flex justify-content-between">
                                        <h5>Sam Peters</h5>
                                        <div class="d-flex mb-3">
                                            <i class="fa fa-star text-secondary"></i>
                                            <i class="fa fa-star text-secondary"></i>
                                            <i class="fa fa-star text-secondary"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                        </div>
                                    </div>
                                    <p class="text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                                        words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="nav-vision" role="tabpanel">
                            <p class="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                                amet diam et eos labore. 3</p>
                            <p class="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                                Clita erat ipsum et lorem et sit</p>
                        </div>
                    </div>
                </div>
                <form action="#">
                    <h4 class="mb-5 fw-bold">Leave a Reply</h4>
                    <div class="row g-4">
                        <div class="col-lg-6">
                            <div class="rounded">
                                <input type="text" class="form-control  me-4" placeholder="Your Name *" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="rounded">
                                <input type="email" class="form-control " placeholder="Your Email *" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="rounded">
                                <textarea name="" id="" class="form-control " cols="30" rows="8" placeholder="Your Review *" spellcheck="false"></textarea>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="d-flex justify-content-between py-3 mb-5">
                                <div class="d-flex align-items-center">
                                    <p class="mb-0 me-3">Please rate:</p>
                                    <div class="d-flex align-items-center" style={{fontSize: '12px'}}>
                                        <i class="fa fa-star text-muted"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                </div>
                                <Link href="#" class="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </>
    )
}

export default SingleProductDetails
