import { addToCart } from '../redux/reducer/cartReducer';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const ProductCard = ({ prod }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Link href={`/single-product/${prod.id}`}>
        <div class="rounded position-relative fruite-item">
          <div class="fruite-img">
            <Image
              src={prod.image}
              width={500}
              height={500}
              className="img-fluid w-100 rounded-top"
              alt=""
            />
          </div>
          <div
            class="text-white bg-secondary px-3 py-1 rounded position-absolute"
            style={{ top: "10px", left: "10px" }}>
            {prod.category}
          </div>
          <div class="p-4 border border-secondary border-top-0 rounded-bottom">
            <h4>{prod.title}</h4>
            <p>{prod.desc}</p>
            <div class="d-flex justify-content-between flex-lg-wrap">
              <p class="text-dark fs-5 fw-bold mb-0">{prod.price}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addToCart({
                      product: prod,
                      user: { id: 1, name: "Ritesh" },
                    })
                  );
                }}
                class="btn border border-secondary rounded-pill px-3 text-primary">
                <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
