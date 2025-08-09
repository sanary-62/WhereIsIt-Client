import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";

import registerLottie from "../../assets/Lotties/Register.json";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const Register = () => {
  const { createUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        fetch("https://whereisit-server-beta.vercel.app/jwt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        })
          .then(async (res) => {
            if (!res.ok) {
              const errorData = await res.json().catch(() => null);
              const message = errorData?.message || res.statusText;
              throw new Error(`JWT request failed: ${message}`);
            }
            return res.json();
          })
          .then((data) => {
            if (data.token) {
              localStorage.setItem("accessToken", data.token);

              Swal.fire({
                title: "Success!",
                text: "Registration Successful!",
                icon: "success",
                confirmButtonText: "OK",
              });

              toast.success("Welcome to WhereIsIt!");
              navigate("/");
              form.reset();
            } else {
              toast.error("Failed to get token");
            }
          })
          .catch((err) => {
            console.error("JWT fetch error:", err);
            toast.error("Token error: " + err.message);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();

        localStorage.setItem("accessToken", token);

        console.log("Logged in with Google, token:", token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        toast.error("Google login failed: " + error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center max-w-7xl mx-auto w-full">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 hidden sm:flex justify-center">
  <Lottie
    className="w-full max-w-[450px] sm:max-w-[350px] md:max-w-[400px]"
    animationData={registerLottie}
    loop={true}
  />
</div>

        <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6 sm:p-10 rounded-lg">
          <div className="card-body">
            <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-6 text-center lg:text-left">
              Register now!
            </h1>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="label block mb-1 font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="input input-bordered w-full"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="label block mb-1 font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  required
                />
              </div>

              <div>
                <label
                  className="label block mb-1 font-semibold"
                  htmlFor="photoURL"
                >
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photoURL"
                  id="photoURL"
                  className="input input-bordered w-full"
                  placeholder="Photo URL"
                  required
                />
              </div>

              <div>
                <label
                  className="label block mb-1 font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  required
                />
              </div>

              <div>
                <Link
                  to="/login"
                  className="link link-hover text-blue-700 text-sm"
                >
                  Already have an account? Login
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-neutral w-full mt-4 bg-blue-900 text-white"
              >
                Register
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-500 text-sm">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="btn bg-blue-100 w-full flex items-center justify-center gap-2 text-gray-500"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
