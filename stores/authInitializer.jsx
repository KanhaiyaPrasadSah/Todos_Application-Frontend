"use client"
import React, { useEffect }  from 'react'
import { useAuthStore } from './authStores'

export default function AuthInitializer() {
const {refreshAccessToken} = useAuthStore();
   useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);
   
}
