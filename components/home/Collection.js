"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../../redux/reducer/homePageReducer";
import { ImageBaseUrl } from "../../config";
import SkeletonCollectionCard from "../../helpers/SkeletonCollectionCard";
import Link from "next/link";



const Collection = () => {
  const dispatch = useDispatch();
  const homeData = useSelector((state) => state.Home);
  const data = homeData.homePageData;

  const [fetchdata, setHomeData] = useState([]);
  useEffect(() => {
    setHomeData(dispatch(fetchHomeData()));
  }, []);

  return (
    <>
      {data.normalCategory ? (
        // Render actual content when data is available
        <section className="collections">
          <div className="container-fluid">
            <div className="row">
              <h3>Discover by Collections</h3>
              <div className="collections-items">
                {Array.isArray(data.normalCategory) &&
                data.normalCategory.length > 0 ? (
                  // Map through the data to render items
                  data.normalCategory.map((item) => (
                    <div className="items" key={item.id}>
                      <Link  href={`/art-category/${item.slug}`}>
                      <div className="image">
                        <img
                          src={`${ImageBaseUrl}${item.image}`}
                          alt={item.name}
                        />
                      </div>
                      </Link>
                      <div className="content">
                        <h5>
                        <Link  href={`/art-category/${item.slug}`}>    {item.name}   </Link>
                          <span>
                            {item.products_count} + {item.name}
                          </span>
                        </h5>
                      </div>
                    </div>
                  ))
                ) : (
                  // Render a message or fallback content if data is empty
                  <p>No items found.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Render skeleton loading component while waiting for data
        <SkeletonCollectionCard />
      )}
    </>
  );
  
};
export default Collection;
