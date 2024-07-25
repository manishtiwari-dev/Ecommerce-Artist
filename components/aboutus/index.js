"use client";
import React, { useState, useEffect } from "react";
import { AboutUsUrl } from "../../config";
import { toast } from "react-toastify";
const index = () => {
  const [aboutUsData, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await fetch(AboutUsUrl);
        const data = await response.json();
        setData(data.aboutUs);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching about us details");
        console.error("Error fetching about us details:", error);
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, []);


  return (
    <>
      <div className="section listing">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 className="">About Us</h1>
              {aboutUsData && (
                <div
                  dangerouslySetInnerHTML={{ __html: aboutUsData.description }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default index;
