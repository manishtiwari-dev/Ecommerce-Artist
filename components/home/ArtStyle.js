"use client";
import React, { useState, useEffect } from "react";
import { fetchHomeData } from "../../redux/reducer/homePageReducer";
import { ImageBaseUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import SkeletonStyle from "../../helpers/SkeletonStyle";
import Link from "next/link";
const ArtStyle = () => {
  const dispatch = useDispatch();
  const { homePageData, loading, dataFetched } = useSelector(
    (state) => state.Home
  );
  const styleData = homePageData.look_for_style;

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, dataFetched]);
  return (
    <>
      {styleData ? (
        <section className="Style">
          <div className="container-fluid">
            <div className="row">
              <h3>Look For Style</h3>

              {styleData && styleData.length > 0 ? (
                styleData.map((item, index) => (
                  <div className="col-3 circle-boxes">
                    <div className="box">
                      <div className="image">
                        <img
                          src={
                            item.image
                              ? `${ImageBaseUrl}${item.image}`
                              : "/img/no-image1.png"
                          }
                          alt={item.image}
                        />
                      </div>
                      <div className="content">
                        <h6>{item.type_name}</h6>
                        <Link
                          href={`/art-gallery/${item.slug}`}
                          className="nav-link "
                        >
                          <button type="button" className="btn btn-link">
                            View
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
              {/* <div className="col-3 circle-boxes">
              <div className="box">
                <div className="image">
                  <img
                    src="img/circle-item2.png"
                    alt=""
                  />
                </div>
                <div className="content">
                  <h6>Abstract</h6>
                  <button
                    type="button"
                    className="btn btn-link">
                    View
                  </button>
                </div>
              </div>
            </div>
            <div className="col-3 circle-boxes">
              <div className="box">
                <div className="image">
                  <img
                    src="img/circle-item3.png"
                    alt=""
                  />
                </div>
                <div className="content">
                  <h6>Landscapes</h6>
                  <button
                    type="button"
                    className="btn btn-link">
                    View
                  </button>
                </div>
              </div>
            </div>
            <div className="col-3 circle-boxes">
              <div className="box">
                <div className="image">
                  <img
                    src="img/circle-item4.png"
                    alt=""
                  />
                </div>
                <div className="content">
                  <h6>Traditional</h6>
                  <button
                    type="button"
                    className="btn btn-link">
                    View
                  </button>
                </div>
              </div>
            </div>
            <div className="col-3 circle-boxes">
              <div className="box">
                <div className="image">
                  <img
                    src="img/circle-item5.png"
                    alt=""
                  />
                </div>
                <div className="content">
                  <h6>Still Life</h6>
                  <button
                    type="button"
                    className="btn btn-link">
                    View
                  </button>
                </div>
              </div>
            </div>
            <div className="col-3 circle-boxes">
              <div className="box">
                <div className="image">
                  <img
                    src="img/circle-item6.png"
                    alt=""
                  />
                </div>
                <div className="content">
                  <h6>Nature</h6>
                  <button
                    type="button"
                    className="btn btn-link">
                    View
                  </button>
                </div>
              </div>
            </div>
            <div className="col-3 circle-boxes">
              <div className="box">
                <div className="image">
                  <img
                    src="img/circle-item7.png"
                    alt=""
                  />
                </div>
                <div className="content">
                  <h6>Black & White</h6>
                  <button
                    type="button"
                    className="btn btn-link">
                    View
                  </button>
                </div>
              </div>
            </div>
            <div className="col-3 circle-boxes">
              <div className="box">
                <div className="image">
                  <img
                    src="img/circle-item8.png"
                    alt=""
                  />
                </div>
                <div className="content">
                  <h6>Graffiti</h6>
                  <button
                    type="button"
                    className="btn btn-link">
                    View
                  </button>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </section>
      ) : (
        <SkeletonStyle />
      )}
    </>
  );
};
export default ArtStyle;
