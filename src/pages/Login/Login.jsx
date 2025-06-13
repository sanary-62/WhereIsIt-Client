import React, { useContext } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import loginLottie from "../../assets/Lotties/Login.json";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        console.log("Logged in with Google:", result.user);
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie
            style={{ width: "520px" }}
            animationData={loginLottie}
            loop={true}
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold text-blue-800">Login now!</h1>
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <div>
                  <Link
                    to="/register"
                    className="link link-hover text-blue-700"
                  >
                    Do not have an account? Register
                  </Link>
                </div>
                <button className="btn btn-neutral mt-4 bg-blue-900 text-white">
                  Login
                </button>
              </fieldset>
            </form>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="btn mt-2 bg-blue-100 w-full flex items-center justify-center gap-2 text-gray-500"
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

export default Login;
