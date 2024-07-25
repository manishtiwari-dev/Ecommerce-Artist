import DetailPage from "../../../components/products/DetailPage";
import { ProductDetailsUrl } from "../../../config";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const fetchData = await fetch(`${ProductDetailsUrl}`).then((res) => res.json())

  const productsdata = fetchData.products.data || []; // Assuming the array of posts is nested under a key 'data'

  // let productsSlugArr = productsdata.map((post) => ({
  //   slug: post.slug,
  // }))
  // console.log('productsSlugArr', productsSlugArr);

  return productsdata.map((post) => ({
    slug: post.slug,
  }))

  // return [{ slug: 'matte-paper', },]
}
// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// export default async function Page({ params }) {
//   console.log(params);

//   const response = await fetch(
//       `https://lab2.invoidea.in/rayart/public/api/product/${params.slug}`
//     );

//     const product = await response.json();

//     // console.log(product.product.slug);
//   return (
//       <>
//         {/* <ProductDetails slug={slug} /> */}
//         <h1>Slug details : {params.slug}</h1>
//       </>
//     );
// }


const page = ({ params }) => {
  console.log('product params', params);
  return (
    <DetailPage slug={params.slug} />
  )
}

export default page