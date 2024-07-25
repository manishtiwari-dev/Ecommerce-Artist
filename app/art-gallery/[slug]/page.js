import ProductGallery from "../../../components/productGallery/index";
import {  CommonUrl } from "../../../config";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const fetchData = await fetch(
  `${CommonUrl}`
  ).then((res) => res.json());

  const categoryData = fetchData.look_for_style || [];

  return categoryData.map((cat) => ({
    slug: cat.slug,
  }));
}

const page = ({ params }) => {
  return <ProductGallery slug={params.slug} />;
};

export default page;
