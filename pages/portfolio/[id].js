import { useRouter } from 'next/router'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import CMS_PATH from '../../components/CMS_PATH'
import { gsap } from 'gsap'
import axios from 'axios'
// import Image from 'next/image'

function Portfolio() {

    // React state
    const [ JSON_data, setJSON_data ] = useState([])
    const [ isFetching, setIsFetching ] = useState(true)
    const [ imgLoaded, setImgLoaded ] = useState(false)
    const [ modularON, setModularON ] = useState(false)
    const [ imageInModular, setImageInModular ] = useState('')

    // Browser path (ex. "/contact", "/about")
    const router = useRouter()
    const pathname = router.query.id

    // Fetch from wordpress API
    useEffect(() => {     
        const getData = async () => {  
            await axios.get(`${CMS_PATH}/wp-json/wp/v2/portfolio?_embed`)  
            .then(wordpressApi => {  
                const json = [wordpressApi.data] 
                setJSON_data(json[0])
                console.log(json)
                setIsFetching(false)
            })  
            .catch(err => {  
            console.log(err)  
            });  
        }  
        getData()  
    }, [])

    // Query selector to target HTML element for GSAP effects
    const parentContainer = useRef()
    const querySel = gsap.utils.selector(parentContainer)


    // GSAP function
    useLayoutEffect(() => {
        gsap.fromTo(querySel(".fade-in"), {
            opacity: 0,
        },{
            opacity: 1,
            display: "block",
            duration: 0.4,
            // x: -5,
            stagger: 0.15,
        });
        // GSAP effect triggered by changes in the pathname
    }, [pathname])

    const imageIsLoaded = () => {
        setImgLoaded(true)
    }

    const handleOnClickImage = (e) => {
        setModularON(true)
        setImageInModular(e.target.src)
    }
    // Retruning wordpress data into HTML using javascript //
    return (
        <>
                <div className={`loader-container ${(isFetching && !imgLoaded) ? null : 'hidden'}`}>
                    <img className="main-loader" src="https://thumbs.gfycat.com/OrganicMajorFallowdeer.webp" alt="" />
                </div>
                <>
                <div ref={parentContainer} className="portfolio-area-container">
                    {JSON_data.map((wp_item, key) => {
                        if(
                            wp_item._embedded["wp:term"][0][0].slug
                            ==
                            pathname
                        ){
                            return (
                                <div key={key} className="portfolio-img-caption-wrapper fade-in">
                                    <div className="portfolio-img-container">
                                        <img onLoad={() => imageIsLoaded()} onClick={(e) => handleOnClickImage(e)} src={wp_item.featured_media_src_url} alt="" />
                                        {/* <Image onLoadingComplete={imageIsLoaded} src={wp_item.featured_media_src_url} alt="" layout="fill" objectFit="contain" quality="100" />     */}
                                    </div>
                                    {imgLoaded ? <div className="image-caption" dangerouslySetInnerHTML={{__html: wp_item.content.rendered}} /> : ""}
                                </div>
                                
                            )
                        }
                    })}
                </div>
                <div className={`modular ${modularON ? "" : 'hidden-modular'}`}>
                    <div onClick={() => setModularON(false)} className="close-modular">X</div>
                    <div onClick={() => setModularON(false)} className="modular-image-container">
                        <img className="modular-image" src={imageInModular} alt="" />
                    </div>
                </div>
                </>
        </>
    )
}

export default Portfolio

