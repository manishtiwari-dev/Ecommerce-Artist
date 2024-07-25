import SingleProduct from '../../../components/singleproduct/SingleProduct';
import React from 'react'

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
  ]
}

const page = ({ params }) => {
    return (
        <>
            <SingleProduct id={params.id} />
        </>
    )
}

export default page
