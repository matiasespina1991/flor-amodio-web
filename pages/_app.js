import '../styles/globals.css'
import '../styles/App.css';
import Header from '../layouts/Header'
import TopNavbar from '../layouts/TopNavbar'
import LeftNavbar from '../layouts/LeftNavbar';
import MainContent from '../layouts/MainContent'
import Head from 'next/head'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  const [ DOMloading, setDOMloading ] = useState(true)

  useEffect(() => {
    setDOMloading(false)
  }, [])

  return (
    <><html lang="en-US" />
      <Head>
        
        <title>AMODIOFLORI art+design</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="dns-prefetch" href="https://cms.amodioflorencia.com/" />
        <link rel="preconnect" href="https://cms.amodioflorencia.com/index.php/wp-json/wp/v2/portfolio?_embed" />
        <meta name="description" content="Florencia Amodio is an artist & graphic designer based in Buenos Aires, Argentina."></meta>
        <meta property="og:title" content="AMODIOFLORI - art+design"/>
        <meta property="og:url" content="https://www.amodioflorencia.com/"/>
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Authxrs"/>
        <meta property="og:image" content="https://cms.amodioflorencia.com/wp-content/uploads/2021/11/LOGO-3D-FINAL-1.png" itemProp="image" />
      </Head>
      {DOMloading ?
      <div></div>
      :
      <>
      <Header/>
      <div className="body-wrapper">
        <LeftNavbar />
          <div className="main-content-topnav-wrapper">
            <TopNavbar />
            <MainContent>
              <Component {...pageProps} />
            </MainContent>
          </div>
      </div>
      </>
      }
    </>
  )
}

export default MyApp
