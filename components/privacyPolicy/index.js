"use client";
import React, { useState ,useEffect} from "react";
import { PrivacyPolicyUrl } from "../../config";
import { toast } from "react-toastify";

const index = () => {

    const [privacyPolicyData, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPrivacyPolicy = async () => {
        try {
          const response = await fetch(
            PrivacyPolicyUrl 
          );
          const data = await response.json();
          setData(data.privacyPolicy);
          setLoading(false);
        } catch (error) {
            toast.error("Error fetching privacy policy details");
          console.error("Error fetching privacy policy details:", error);
          setLoading(false);
        }
      };
  
      fetchPrivacyPolicy();
    }, []);
  
    console.log(privacyPolicyData);


  return (
    <>
      <div className="section listing">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 className="">Privacy Policy</h1>
              {privacyPolicyData && (
                <div
                  dangerouslySetInnerHTML={{ __html: privacyPolicyData.privacy_policy }}
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
