"use client"
import React, { useEffect } from 'react'
import PaymentOptions from './PaymentOptions'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutProductTableItem from './CheckoutProductTableItem';
import { setDiscountApplied, setTotalPrice } from '../../redux/reducer/cartReducer';

const CheckoutProductTable = () => {
    const dispatch = useDispatch();
    const { cart, total_price, discount } = useSelector((state) => state.Cart);

    let discountApplied = discount || 0;

    useEffect(() => {
        dispatch(setTotalPrice());
        dispatch(setDiscountApplied());
    }, [cart])

    return (
        <>
            <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Products</th>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col"></th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => {
                                return (
                                    <CheckoutProductTableItem key={item.id} prod={item} />
                                )
                            })}

                            <tr>
                                <td scope="row">
                                </td>
                                <td class="py-5"></td>
                                <td class="py-5"></td>
                                <td class="py-5">
                                    <p class="mb-0 text-dark py-3">Subtotal</p>
                                </td>
                                <td class="py-5">
                                    <div class="py-3 border-bottom border-top">
                                        <p class="mb-0 text-dark">{total_price}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                </td>
                                <td class="py-5"></td>
                                <td class="py-5"></td>
                                <td class="py-5">
                                    <p class="mb-0 text-dark py-3">Discount</p>
                                </td>
                                <td class="py-5">
                                    <div class="py-3 border-bottom border-top">
                                        <p class="mb-0 text-dark">{discountApplied}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row"></td>
                                <td className="py-5">
                                    <p className="mb-0 text-dark text-uppercase py-3">Total</p>
                                </td>
                                <td className="py-5"></td>
                                <td className="py-5"></td>
                                <td className="py-5">
                                    <div className="py-3 border-bottom border-top">
                                        <p className="mb-0 text-dark">{total_price - discountApplied}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PaymentOptions />
            </div>
        </>
    )
}

export default CheckoutProductTable
