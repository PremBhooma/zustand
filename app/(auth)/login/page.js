"use client";

import { useUserInfo } from "@/zustand/useUserInfo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASEURL } from "@/configs/constant";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const isLogged = useUserInfo((state) => state.isLogged);
  const hasHydrated = useUserInfo((state) => state.hasHydrated); // Check hydration
  const updateUserinfo = useUserInfo((state) => state.updateUserInfo);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const updateEmail = (e) => {
    let value = e.target.value;
    setEmail(value);
    setEmailError("");
  };

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const updatePassword = (e) => {
    let value = e.target.value;
    setPassword(value);
    setPasswordError("");
  };

  // Redirect if already logged in
  useEffect(() => {
    if (hasHydrated && isLogged) {
      router.push("/");
    }
  }, [hasHydrated, isLogged, router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "") {
      setEmailError("Email is required");
      return false;
    }
    if (password === "") {
      setPasswordError("Password is required");
      return false;
    }

    await axios
      .post(`${BASEURL}api/user/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        setEmail("");
        setPassword("");
        updateUserinfo(response?.data?.data);
        router.push("/"); // Redirect after successful login
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  // Show loader until hydration is complete
  if (!hasHydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div className="space-y-2">
                <div>
                  <Label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </Label>
                  <div className="mt-2">
                    <Input type="email" name="email" id="email" autoComplete="email" value={email} onChange={updateEmail} required />
                  </div>
                </div>
                {emailError !== "" && <div className="text-xs text-red-500">{emailError}</div>}
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </Label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Input type="password" name="password" id="password" autoComplete="current-password" value={password} onChange={updatePassword} required />
                  </div>
                </div>
                {passwordError !== "" && <div className="text-xs text-red-500">{passwordError}</div>}
              </div>
              <div>
                <button onClick={handleLogin} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
