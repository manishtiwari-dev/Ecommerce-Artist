"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import Link from "next/link";

const ShopSection = () => {
  const { products } = useSelector((state) => state.Product);

  const [showFruits, setShowFruits] = useState(true);
  const [showVegetables, setShowVegetables] = useState(false);
  const [showDryFruits, setShowDryFruits] = useState(false);
  const [showTab4, setShowTab4] = useState(false);

  const handleFruits = () => {
    setShowFruits(true);
    setShowVegetables(false);
    setShowDryFruits(false);
    setShowTab4(false);
  };
  const handleVegetables = () => {
    setShowFruits(false);
    setShowVegetables(true);
    setShowDryFruits(false);
    setShowTab4(false);
  };
  const handleDryFruits = () => {
    setShowFruits(false);
    setShowVegetables(false);
    setShowDryFruits(true);
    setShowTab4(false);
  };
  const handleTab4 = () => {
    setShowFruits(false);
    setShowVegetables(false);
    setShowDryFruits(false);
    setShowTab4(true);
  };

  return (
    <>
   


      <section className="collections Shop">
        <div className="container-fluid">
          <div className="row">
            <h3>Shop by Price</h3>
            <div className="collections-items">
              <div className="items">
                <div className="image">
                  <img src="/img/item9.png" alt="Painting" />
                </div>
                <div className="content">
                  <div className="inner-content">
                    <div className="text-col">
                      <h5>UNDER ₹10,000</h5>
                      <Link href={`/allProduct?minPrice=10000`}>
                      <button type="button" className="btn btn-link viewBtn">
                        View All
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="items">
                <div className="image">
                  <img src="/img/item10.png" alt="Digital Art" />
                </div>
                <div className="content">
                  <div className="inner-content">
                    <div className="text-col">
                      <h5>₹10,000 - ₹50,000</h5>
                      <Link href={`/allProduct?minPrice=10000&maxPrice=50000`}>                
                            <button type="button" className="btn btn-link viewBtn">
                        View All
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="items">
                <div className="image">
                  <img src="/img/item11.png" alt="Architecture" />
                </div>
                <div className="content">
                  <div className="inner-content">
                    <div className="text-col">
                      <h5>₹50,000 - ₹70,000</h5>
                      <Link href={`/allProduct?minPrice=50000&maxPrice=70000`}>
                      <button type="button" className="btn btn-link viewBtn">
                        View All
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="items">
                <div className="image">
                  <img src="/img/item12.png" alt="Drawing" />
                </div>
                <div className="content">
                  <div className="inner-content">
                    <div className="text-col">
                      <h5>₹70,000 - ₹90,000</h5>
                      <Link href={`/allProduct?minPrice=70000&maxPrice=90000`}>
                      <button type="button" className="btn btn-link viewBtn">
                        View All
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="items">
                <div className="image">
                  <img src="/img/item13.png" alt="Abstract" />
                </div>
                <div className="content">
                  <div className="inner-content">
                    <div className="text-col">
                      <h5>ABOVE ₹90,0000</h5>
                      <Link href={`/allProduct?minPrice=900000`}>
                      <button type="button" className="btn btn-link viewBtn">
                        View All
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopSection;
