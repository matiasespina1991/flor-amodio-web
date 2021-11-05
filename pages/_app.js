import '../styles/globals.css'
import '../styles/App.css';
import Header from '../layouts/Header'
import TopNavbar from '../layouts/TopNavbar'
import LeftNavbar from '../layouts/LeftNavbar';
import MainContent from '../layouts/MainContent'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>AMODIOFLORI art+design</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
  )
}

export default MyApp
