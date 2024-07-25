import { removeFromCart } from '../../redux/reducer/cartReducer';
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux';

const CartItem = ({prod}) => {
    const dispatch = useDispatch();
    return (
        <>
            <tr>
                <td scope="row">
                    <div className="d-flex align-items-center">
                        <Image width={100} height={100} src={prod.image} className="img-fluid me-5 rounded-circle" style={{ width: '80px', height: '80px' }} alt="" />
                    </div>
                </td>
                <td>
                    <p className="mb-0 mt-4">{prod.title}</p>
                </td>
                <td>
                    <p className="mb-0 mt-4">{prod.price}</p>
                </td>
                <td>
                    <button onClick={() => dispatch(removeFromCart(prod.id))} className="btn btn-md rounded-circle bg-light border mt-4" >
                        <i className="fa fa-times text-danger"></i>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default CartItem
