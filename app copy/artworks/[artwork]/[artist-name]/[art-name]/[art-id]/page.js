import React from 'react'

const page = ({params}) => {
  console.log(params)
  return (
    <>
      /artworks/[artwork]/[artist-name]/[painting-name]/[painting-id]

      page for separate art. 
      
      On the basis params, respective page will be called.

    </>
  )
}

export default page
