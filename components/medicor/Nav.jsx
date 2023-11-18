"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState ,useEffect } from "react";
const Nav = () => {
    const { data: session } = useSession();
    
  const [myDetails, setMydetails] = useState([]);
  let listener = null
  const [scrollState, setScrollState] = useState("top")
  
  useEffect(() => {
    listener = document.addEventListener("scroll", e => {
      let scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 120) {
        if (scrollState !== "bg-transparent") setScrollState("bg-white")
      } else {
        if (scrollState !== "bg-white") setScrollState("bg-transparent")
      }
    })
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [scrollState])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${session?.user?.id}/details`);
      // console.log(response.json())
      const data = await response.json();
      console.log(data)
    //   console.log(data[0].creatortype)

      setMydetails(data[0].creator.image);
    };
   
    console.log(session?.user?.id)
    if (session?.user?.id) fetchPosts();
}, [session?.user?.id]);

  return (
    
    <div className={`sticky top-5 z-50 ${scrollState} w-full`}>
        <div  className={`  flex flex-row   `}>
           
      {" "}
  <div className="basis-2/12 " >
 
      <Image
        src="/logo-transparent-svg.svg"
        width={60}
        height={60}
        alt="mm"
        className="h-12   "
      ></Image>
</div>
<div className="basis-6/12 flex flex-row">
      <h1 className="mt-2 text-2xl font-serif mx-4 basis">
        Home
      </h1>
      <h1 className="mt-2 text-2xl font-serif mx-4  ">
        Medicine
      </h1>
      <h1 className="mt-2 text-2xl font-serif mx-4 ">
        Oral Care
      </h1>
      <h1 className="mt-2 text-2xl font-serif mx-4 ">
        Body Care
      </h1>
      <h1 className="mt-2 text-2xl font-serif mx-4 ">
        Ayurveda
      </h1>
      </div>
      <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />


<div className="basis-2/12 max-w-2xl mx-auto">

	<form className="flex items-center">   
        <label for="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
        </div>
        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
    </form>

	
    <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
</div>
     <div className=" ml-6 basis-1/12">
        <Image  src="/addtobag.png"  width={40}
        height={40} alt="mm"/>
     </div>
     <div className="basis-1/12">
     <Link href='/profile'>
              <Image
                src={myDetails}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
     </div>
     </div>
      </div>
   
  );
};

export default Nav;
