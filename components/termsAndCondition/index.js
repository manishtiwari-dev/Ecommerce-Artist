"use client";
import React, { useState, useEffect } from "react";
import { TermsAndConditionUrl } from "../../config";
import { toast } from "react-toastify";

const index = () => {
  const [termsAndConditionData, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTermsAndCondition = async () => {
      try {
        const response = await fetch(TermsAndConditionUrl);
        const data = await response.json();
        setData(data.terms_conditions.terms_and_condition);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching terms and condition details");
        console.error("Error fetching terms and condition details:", error);
        setLoading(false);
      }
    };

    fetchTermsAndCondition();
  }, []);

  console.log(termsAndConditionData);

  return (
    <>
      <div className="section listing">
        <div className="container-fluid">
          <div className="row">
           
            <div className="col-md-12">
              <h1 className="">Terms & Conditions</h1>
              {termsAndConditionData && (
                <div
                  dangerouslySetInnerHTML={{ __html:termsAndConditionData }}
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
