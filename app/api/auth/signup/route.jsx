// import  connectToDB  from "@utlis/db"
import User from "@models/user"
import { connectToDB } from "@utlis/db"

import {hash} from 'bcryptjs'
import express from "express"
import { NextApiRequest, NextApiResponse } from 'next'
// import { errorToJSON } from "next/dist/server/render"
import { NextResponse } from "next/server"
export const POST = async(request)=>{
    // connectToDB().catch(error =>{
    //     res.json({
    //         error:"connection failed"
    //     })
    // })
     connectToDB();
//     if(req.method ==="POST"){
        // const data = await request.json();
        // if(!request){
        //    return res.status(404).json({
        //     error:"Dont have form data "
        //    }) 

//         console.log("Dont have form data ");
        // return new Response( "dont have data",{
        //     status: 404
        //   });
          
        // }
        const {username ,email ,password} = await request.json();
        // console.log(email);
//         // return new Response("llll", {
//         //     status: 404
            
//         //   });
//         console.log(req.body);
        const checkexisting = await User.findOne({email:email}).populate("email");
        // console.log(checkexisting.password)
        
        
        if(checkexisting && checkexisting.password !== "000000"){
            // return res.status(422).json({message :"User Already Exists"});
           
           
            return new Response( "User Already exists",{
                status: 422
                
              });
        }
        
        else if(checkexisting){
        checkexisting.password = await hash(password,12)
        await checkexisting.save();
        return new Response( "User Already exists",{
                status: 202
                
              });
        }

//         // {message :"User Already Exists"}

        User.create(
            {
                username: username,
                email :email,
                password : await hash(password,12)

            
                
                })
                return new Response( "Succesfully created" ,{
                        status: 200
                        
                      });
            
//         return new Response( {
//             status: 422,
//             message :"User Already Exist22s"
//           });
    

//     }
//    else{
//     res.status(500).json({
//         message:"HTTP method not valid only post accepted"
//     })
//    }
   

}
