'use client'
import { useSelector } from 'react-redux'
import Profile from '../../components/profile/index'
import ArtistProfile from '../../components/profile/ArtistProfile';
import React from 'react'

const page = () => {
  const { user } = useSelector((state) => state.User);
  console.log("user", user);

  return (
    <>
      {user?.type === "seller" ? <ArtistProfile /> : <Profile />}
    </>
  )
}

export default page
