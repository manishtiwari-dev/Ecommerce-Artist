
import { Providers } from "../redux/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { headers } from "next/headers";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
// import "bootstrap/dist/js/bootstrap.min.js";
import "./style.css";
export const metadata = {
  title: "Ray Artwala",
  description: "Ray Artwala",
};
import store from '../redux/store';

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        {/* <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap" rel="stylesheet" /> */}
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/> */}

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&di"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"></link>

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />

        {/* 
        <link
          href="/lib/lightbox/css/lightbox.min.css"
          rel="stylesheet"
        />
        <link
          href="/lib/owlcarousel/assets/owl.carousel.min.css"
          rel="stylesheet"
        /> */}

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> */}

      </head>
      <body>
        <Providers >

          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </Providers>
        {/* <script src="/lib/easing/easing.min.js"></script>
        <script src="/lib/waypoints/waypoints.min.js"></script>
        <script src="/lib/lightbox/js/lightbox.min.js"></script>
        <script src="/lib/owlcarousel/owl.carousel.min.js"></script> */}
      </body>
    </html>
  );
}
