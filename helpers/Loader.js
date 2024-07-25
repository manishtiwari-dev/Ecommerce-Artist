'use client'

import React from 'react'
import { TailSpin } from 'react-loader-spinner'


export default function Loading() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <TailSpin
                height={50}
                width={50}
                color="orange"
                ariaLabel="tail-spin-loading"
                radius={1}
                visible={true}
            />
        </div>
    )
}


