"use client"
import React, { useEffect } from 'react'
import SortingMenu from './SortingMenu'
import FilterMenu from './FilterMenu'
import { Products } from '../../helpers/ProductsArray'
import ProductCard from '../ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../../redux/reducer/productReducer'
import Loading from '../../helpers/Loader'

const Shop = () => {
    const dispatch = useDispatch();
    const { loading, filteredProducts, sortingValue } = useSelector((state) => state.Product);

    useEffect(() => {
        dispatch(setProducts({ products: Products, fromHeader: false }))
    }, [Products])

    return (
        <>
            <div class="container-fluid fruite py-5">
                <div class="container py-5">
                    <h1 class="mb-4">Fresh fruits shop</h1>
                    <div class="row g-4">
                        <div class="col-lg-12">
                            <SortingMenu />
                            <div class="row g-4">
                                <FilterMenu />
                                <div class="col-lg-9">
                                    <div class="row g-4 justify-content-center">
                                        {loading === true ?
                                            <Loading /> :
                                            filteredProducts.map((prod) => {
                                                return (
                                                    <div class="col-md-6 col-lg-6 col-xl-4">
                                                        <ProductCard key={prod.id}
                                                            prod={prod}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                        <div class="col-12">
                                            <div class="pagination d-flex justify-content-center mt-5">
                                                <a href="#" class="rounded">&laquo;</a>
                                                <a href="#" class="active rounded">1</a>
                                                <a href="#" class="rounded">2</a>
                                                <a href="#" class="rounded">3</a>
                                                <a href="#" class="rounded">4</a>
                                                <a href="#" class="rounded">5</a>
                                                <a href="#" class="rounded">6</a>
                                                <a href="#" class="rounded">&raquo;</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop
