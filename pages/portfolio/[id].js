import { useRouter } from 'next/router'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import CMS_PATH from '../../components/CMS_PATH'
import { gsap } from 'gsap'
import axios from 'axios'
import Carousel from 'react-material-ui-carousel'

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

    const categoryNumber = pathname == "featured" && 125 || pathname == "cover-art" && 32 || pathname == "identity" && 35 || pathname == "video-titles" && 38 || pathname == "posters-and-flyers" && 41 || pathname == "merch-graphic-design" && 80 || pathname == "demete" && 44 || pathname == "merch-shop-now" && 83 

    // Fetch from wordpress API
    useEffect(() => {     
        const getData = async () => {  
            await axios.get(`${CMS_PATH}/wp-json/wp/v2/portfolio?acf_format=standard&?per_page=99`)  
            .then(wordpressApi => {  
                const json = [wordpressApi.data] 
                setJSON_data(json[0])
                setIsFetching(false)
            })  
            .catch(err => {  
            console.log(err)  
            });  
        }  
        getData()  
    }, [pathname])

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
    }, [])

    const imageIsLoaded = () => {
        setImgLoaded(true)
    }

    const handleOnClickImage = (e) => {
        setModularON(true)
        setImageInModular(e.target.src)
    }

    const itemIsAGallery = (wp_item) => {
        const gallery = wp_item.acf

        if( 
            gallery.second_featured_image || 
            gallery.third_featured_image || 
            gallery.fourth_featured_image || 
            gallery.fifth_featured_image
        ){
            return true
        } else {
            return false
        }
    }

    function CarouselItem(image) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
                <img style={{ objectFit: 'contain', height: '100%', width: '100%' }} onLoad={() => imageIsLoaded()} onClick={(e) => handleOnClickImage(e)} src={image.item} alt="" />
            </div>
        )
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
                        
                        if(itemIsAGallery(wp_item) &&  wp_item.categories.includes(categoryNumber)){

                            console.log(wp_item)
                            const gallery = wp_item.acf
                            const imagesArray = [wp_item.featured_media_src_url]

                            Object.entries(gallery).forEach((val,index) => {
                                if(val[1] != false){
                                    imagesArray.push(val[1])
                                }
                            })
                
                            return(
                                
                                <div key={key} className="portfolio-img-caption-wrapper fade-in">
                                    <div className="portfolio-img-container">
                                        <Carousel 
                                        sx={{ display: 'flex'}}
                                        autoPlay={false} 
                                        animation="slide" 
                                        swipe={true}
                                        height={420} 
                                        width={420}
                                        indicators={false} 
                                        navButtonsAlwaysVisible={true}>
                                            {
                                                imagesArray.map((image, key) => {
                                                    return <CarouselItem item={image} key={key} />
                                                })
                                            }
                                        </Carousel>
                                        
                                        <div className="image-caption" dangerouslySetInnerHTML={{__html: wp_item.content.rendered}} />
                                    </div>
                                </div>
                                
                            )
                        }

                        if(
                            wp_item.categories.includes(categoryNumber)
                        ){
                            return (
                                <div key={key} className="portfolio-img-caption-wrapper fade-in">
                                    <div className="portfolio-img-container">
                                        <img onLoad={() => imageIsLoaded()} onClick={(e) => handleOnClickImage(e)} src={wp_item.featured_media_src_url} alt="" />

                                        {/* <Image height={400} loading="lazy" width={400} onLoadingComplete={() => imageIsLoaded()} onClick={(e) => handleOnClickImage(e)} src={wp_item.featured_media_src_url} alt="" /> */}
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

