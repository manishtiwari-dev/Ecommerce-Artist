import React from 'react'

const page = () => {
    return (
        <>
            /artists/[artist-name]/[artist-id]

            On the basis params, respective page will be called. There will be params which will contain artist which will be array of all parameters passed.

            artist = [artist-name, artist-id]

            it will show particular information about the artist:
            - a brief intro
            - 4 tabs each shocasting the work of artist:
            1. Original Artworks
            2. Prints
            3. Sold Artworks
            4. Artist Bio


            According to the tab, a slugname will be passed as /artists/[artist-name]/[artist-id]?tab=[n] , where [n] is the number of the respective tab, and based on slugname it will arrange work.
        </>
    )
}

export default page
