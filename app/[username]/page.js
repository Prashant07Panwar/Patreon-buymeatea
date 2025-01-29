import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
const Username = async ({params}) => {
  // const { data: session } = useSession()
  // const router = useRouter()
  // useEffect(() => {
  //   console.log(session)
  //   if (!session) {
  //     router.push('/login')
  //   }
  // }, [])
  // useEffect(() => {
  //   document.title = `Support ${params.username} - Get Me A Chai`
  // }, [])
  
  // If the username is not present in the database, show a 404 page
  const checkUser = async () => {
    await connectDb()
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()



  return (
    <>
      <PaymentPage username={params.username} />
    </>
  )
}

export default Username
 
export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai`,
  }
}