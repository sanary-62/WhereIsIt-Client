import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

import registerLottie from "../../assets/Lotties/Register.json";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!uppercaseRegex.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!lowercaseRegex.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    Swal.fire({
      title: "Success!",
      text: "Registration Successful!",
      icon: "success",
      confirmButtonText: "OK",
    });

    form.reset();

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Welcome to WhereIsIt!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie
            style={{ width: "450px" }}
            animationData={registerLottie}
            loop={true}
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold text-blue-800">Register now!</h1>
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Your Name"
                  required
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                <label className="label">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  className="input"
                  placeholder="Photo URL"
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
                  <Link to="/login" className="link link-hover text-blue-700">
                    Already have an account? Login
                  </Link>
                </div>

                <button className="btn btn-neutral mt-4 bg-blue-900 text-white">
                  Register
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
