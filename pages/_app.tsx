import '../styles/globals.css'
import '../styles/dropdown.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layouts'
import {AuthProvider} from '../context/AuthContext'
import JSXStyle from 'styled-jsx/style'
import {FC} from "react"
import React from 'react'

// import LiveSearch from "../pages/patient-history/components/LiveSearch"


export default function s({ Component, pageProps }: AppProps) {
  return(
     
<AuthProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AuthProvider>
  )
}
