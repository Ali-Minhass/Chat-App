import React, { useState } from "react";
import assets from "../assets/assets";

const LoginPage = () => {
  const [currState, setCurrState] = useState("SignUp");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "SignUp" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    // Final form submission logic here
    alert(`${currState} form submitted successfully!`);
  };

  const handleStateSwitch = () => {
    setCurrState(currState === "Login" ? "SignUp" : "Login");
    setIsDataSubmitted(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setBio("");
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-10 sm:justify-evenly max-sm:flex-col px-6 py-10 bg-[url('/your-background.jpg')] backdrop-blur-lg">
      {/* Left: Logo */}
      <img
        src={assets.logo_big}
        alt="logo-big"
        className="w-[min(30vw,250px)] max-w-[250px]"
      />

      {/* Right: Form */}
      <form
        onSubmit={onSubmitHandler}
        className="border border-white/20 bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-xl flex flex-col gap-6 w-full max-w-sm"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold tracking-wide">{currState}</h2>
          <img
            src={assets.arrow_icon}
            alt="toggle-form"
            className="w-5 cursor-pointer"
            onClick={handleStateSwitch}
          />
        </div>

        {/* SignUp Step 1: Full Name, Email, Password */}
        {!isDataSubmitted && (
          <>
            {currState === "SignUp" && (
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                placeholder="Full Name"
                className="p-3 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            )}

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="p-3 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="p-3 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </>
        )}

        {/* SignUp Step 2: Bio */}
        {currState === "SignUp" && isDataSubmitted && (
          <textarea
            rows={4}
            className="p-3 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            placeholder="Tell us about yourself..."
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-violet-600 hover:from-purple-500 hover:to-violet-700 text-white py-2 rounded-full font-medium shadow-md transition-all duration-300"
        >
          {currState}
        </button>

        {/* Terms & Conditions */}
        {!isDataSubmitted && (
          <div className="flex items-start gap-2 text-sm text-white/80">
            <input type="checkbox" required className="mt-1" />
            <p>
              I agree to the{" "}
              <span className="text-purple-300 hover:text-white underline cursor-pointer">
                Terms and Conditions
              </span>
            </p>
          </div>
        )}

        {/* Switch Prompt */}
        <p className="text-sm text-center text-white/70">
          {currState === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            className="text-purple-300 hover:text-white cursor-pointer underline"
            onClick={handleStateSwitch}
          >
            {currState === "Login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
