import React from "react";
import Lottie from "lottie-react";
import errorLottie from "../../assets/Lotties/Error.json";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
      style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
    >
      <Lottie
        style={{
          width: "100%",
          maxWidth: "520px",
          height: "auto",
        }}
        animationData={errorLottie}
        loop={true}
      />

      <p
        className="text-gray-600 mt-2"
        style={{ maxWidth: "480px", margin: "0 auto" }}
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
