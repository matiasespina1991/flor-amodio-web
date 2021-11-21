import '../styles/globals.css'
import '../styles/App.css';
import Header from '../layouts/Header'
import TopNavbar from '../layouts/TopNavbar'
import LeftNavbar from '../layouts/LeftNavbar';
import MainContent from '../layouts/MainContent'
import FlowerMenuIcon from '../components/FlowerMenuIcon';
import ResponsiveNavbar from '../layouts/ResponsiveNavbar'
import Head from 'next/head'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  const [ DOMloading, setDOMloading ] = useState(true)
  const [ responsiveMenuIsExpanded, setResponsiveMenuIsExpanded ] = useState(false)

  useEffect(() => {
    setDOMloading(false)
  }, [])

  const handleFlowerIconOnClick = () => {
    setResponsiveMenuIsExpanded(prevSate => !prevSate)
  }

  return (
    <>
      <Head>
        <title>AMODIOFLORI art+design</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="dns-prefetch" href="https://cms.amodioflorencia.com/" />
        <link rel="preconnect" href="https://cms.amodioflorencia.com/" />
        <meta name="description" content="Florencia Amodio is an artist & graphic designer based in Buenos Aires, Argentina."></meta>
        <meta property="og:title" content="AMODIOFLORI / art+design"/>
        <meta property="og:url" content="https://www.amodioflorencia.com/"/>
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Amodioflorencia.com"/>
        <meta property="og:image" content="https://cms.amodioflorencia.com/wp-content/uploads/2021/11/og-image_thumbnail.jpg" itemProp="image" />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content="AMODIOFLORI / art+design"/>
        <meta property="twitter:url" content="https://www.amodioflorencia.com/"/>
        <meta property="twitter:locale" content="en_GB" />
        <meta property="twitter:site_name" content="Amodioflorencia.com"/>
        <meta property="twitter:image" content="https://cms.amodioflorencia.com/wp-content/uploads/2021/11/og-image_thumbnail.jpg" itemProp="image" />
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
          <div className="responsive-navbar-container">
            <FlowerMenuIcon responsiveMenuIsExpanded={responsiveMenuIsExpanded} handleFlowerIconOnClick={handleFlowerIconOnClick} />
            <ResponsiveNavbar responsiveMenuIsExpanded={responsiveMenuIsExpanded}/>
          </div>
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
