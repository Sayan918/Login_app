"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import login_validate from "@lib/validate";

const LogIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const submit = () => {};
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      console.log(res);
      setProviders(res);
      console.log(session);
      console.log(`lll=${process.env.GOOGLE_ID}`);
    })();
  }, []);
  const onSubmit = async (values) => {
    console.log(values);
   const status= await signIn('credentials',{
      redirect:false,
      email:values.email,
      password:values.password,
      callbackUrl:"/"
    })
    console.log(status);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });
  console.log(formik.errors);

  return (
    <div className="px-10 py-6 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 className="font-bold text-center text-2xl mb-4">Magic Medics</h1>
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 ">
        <form className="px-5 " action="POST" onSubmit={formik.handleSubmit}>
          <label className="font-semibold py-5 text-sm text-gray-600 pb-1 block">
            E-mail
          </label>
          <div className="mb-4 mt-1">
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
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Password
          </label>
          <div className="mb-4 mt-1">
            <input
              type="password"
              name="password"
              className="border rounded-lg px-3 py-2  text-sm w-full"
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
            />
            {(formik.errors.password && formik.touched.password) ? (
              <span className="text-red-500 text-[8px] ">
                {formik.errors.password}
              </span>
            ) : (
              <></>
            )}
          </div>
          <button
            type="submit"
            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <span className="inline-block mr-2">Login</span>
          </button>
          <div className="grid grid-cols-2 gap-1 mt-3">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button className="transition duration-200 mx-5 px-5 py-2 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-top"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                <span className="inline-block ml-1">Forgot Password</span>
              </button>
            </div>
            <div className="text-center sm:text-right whitespace-nowrap">
              <button className="transition duration-200 mx-5 px-5 py-2 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-bottom	"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="inline-block ml-1">Help</span>
              </button>
            </div>
          </div>
        </form>
        <div className=""></div>
        <div className="py-2">
          <div className="px-4 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              {providers &&
                // Object.values(providers).map((provider) => (
                 
                  (<button
                    type="button"
                    onClick={() => {
                      // submit();
                      signIn("google");
                     
                    }}
                    // key={provider.name}
                    className="black_btn my-2 w-full h-10 "
                  >
                    <span className="place-content-center mr-2 flex flex-row">
                      <Image
                        src="/landing/googlelogo.svg"
                        width={20}
                        height={20}
                        className="mx-4"
                      />{" "}
                      {`SignIn with google`}
                    </span>
                  </button>)
                // ))
                }
            </div>
            <div className="text-center sm:text-right whitespace-nowrap"></div>
          </div>
        </div>
      </div>

      <div className="text-center py-5">
        Doesn't have an account?{" "}
        <Link className="inline-block text-cyan-500 ml-3 " href="/signup">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
