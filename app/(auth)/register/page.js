"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASEURL } from "@/configs/constant";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const updateName = (e) => {
    let value = e.target.value;
    setName(value);
    setNameError("");
  };

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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let error = false;

      if (name === "") {
        setNameError("Name is required");
        error = true;
      }
      if (email === "") {
        setEmailError("Email is required");
        error = true;
      }
      if (password === "") {
        setPasswordError("Password is required");
        error = true;
      }

      if (!error) {
        const response = await axios.post(`${BASEURL}api/user/create`, {
          name: name,
          email: email,
          password: password,
        });

        if (response?.data?.errorCode === 0) {
          setName("");
          setEmail("");
          setPassword("");
          router.push("/login");
        } else {
          console.log(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="min-h-screen">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign up to your account</h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div className="space-y-2">
                <div>
                  <Label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                    Name
                  </Label>
                  <div className="mt-2">
                    <Input type="text" name="name" id="name" autoComplete="name" value={name} onChange={updateName} required />
                  </div>
                </div>
                {nameError !== "" && <div className="text-xs text-red-500">{nameError}</div>}
              </div>
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
                  </div>
                  <div className="mt-2">
                    <Input type="password" name="password" id="password" autoComplete="current-password" value={password} onChange={updatePassword} required />
                  </div>
                </div>
                {passwordError !== "" && <div className="text-xs text-red-500">{passwordError}</div>}
              </div>
              <div>
                <button onClick={handleRegister} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign up
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
