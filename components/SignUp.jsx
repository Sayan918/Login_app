"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";
import { IMAGES_MANIFEST } from "next/dist/shared/lib/constants";
import {signup_validate }from "@lib/validate";

import { useFormik } from "formik";
const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [eye, seteye] = useState("password");
  const [show, setshow] = useState("/eyeclosed.svg");
  const submit = () => {};
  const icon = () => {
    if (eye == "password") {
      seteye("text");
    } else {
      seteye("password");
    }
    if (show == "/eyeopened.svg") {
      setshow("/eyeclosed.svg");
    } else {
      setshow("/eyeopened.svg");
    }
  };
  const onSubmit = async (values) => {
    // const ress=JSON.stringify(values)
    // console.log(ress);
   
    try{const response = await fetch("/api/auth/signup",{
      method:"POST",
   
      body:JSON.stringify(({
        username:values.username,
        email:values.email,
        password:values.password
      }))
    })
    if(response.ok){
      console.log("ll");
    }else{
      console.log(response)
    }}catch(err){
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      conpassword: "",
    },
    validate: signup_validate,
    onSubmit,
  });
  return (
    <div className="px-10 py-5 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 className="font-bold text-center text-2xl mb-3">Magic Medics</h1>
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 ">
        <form
          className="px-5 py-3"
          action="POST"
          onSubmit={formik.handleSubmit}
        >
          <label
            className="font-semibold text-sm text-gray-600 pb-1 block"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          >
            Name
          </label>
          <div className=" mt-1 mb-2 py-0">
          <input
            type="text"
            name="username"
            className="border rounded-lg px-3 py-2 text-sm w-full"
            placeholder="Enter name"
            {...formik.getFieldProps("username")}
          />
          {(formik.errors.username && formik.touched.username) ? (
            <span className="text-red-500 text-[8px] ">
              {formik.errors.username}
            </span>
          ) : (
            <></>
          )}
          </div>
          
          <label
            className="font-semibold text-sm text-gray-600 pb-1 block"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          >
            E-mail
          </label>
         <div  className=" mt-1 mb-2 py-0">
          <input
            type="email"
            name="email"
            className="border rounded-lg px-3 py-2  text-sm w-full"
            placeholder="Enter email"
            {...formik.getFieldProps("email")}
          />
          {(formik.errors.email && formik.touched.email) ? (
            <span className="text-red-500 text-[8px] ">
              {formik.errors.email}
            </span>
          ) : (
            <></>
          )}
          </div>
          <div className="flex flex-row ">
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            >
              Password
            </label>
            <Image
              className="mx-4"
              src={show}
              width={15}
              height={15}
              onClick={icon}
            />
          </div>
          
            {" "}
            <div  className=" mt-1 mb-2 py-0">
            <input
              type={eye}
              name="password"
              className="border rounded-lg px-3 py-2  text-sm w-full"
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
            />
            {(formik.errors.password && formik.touched.password )? (
              <span className="text-red-500 text-[8px] ">
                {formik.errors.password}
              </span>
            ) : (
              <></>
            )}
            </div>
          
          <div className="flex flex-row ">
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            >
              Confirm Password
            </label>
            <Image
              className="mx-4"
              src={show}
              width={15}
              height={15}
              onClick={icon}
            />
          </div><div  className=" mt-1 mb-2 py-0">

          <input
             type={eye}
            name="password"
            className="border rounded-lg px-3 py-2  text-sm w-full"
            placeholder="Enter password"
            {...formik.getFieldProps("conpassword")}
          />
          {(formik.errors.conpassword && formik.touched.conpassword) ? (
            <span className="text-red-500 text-[8px] mx-[1px]">
              {formik.errors.conpassword}
            </span>
          ) : (
            <></>
          )}
          </div>
          <button
            type="submit"
            onClick={submit}
            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <span className="inline-block mr-2">SignUp</span>
          </button>
        </form>
      </div>

      <div className="text-center py-3">
        Already have an Account?{" "}
        <Link className="inline-block text-cyan-500 ml-3 " href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
