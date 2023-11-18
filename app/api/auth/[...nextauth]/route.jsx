import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import User from '@models/user';
import { connectToDB } from '@utlis/db';
import { compare } from 'bcryptjs';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // async session({ session }) {

      //   const sessionUser = await User.findOne({ email: session.user.email });
      //   session.user.id = sessionUser._id.toString();
      //    console.log("llll")
      //   return session;
      // },
      // async signIn({ account, profile, user, credentials }) {
      //   try {
      //     await connectToDB();
      //     console.log(profile)
      //     // check if user already exists
      //     const userExists = await User.findOne({ email: profile.email ||credentials.email });
        
      //     // if not, create a new document and save user in MongoDB
      //     if (!userExists) {
      //       await User.create({
      //         email: profile.email,
      //         username: profile.name.replace(" ", "").toLowerCase(),
      //         image: profile.picture,
      //         password:"000000",
      //       });
      //     }
  
      //     return true
      //   } catch (error) {
      //     console.log("Error checking if user exists: ", error.message);
      //     return false
      //   }
      // },
   
    // callbacks: {
    //   async session({ session }) {
  
    //     const sessionUser = await User.findOne({ email: session.user.email });
    //     session.user.id = sessionUser._id.toString();
     
    //     return session;
    //   },
    //   async signIn({ account, profile, user, credentials }) {
    //     try {
    //       await connectToDB();
    //       console.log(profile)
    //       // check if user already exists
    //       const userExists = await User.findOne({ email: profile.email ||credentials.email });
        
    //       // if not, create a new document and save user in MongoDB
    //       if (!userExists) {
    //         await User.create({
    //           email: profile.email,
    //           username: profile.name.replace(" ", "").toLowerCase(),
    //           image: profile.picture,
    //           password:"000000",
    //         });
    //       }
  
    //       return true
    //     } catch (error) {
    //       console.log("Error checking if user exists: ", error.message);
    //       return false
    //     }
    //   },
    // }
  }

    ),
    CredentialsProvider({
      name:"Credentions",
      async authorize(credentials,req){
        try{
        connectToDB();
        console.log(credentials.email)
        const result = await User.findOne({email :credentials.email});
        console.log(result)
        if(!result || result.password === "000000"){
          throw new Error("Email hot found" );
          return new Response( "No email found" ,{
            status: 402
            
          });
        }

        const checkpassword = await compare(credentials.password ,result.password);
        console.log(checkpassword)
        if(!checkpassword || result.email !== credentials.email){
          throw new Error("Email or Ppassword does not match");

        }
        return result;
      }catch(err){
        console.log(err.message);
      }
      }
    
     })
  ],
  callbacks: {
    async session({ session }) {

      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      //  console.log(session)
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        if(profile)
        {
        // check if user already exists
        const userExists = await User.findOne({ email: profile.email  });
        console.log(userExists)
        console.log("pooo")
        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            password:"000000",
          });
        }

        return true
      
      }
      else{
        console.log("sdffd");
        const result = await User.findOne({email :credentials.email});
        console.log(result)
        console.log(credentials.password)
        if(!result || result.password === "000000"){
          throw new Error("Email hot found" );
          return new Response( "No email found" ,{
            status: 402
            
          });
        }

        const checkpassword = await compare(credentials.password ,result.password);
        console.log(checkpassword)
        if(!checkpassword || result.email !== credentials.email){
          throw new Error("Email or Ppassword does not match");

        }
        return result;
      }

      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  },

  secret:process.env.NEXTAUTH_SECRET,

})

export { handler as GET, handler as POST }