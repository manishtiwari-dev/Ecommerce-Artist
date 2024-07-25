"use client";
import React, { useState, useEffect } from "react";
import { fetchHomeData } from "../../redux/reducer/homePageReducer";
import { ImageBaseUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";

const Artist = () => {
  const [activeTab, setActiveTab] = useState("home"); // Default tab is 'home'

  // Function to handle tab changes
  const handleTabChange = (tabId, event) => {
    event.preventDefault();
    setActiveTab(tabId);
  };

  const dispatch = useDispatch();
  const { homePageData, loading, dataFetched } = useSelector(
    (state) => state.Home
  );
  const artistData = homePageData.artist_art;
   const mostVisitedData = homePageData.artist_art;


  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, dataFetched]);

  // console.log(artistData.most_visited);
  return (
    <>
      <section className="Artist">
        <div className="container-fluid">
          <div className="row">
            <h3>The Artist, The Art</h3>
            {/* <!-- Nav tabs --> */}
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                  onClick={(e) => handleTabChange("home", e)}
                  data-bs-toggle="tab"
                  href="#home"
                >
                  Popular Artists
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "menu1" ? "active" : ""
                  }`}
                  onClick={(e) => handleTabChange("menu1", e)}
                  data-bs-toggle="tab"
                  href="#menu1"
                >
                  Most Visited
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "menu2" ? "active" : ""
                  }`}
                  onClick={(e) => handleTabChange("menu2", e)}
                  data-bs-toggle="tab"
                  href="#menu2"
                >
                  New Artists{" "}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeTab === "menu3" ? "active" : ""
                  }`}
                  onClick={(e) => handleTabChange("menu3", e)}
                  data-bs-toggle="tab"
                  href="#menu3"
                >
                  Trending
                </a>
              </li>
              <button type="button" className="btn btn-link">
                SELL AN ART
              </button>
            </ul>

            {/* <!-- Tab panes --> */}
            <div className="tab-content">
              <div className="viewbtn viewDesktop">
                <a href="/artist">
                  <button type="button" className="btn btn-link viewbtn">
                    View All
                  </button>
                </a>
              </div>
              <div
                className={`tab-pane container ${
                  activeTab === "home" ? "active" : "fade"
                }`}
                id="home"
              >
                <div className="inner-taber">
                  {artistData && artistData.papular_artist.length > 0 ? (
                    artistData.papular_artist.map((item, index) =>
                      item.user ? (
                        <>
                          <div className="item">
                            <div className="images">
                              <img
                                src={
                                  item.user.image
                                    ? `${ImageBaseUrl}${item.user.image}`
                                    : "/img/avatar.png"
                                }
                                alt={item.user.image}
                              />
                            </div>
                            <div className="content">
                              <h5>{item.user.name}</h5>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text-center">No Artist...</p>
                      )
                    )
                  ) : (
                    <p className="text-center">No Artist...</p>
                  )}
                </div>
              </div>
              <div
                className={`tab-pane container ${
                  activeTab === "menu1" ? "active" : "fade"
                }`}
                id="menu1"
              >
              <div className="inner-taber">
      {artistData && artistData.most_visited.length > 0 ? (
        artistData.most_visited.flat().map((item, index) => (
          item.user ? (
            <div className="item" key={index}>
              <div className="images">
                <img
                  src={
                    item.user.image
                      ? `${ImageBaseUrl}${item.user.image}`
                      : "/img/avatar.png"
                  }
                  alt={item.user.name}
                />
              </div>
              <div className="content">
                <h5>{item.user.name}</h5>
              </div>
            </div>
          ) : (
            <p className="text-center" key={index}>No Artist...</p>
          )
        ))
      ) : (
        <p className="text-center">No Artist...</p>
      )}
    </div>

              </div>
              <div
                className={`tab-pane container ${
                  activeTab === "menu2" ? "active" : "fade"
                }`}
                id="menu2"
              >
                <div className="inner-taber">
                  <div className="inner-taber">
                    {artistData && artistData.new_artist.length > 0 ? (
                      artistData.new_artist.map((item, index) => (
                        <div className="item">
                          <div className="images">
                            <img
                              src={
                                item.user.image
                                  ? `${ImageBaseUrl}${item.user.image}`
                                  : "img/no-image.png"
                              }
                              alt={item.user.image}
                            />
                          </div>
                          <div className="content">
                            <h5>{item.user.name}</h5>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane container ${
                  activeTab === "menu3" ? "active" : "fade"
                }`}
                id="menu3"
              >
                <div className="inner-taber">
                  <div className="inner-taber">
                    {artistData && artistData.trending.length > 0 ? (
                      artistData.trending.map((item, index) => (
                        <div className="item">
                          <div className="images">
                            <img
                              src={
                                item.user.image
                                  ? `${ImageBaseUrl}${item.user.image}`
                                  : "img/no-image.png"
                              }
                              alt={item.user.image}
                            />
                          </div>
                          <div className="content">
                            <h5>{item.user.name}</h5>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h4 className="text-center">No Artist...</h4>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="viewbtn">
              <button type="button" className="btn btn-link viewallBtn">
                View All
              </button>
              <button type="button" className="btn btn-link artBtn">
                Sell An Art
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Artist;
