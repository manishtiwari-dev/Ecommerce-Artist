import FeatureSection from "../components/home/FeatureSection";
import HeroSection from "../components/home/HeroSection";
import Collection from "../components/home/Collection";
import ShopSection from "../components/home/ShopSection";
import ArtistGallery from "../components/home/ArtistGallery";
import LatestCollection from "../components/home/LatestCollection";
import ArtStyle from "../components/home/ArtStyle";
import Artist from "../components/home/Artist";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import React from "react";

const page = () => {
  return (
    <>
      <HeroSection />
      <Collection />
      <FeatureSection />
      <ShopSection />
      <ArtistGallery />
      <LatestCollection />
      <ArtStyle />
      <Artist />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default page;
