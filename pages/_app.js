import '../styles/globals.css'
import '../styles/App.css';
import Header from '../layouts/Header'
import TopNavbar from '../layouts/TopNavbar'
import LeftNavbar from '../layouts/LeftNavbar';
import MainContent from '../layouts/MainContent'


function MyApp({ Component, pageProps }) {

  return (
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
  )
}

export default MyApp
