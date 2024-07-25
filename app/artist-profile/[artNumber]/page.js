import ArtistProfile from "../../../components/artist-profile/ArtistProfile";
import { SellerFindArtNumberUrl } from "../../../config";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const fetchData = await fetch(SellerFindArtNumberUrl).then((res) => res.json());

  const artData = fetchData.sellers || [];

  return artData
    .filter((art) => art.artist_number != null) // Filter out null or undefined artist_number
    .map((art) => ({
      artNumber: art.artist_number.toString(), // Ensure artNumber is a string
    }));
}

const Page = ({ params }) => {
  return <ArtistProfile artNumber={params.artNumber} />;
};

export default Page;
