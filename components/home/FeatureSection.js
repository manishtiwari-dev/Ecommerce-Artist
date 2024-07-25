"use client";
import React, { useEffect, useState } from "react";
import { fetchHomeData } from "../../redux/reducer/homePageReducer";
import { ImageBaseUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import SkeletonFeatured from "../../helpers/SkeletonFeatured";

const FeatureSection = () => {
  const dispatch = useDispatch();
  const { homePageData, loading, dataFetched } = useSelector(
    (state) => state.Home
  );
  const featureData = homePageData.featureCategory;

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, dataFetched]);

  // console.log(featureData);

  return (
    <>
      {featureData ? (
        <section className="featured">
          <div className="container-fluid">
            <div className="row">
              <h3>Featured Art Piece</h3>

              {featureData && featureData.length > 0 ? (
                featureData.map((item, index) => (
                  <div className="col-4 featured-items">
                    <Link href={`/art-category/${item.category.slug}`}>
                      <img
                        src={`${ImageBaseUrl}${item.category.image}`}
                        alt={item.category.name}
                      />

                      <h4>{item.category.name}</h4>
                      <button type="button" className="btn btn-link">
                        Discover Collection
                      </button>
                    </Link>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="8"
                      viewBox="0 0 20 8"
                      fill="none"
                    >
                      <path
                        d="M19.3536 4.35355C19.5488 4.15829 19.5488 3.84171 19.3536 3.64645L16.1716 0.464466C15.9763 0.269204 15.6597 0.269204 15.4645 0.464466C15.2692 0.659728 15.2692 0.976311 15.4645 1.17157L18.2929 4L15.4645 6.82843C15.2692 7.02369 15.2692 7.34027 15.4645 7.53553C15.6597 7.7308 15.9763 7.7308 16.1716 7.53553L19.3536 4.35355ZM0 4.5H19V3.5H0V4.5Z"
                        fill="black"
                        fill-opacity="0.6"
                      />
                    </svg>
                  </div>
                ))
              ) : (
                ''
              )}
            </div>
          </div>
        </section>
      ) : (
        <SkeletonFeatured />
      )}
    </>
  );
};
export default FeatureSection;
