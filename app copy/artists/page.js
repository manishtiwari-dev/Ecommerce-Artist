import React from 'react'

const page = () => {
  return (
    <>
      /artists

    show all artists. there are 4 separate tabs according to which all the artists will be arranged and will be displayed. The four tabs will be:
    1. Artists of the week
    2. Popular Artists
    3. Trending Artists
    4. Most Visited
    5. All Artists   


    According to the tab, a slugname will be passed as /artists?tab=[n] , where [n] is the number of the respective tab, and based on slugname it will arrange artists.
    </>
  )
}

export default page
