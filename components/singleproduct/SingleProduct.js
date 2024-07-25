"use client"
import { setSingleProduct } from '../../redux/reducer/productReducer';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SingleProductDetails from './SingleProductDetails';
import RightSideMenu from './RightSideMenu';
import ProductsSlidesShow from '../ProductsSlidesShow';

const SingleProduct = ({ id }) => {
    const dispatch = useDispatch();
    const { singleProduct } = useSelector((state) => state.Product);

    useEffect(() => {
        dispatch(setSingleProduct(id))
        console.log(singleProduct)
    }, [id])
    return (
        <>
            <div class="container-fluid py-5 mt-5">
                <div class="container py-5">
                    <div class="row g-4 mb-5">
                        <div class="col-lg-8 col-xl-9">
                            <SingleProductDetails prod={singleProduct} />
                        </div>
                        <div class="col-lg-4 col-xl-3">
                            <RightSideMenu/>
                        </div>
                    </div>
                    <ProductsSlidesShow category={singleProduct.category} title={"Related products"}/>
                </div>
            </div>
        </>
    )
}

export default SingleProduct
