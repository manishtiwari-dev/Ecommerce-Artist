import React from 'react'

const page = ({params}) => {
    console.log(params)
  return (
    <div>
      /artworks/artist/[artist-name]/[artist-id]

      page for separate artist's art. 
      
      On the basis params, respective page will be called
    </div>
  )
}

export default page
