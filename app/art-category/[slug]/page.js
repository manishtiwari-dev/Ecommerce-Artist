import ProductCategory from "../../../components/productCategory/index";
import {  CategoryListUrl } from "../../../config";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const fetchData = await fetch(
   `${CategoryListUrl}`
  ).then((res) => res.json());

  const categoryData = fetchData.categories || [];

  return categoryData.map((cat) => ({
    slug: cat.slug,
  }));
}

const page = ({ params }) => {
  return <ProductCategory slug={params.slug} />;
};

export default page;

