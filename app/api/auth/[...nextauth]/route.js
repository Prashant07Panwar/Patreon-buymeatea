import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import connectDb from '@/db/connectDb';
import User from '@/models/User';

 const authoptions =  NextAuth({
    providers: [
      // OAuth authentication providers...
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         if(account.provider == "github") { 
          await connectDb()
          // Check if the user already exists in the database
          const currentUser =  await User.findOne({email: email}) 
          if(!currentUser){
            // Create a new user
             const newUser = await User.create({
              email: user.email, 
              username: user.email.split("@")[0], 
            })   
          } 
          return true
         }
      },
      async session({ session, user, token }) {
        const dbUser = await User.findOne({email: session.user.email})
        session.user.name = dbUser.username
        return session
      },
    },
    secret: process.env.NEXTAUTH_secret 
  })

  export { authoptions as GET, authoptions as POST}
