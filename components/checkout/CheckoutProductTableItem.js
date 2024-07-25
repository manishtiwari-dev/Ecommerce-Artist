" use client"
import Image from 'next/image'
import React from 'react'

const CheckoutProductTableItem = ({ prod }) => {
    return (
        <>
            <tr>
                <td scope="row">
                    <div className="d-flex align-items-center mt-2">
                        <Image src={prod.image} width={100} height={100} className="img-fluid rounded-circle" style={{ width: '90px', height: '90px' }} alt="" />
                    </div>
                </td>
                <td scope="col"></td>
                <td className="py-5">{prod.title}</td>
                <td scope="col"></td>
                <td className="py-5">{prod.price}</td>
            </tr>
        </>
    )
}

export default CheckoutProductTableItem
