import React from "react";
import Lottie from "lottie-react";
import contactLottie from "../../assets/Lotties/contact-us.json";

const Contact = () => {
  return (
    <div className="bg-gray-100 flex flex-col md:flex-row justify-center items-center py-12 px-4 md:px-12 gap-10">
      <section className="text-gray-800 max-w-7xl mx-auto flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-800 text-center">Contact Us</h2>
        <p className="mb-4 max-w-xl text-center text-xs text-gray-600">
          Have questions or need help recovering your lost items? Feel free to reach out to us!
        </p>
        <form className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-blue-600" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              type="text"
              id="name"
              placeholder="Your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-blue-600" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              type="email"
              id="email"
              placeholder="Your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-blue-600" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              id="message"
              rows="4"
              placeholder="Write your message"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Send Message
          </button>
        </form>
      </section>

      <div className="w-full max-w-xl">
        <Lottie
          style={{
            width: "100%",
            maxHeight: "600px",
            height: "auto",
          }}
          animationData={contactLottie}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Contact;
