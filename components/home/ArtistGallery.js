"use client";
import React, { useState, useEffect } from "react";
import { fetchHomeData } from "../../redux/reducer/homePageReducer";
import { ImageBaseUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import SkeletonChoiceGallery from "../../helpers/SkeletonChoiceGallery";
import Link from "next/link";

const ArtistGallery = () => {
  const [activeTab, setActiveTab] = useState(1); // Default tab is 'home'
  // Function to handle tab changes
  const handleTabChange = (tabId, event) => {
    event.preventDefault();
    setActiveTab(tabId);
  };

  const dispatch = useDispatch();
  const { homePageData, loading, dataFetched } = useSelector(
    (state) => state.Home
  );
  const popularCatData = homePageData.popularCategory;

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, dataFetched]);

  const getImageExtension = (imageUrl) => {
    if (!imageUrl) return "";
    const parts = imageUrl.split(".");
    return parts[parts.length - 1];
  };

  return (
    <>
      {popularCatData ? (
        <section className="Artist choice-gallery">
          <div className="container-fluid">
            <div className="row">
              <h3>Choice Gallery</h3>
              {/* <!-- Nav tabs --> */}
              <ul className="nav nav-tabs">
                {popularCatData && popularCatData.length > 0 ? (
                  popularCatData.map((item, index) => (
                    <>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeTab === item.category.id ? "active" : ""
                          }`}
                          onClick={(e) => handleTabChange(item.category.id, e)}
                          data-bs-toggle="tab"
                          href={item.category.slug}
                        >
                          {item.category.name}
                        </a>
                      </li>
                    </>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </ul>

              <div className="tab-content">
                {popularCatData && popularCatData.length > 0 ? (
                  popularCatData.map((item, index) => (
                    <div
                      key={index} // Use a unique key for each item
                      className={`tab-pane container ${
                        activeTab === item.category.id ? "active" : "fade"
                      }`}
                      id={item.category.id}
                    >
                      <div className="inner-taber">
                        {item.productsfeature &&
                        item.productsfeature.length > 0 ? (
                          item.productsfeature.map(
                            (value, subIndex) => (
                              <div key={subIndex} className="item">
                                <div className="images">
                                  <img
                                    src={
                                      value.thumb_image
                                        ? `${ImageBaseUrl}products/${
                                            value.id
                                          }/${
                                            value.slug
                                          }-300.${getImageExtension(
                                            value.thumb_image
                                          )}`
                                        : "/img/no-image1.png"
                                    }
                                    alt={value.name}
                                  />
                                </div>
                                <div className="content">
                                  <h5>{value.name}</h5>
                                  <Link href={`/product/${value.slug}`}>
                                  <span>Shop</span>
                                  </Link>
                                </div>
                              </div>
                              //</div>
                            )
                          )
                        ) : (
                          <p className="text-center">No Products...</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <SkeletonChoiceGallery />
      )}
    </>
  );
};
export default ArtistGallery;






