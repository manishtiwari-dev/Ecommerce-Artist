"use client";
import React, { useEffect, useState } from "react";
import { ImageBaseUrl, ArtistListUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const index = () => {
  const [activeTab, setActiveTab] = useState("tab1"); // Default tab is

  // Function to handle tab changes
  const handleTabChange = (tabId, event) => {
    event.preventDefault();
    setActiveTab(tabId);
  };

  // const dispatch = useDispatch();
  // const { homePageData, loading, dataFetched } = useSelector(
  //   (state) => state.Home
  // );
  // const artistData = homePageData.artist_art;

  // useEffect(() => {
  //   if (!dataFetched) {
  //     dispatch(fetchHomeData());
  //   }
  // }, [dispatch, dataFetched]);

  const [allartistData, setAllArtistData] = useState(null);
  const [popularArtistData, setpopularArtistData] = useState(null);
  const [newArtistData, setNewArtistData] = useState(null);
  const [trendingArtistData, settrendingArtistData] = useState(null);
  const [mostVisitedArtistData, setmostVisitedArtistData] = useState(null);

  

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`${ArtistListUrl}`);
        const data = await response.json();
        console.log('data', data);
        setAllArtistData(data.artist.all_artist);
        setpopularArtistData(data.artist.papular_artist);
        setNewArtistData(data.artist.new_artist);
        settrendingArtistData(data.artist.trending);
        setmostVisitedArtistData(data.artist.most_visited);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching artist details:", error);
        setLoading(false);
      }
    };

    fetchArtist();
  }, []);


  console.log(newArtistData);

  return (
    <>
      <div className="section arist-listing spaceingtop">
        <div className="container-fluid p-0">
          <div className="row   main-box">
            <div className="col-4">
              <div className="heading">
                <h3>Our Artists</h3>
              </div>
            </div>

            <div className="col-8">
              <div className="seach-wrap">
                <div className="input">
                  <input type="search" />
                </div>
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M14.2924 15.6C12.8057 16.7541 10.9352 17.2981 9.0616 17.1215C7.18798 16.9449 5.45207 16.0609 4.20723 14.6494C2.9624 13.2379 2.30221 11.405 2.36104 9.52389C2.41988 7.64276 3.19332 5.85475 4.52393 4.52382C5.85477 3.19313 7.64267 2.41964 9.52368 2.3608C11.4047 2.30196 13.2374 2.96219 14.6488 4.20711C16.0602 5.45202 16.9442 7.18804 17.1208 9.06179C17.2974 10.9355 16.7534 12.8062 15.5994 14.2929L19.348 18.0417C19.4697 18.1547 19.5587 18.2985 19.6056 18.4579C19.6525 18.6173 19.6555 18.7864 19.6144 18.9473C19.5732 19.1083 19.4894 19.2552 19.3718 19.3725C19.2542 19.4898 19.1071 19.5732 18.946 19.614C18.7853 19.6552 18.6164 19.6523 18.4571 19.6056C18.2978 19.559 18.1541 19.4703 18.0409 19.3488L14.2924 15.6ZM15.3035 9.75488C15.3145 9.01943 15.1791 8.28914 14.9053 7.60649C14.6314 6.92385 14.2246 6.30247 13.7084 5.77851C13.1922 5.25455 12.577 4.83846 11.8986 4.55445C11.2201 4.27045 10.492 4.12419 9.7565 4.12419C9.02102 4.12419 8.29287 4.27045 7.61443 4.55445C6.93598 4.83846 6.32078 5.25455 5.80461 5.77851C5.28843 6.30247 4.88159 6.92385 4.60775 7.60649C4.33391 8.28914 4.19853 9.01943 4.20949 9.75488C4.23122 11.2118 4.82519 12.6017 5.86309 13.6243C6.90099 14.6469 8.2995 15.2201 9.7565 15.2201C11.2135 15.2201 12.612 14.6469 13.6499 13.6243C14.6878 12.6017 15.2818 11.2118 15.3035 9.75488Z"
                      fill="#6A5B9C"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="tabber-wrapper">
                <div className="tabber">
                  <ul className="tabber-list">
                    <li>
                      <a
                        className={`nav-link ${
                          activeTab === "tab1" ? "active" : ""
                        }`}
                        onClick={(e) => handleTabChange("tab1", e)}
                        //  data-bs-toggle="tab"
                        href="#tab1"
                      >
                        Popular Artist
                      </a>

                      {/* <a href="#tab1">Popular Artist</a> */}
                    </li>
                    <li>
                      <a
                        className={`nav-link ${
                          activeTab === "tab2" ? "active" : ""
                        }`}
                        onClick={(e) => handleTabChange("tab2", e)}
                        href="#tab2"
                      >
                        Most Visited
                      </a>
                    </li>
                    <li>
                      <a
                        className={`nav-link ${
                          activeTab === "tab3" ? "active" : ""
                        }`}
                        onClick={(e) => handleTabChange("tab3", e)}
                        href="#tab3"
                      >
                        New Artists{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        className={`nav-link ${
                          activeTab === "tab4" ? "active" : ""
                        }`}
                        onClick={(e) => handleTabChange("tab4", e)}
                        href="#tab4"
                      >
                        Trending{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        className={`nav-link ${
                          activeTab === "tab5" ? "active" : ""
                        }`}
                        onClick={(e) => handleTabChange("tab5", e)}
                        // data-bs-toggle="tab"
                        href="#tab5"
                      >
                        All Artist{" "}
                      </a>

                      {/* <a href="#tab5">All Artists</a> */}
                    </li>
                  </ul>
                </div>
                <div className="tabber-content-wrapper">
                  <div
                    className="tabber-content"
                    id="tab1"
                    style={{ display: activeTab === "tab1" ? "block" : "none" }}
                  >
                  
                  {popularArtistData && popularArtistData.length > 0 ? (
                      popularArtistData.map((item, index) =>
                        item.user ? (
                          <>
                            <div className="row">
                              <div className="col-10">
                                <div className="row">
                                  <div className="col-left">
                                    <div className="image">
                                      <img
                                        src={
                                          item.user.image
                                            ? `${ImageBaseUrl}${item.user.image}`
                                            : "/img/avatar.png"
                                        }
                                        alt={item.user.name}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-right">
                                    <div className="content">
                                    <h4>{item.user.name}</h4>
                                      <ul>
                                        <li>{item.user.address}</li>
                                        <li>{item.products_count}</li>
                                      </ul>
                                      <p>
                                       {item.bio}{" "}
                                      </p>
                                      <div className="btn-group">
                                      <Link href={`/artist-profile/${item && item.artist_number}`}>

                                        <button
                                          type="button"
                                          className="btn btn-link"
                                        >
                                          View Artist Page
                                        </button>
                                        </Link>
                                        {/* <button
                                          type="button"
                                          className="btn btn-link"
                                        >
                                          Follow
                                        </button> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row artist-listing-box">
                                  {item.products &&
                                    item.products.map((prd, index1) => (
                                      <div className="col">
                                        <img
                                          className="w-100"
                                          src={
                                            prd.thumb_image
                                              ? `${ImageBaseUrl}${prd.thumb_image}`
                                              : "/img/no-image1.png"
                                          }
                                          // alt={item.user.name}
                                        />
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <hr className="border-spacing" />
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
                  <div
                    className="tabber-content"
                    id="tab2"
                    style={{ display: activeTab === "tab2" ? "block" : "none" }}
                  >
                  
                  {mostVisitedArtistData && mostVisitedArtistData.length > 0 ? (
                      mostVisitedArtistData.flat().map((item, index) =>
                        item.user ? (
                          <>
                            <div className="row">
                              <div className="col-10">
                                <div className="row">
                                  <div className="col-left">
                                    <div className="image">
                                      <img
                                        src={
                                          item.user.image
                                            ? `${ImageBaseUrl}${item.user.image}`
                                            : "/img/avatar.png"
                                        }
                                        alt={item.user.name}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-right">
                                    <div className="content">
                                    <h4>{item.user.name}</h4>
                                      <ul>
                                        <li>{item.user.address}</li>
                                        <li>{item.products_count}</li>
                                      </ul>
                                      <p>
                                      {item.bio}{" "}
                                      </p>
                                      <div className="btn-group">
                                      <Link href={`/artist-profile/${item && item.artist_number}`}>

                                        <button
                                          type="button"
                                          className="btn btn-link"
                                        >
                                          View Artist Page
                                        </button>
                                        </Link>
                                        {/* <button
                                          type="button"
                                          className="btn btn-link"
                                        >
                                          Follow
                                        </button> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row artist-listing-box">
                                  {/* <div className="col">
                            <img
                              src="img/arist-listing1.png"
                              className="w-100"
                              alt=""
                            />
                          </div>
                          <div className="col">
                            <img
                              src="img/arist-listing1.png"
                              className="w-100"
                              alt=""
                            />
                          </div>
                          <div className="col">
                            <img
                              src="img/arist-listing1.png"
                              className="w-100"
                              alt=""
                            />
                          </div>
                          <div className="col">
                            <img
                              src="img/arist-listing1.png"
                              className="w-100"
                              alt=""
                            />
                          </div> */}
                                  {item.products &&
                                    item.products.map((prd, index1) => (
                                      <div className="col">
                                        <img
                                          className="w-100"
                                          src={
                                            prd.thumb_image
                                              ? `${ImageBaseUrl}${prd.thumb_image}`
                                              : "/img/no-image1.png"
                                          }
                                          // alt={item.user.name}
                                        />
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <hr className="border-spacing" />
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
                  <div
                    className="tabber-content"
                    id="tab3"
                    style={{ display: activeTab === "tab3" ? "block" : "none" }}
                  >
                     {newArtistData && newArtistData.length > 0 ? (
                      newArtistData.map((item, index) =>
                        item.user ? (
                          <>
                            <div className="row">
                              <div className="col-10">
                                <div className="row">
                                  <div className="col-left">
                                    <div className="image">
                                      <img
                                        src={
                                          item.user.image
                                            ? `${ImageBaseUrl}${item.user.image}`
                                            : "/img/avatar.png"
                                        }
                                        alt={item.user.name}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-right">
                                    <div className="content">
                                    <h4>{item.user.name}</h4>
                                      <ul>
                                        <li>{item.user.address}</li>
                                        <li>{item.products_count}</li>
                                      </ul>
                                      <p>
                                      {item.bio}{" "}
                                      </p>
                                      <div className="btn-group">
                                      <Link href={`/artist-profile/${item && item.artist_number}`}>
                                        <button
                                          type="button"
                                          className="btn btn-link"
                                        >
                                          View Artist Page
                                        </button>
                                        </Link>
                                        {/* <button
                                          type="button"
                                          className="btn btn-link"
                                        >
                                          Follow
                                        </button> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row artist-listing-box">
                                  {item.products &&
                                    item.products.map((prd, index1) => (
                                      <div className="col">
                                        <img
                                          className="w-100"
                                          src={
                                            prd.thumb_image
                                              ? `${ImageBaseUrl}${prd.thumb_image}`
                                              : "/img/no-image1.png"
                                          }
                                          // alt={item.user.name}
                                        />
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <hr className="border-spacing" />
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
                  <div
                    className="tabber-content"
                    id="tab4"
                    style={{ display: activeTab === "tab4" ? "block" : "none" }}
                  >
                      {trendingArtistData && trendingArtistData.length > 0 ? (
                      trendingArtistData.map((item, index) =>
                        item.user ? (
                          <>
                            <div className="row">
                              <div className="col-10">
                                <div className="row">
                                  <div className="col-left">
                                    <div className="image">
                                      <img
                                        src={
                                          item.user.image
                                            ? `${ImageBaseUrl}${item.user.image}`
                                            : "/img/avatar.png"
                                        }
                                        alt={item.user.name}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-right">
                                    <div className="content">
                                      <h4>{item.user.name}</h4>
                                      <ul>
                                        <li>{item.user.address}</li>
                                        <li>{item.products_count}</li>
                                      </ul>
                                      <p>
                                      {item.bio}{" "}
                                      </p>
                                      <div className="btn-group">
                                      <Link href={`/artist-profile/${item && item.artist_number}`}>
                                        <button
                                          type="button"
                                          className="btn btn-link"
                                        >
                                          View Artist Page
                                        </button>
                                        </Link>
                                        {/* <button
                                          type="button"
                                          className="btn btn-link"
                                        >
                                          Follow
                                        </button> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-2">
                                <div className="row artist-listing-box">
                                  {item.products &&
                                    item.products.map((prd, index1) => (
                                      <div className="col">
                                        <img
                                          className="w-100"
                                          src={
                                            prd.thumb_image
                                              ? `${ImageBaseUrl}${prd.thumb_image}`
                                              : "/img/no-image1.png"
                                          }
                                          // alt={item.user.name}
                                        />
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <hr className="border-spacing" />
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
                  <div
                    className="tabber-content"
                    id="tab5"
                    style={{ display: activeTab === "tab5" ? "block" : "none" }}
                  >
                    {allartistData && allartistData.length > 0 ? (
                      allartistData.map((item, index) =>
                        item.user ? (
                          <>
                            <div className="row">
                              <div className="col-10">
                                <div className="row">
                                  <div className="col-left">
                                    <div className="image">
                                      <img
                                        src={
                                          item.user.image
                                            ? `${ImageBaseUrl}${item.user.image}`
                                            : "/img/avatar.png"
                                        }
                                        alt={item.user.name}
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="col-right">
                                    <div className="content">
                                      <h4>{item.user.name}</h4>
                                      <ul>
                                        <li>{item.user.address}</li>
                                        <li className="">
                                          {item.products_count}
                                        </li>
                                      </ul>
                                      <p>
                                      {item.bio}{" "}
                                      </p>
                                      <div className="btn-group">
                                      <Link href={`/artist-profile/${item && item.artist_number}`}>

                                        <button
                                          type="button"
                                          className="btn btn-link"
                                        >
                                          View Artist Page
                                        </button>
                                        </Link>
                                        {/* <button
                                          type="button"
                                          className="btn btn-link"
                                        >
                                          Follow
                                        </button> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-2">
                                <div className="row artist-listing-box">
                                  {item.products &&
                                    item.products.map((prd, index1) => (
                                      <div className="col">
                                        <img
                                          className="w-100"
                                          src={
                                            prd.thumb_image
                                              ? `${ImageBaseUrl}${prd.thumb_image}`
                                              : "/img/no-image1.png"
                                          }
                                          // alt={item.user.name}
                                        />
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <hr className="border-spacing" />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
