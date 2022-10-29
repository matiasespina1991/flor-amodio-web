import { useRouter } from 'next/router'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import CMS_PATH from '../components/CMS_PATH'
import { gsap } from 'gsap'
import axios from 'axios'
import Carousel from 'react-material-ui-carousel'
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
    // React state
    const [ JSON_data, setJSON_data ] = useState([])
    const [ isFetching, setIsFetching ] = useState(true)
    const [ modularON, setModularON ] = useState(false)
    const [ imageInModular, setImageInModular ] = useState('')
    const [ moduleType, setModuleType ] = useState('')
    const [ carouselInModular, setCarouselInModular ] = useState([])
    const [ hideLoadingFlower, setHideLoadingFlower ] = useState(false)
    const [ loadedImages, setLoadedImages ] = useState([])

        // Browser path (ex. "/contact", "/about")
        const router = useRouter()
        const pathname = router.query.id

        const categoryNumber = 125
        http://localhost:3000/wp-json/gallery_plugin/v1/post/280
        // Fetch from wordpress API
        useEffect(() => {     
            const getData = async () => {  
                await axios.get(`${CMS_PATH}/wp-json/wp/v2/portfolio?per_page=100&acf_format=standard&?filter[limit]=100`)  
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
        }, [])
    
        useEffect(() => {
            if(isFetching){
                setTimeout(
                    () => setHideLoadingFlower(true),
                    2500
                )
            }
        }, [isFetching])

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

        
    
        const handleOnClickImage = (e) => {
            setModularON(true)
            setImageInModular(e.target.src)
            setModuleType('image')
        }

        const handleOnClickCarousel = (imagesArray) => {
            setModularON(true)
            setCarouselInModular(imagesArray)
            setModuleType('carousel')
        }    

        function handleCloseModular() {
            setModularON(false)
            setCarouselInModular([])
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

        function CarouselItem(props) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
                    <img 
                        style={{ objectFit: 'contain', height: '100%', width: '100%' }} 
                        // onLoad={
                        //     () => {
                        //         if(props.itemKey){
                        //             props.setLoadedImages((imagesKeys) => [...imagesKeys, props.itemKey])
                        //         }
                        //     }
                        // }
                        // loading='lazy'
                        onClick={() => handleOnClickCarousel(props.allImages)} 
                        src={props.item} 
                        alt="" 
                    />
                </div>
            )
        }

        function CarouselItemFromModular(props) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
                    <img style={{ objectFit: 'contain', height: '100%', width: '100%' }} 
                    loading='lazy'
                    src={props.item} 
                    alt="" />
                </div>
            )
        }

        useEffect(() => {
          console.log(loadedImages)
        }, [loadedImages])
        

        // Retruning wordpress data into HTML using javascript //
        return (
            <>
                    <div 
                        className={`
                            loader-container 
                            ${hideLoadingFlower ? "hidden" : null}
                        `}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <div
                            className="flower-loader-wrapper"
                            style={{
                                backgroundColor: 'white !important',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <img className="main-loader" src="/loading-logo/loading-flower.gif" alt="" style={{ left: '1rem' }} />
                        </div>
                    </div>
                    <>
                    <div ref={parentContainer} className="portfolio-area-container">
                        {JSON_data.map((wp_item, key) => {

                            if(itemIsAGallery(wp_item) && wp_item.categories.includes(categoryNumber)){
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
                                            {/* {
                                                !loadedImages.includes(key)
                                                &&
                                                <CircularProgress color="inherit" sx={{ position: 'absolute', margin: '45%',  }} />
                                            } */}
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
                                                        return <CarouselItem item={image} itemKey={key} allImages={imagesArray} setLoadedImages={setLoadedImages} />
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
                                        <div className={`portfolio-img-container ${!loadedImages.includes(key) ? 'placeholder-background' : null}`}>
                                            {
                                                !loadedImages.includes(key)
                                                &&
                                                <CircularProgress color="inherit" sx={{ position: 'absolute', margin: '45%' }} />
                                            }
                                            
                                            <img 
                                            loading='lazy'
                                            onLoad={
                                                () => {
                                                    if(key){
                                                        setLoadedImages((imagesKeys) => [...imagesKeys, key])
                                                    }
                                                }    
                                            } 
                                            onClick={(e) => handleOnClickImage(e)} 
                                            src={wp_item.featured_media_src_url} alt="" />
                                            {/* <Image onLoadingComplete={imageIsLoaded} src={wp_item.featured_media_src_url} alt="" layout="fill" objectFit="contain" quality="100" />     */}
                                        </div>
                                        { true ? <div className="image-caption" dangerouslySetInnerHTML={{__html: wp_item.content.rendered}} /> : ""}
                                    </div>
                                    
                                )
                            }
                        })}
                    </div>
                    <div className={`modular ${modularON ? "" : 'hidden-modular'}`} style={{zIndex: 8, overflow: 'hidden', height: '100%'}}>
                        <div onClick={() => handleCloseModular()} className="close-modular">X</div>
                        {
                        moduleType == 'image' &&
                        <div onClick={() => handleCloseModular()} className="modular-image-container">
                            <img className="modular-image" src={imageInModular} alt="" />
                        </div>
                    }

                    {
                        ( moduleType == 'carousel' && carouselInModular.length != 0 )
                        &&
                        <div onClick={() => handleCloseModular()} style={{position: 'relative', height: '100%'}}>
                            <Carousel 
                                sx={{ display: 'flex', height: '100%'}}
                                autoPlay={false} 
                                animation="slide" 
                                className='modular-carousel'
                                swipe={true}
                                indicators={false} 
                                navButtonsAlwaysVisible={true}
                            >
                                {
                                    carouselInModular.map((image, key) => {
                                        return <CarouselItemFromModular item={image} key={key} />
                                    })
                                }
                            </Carousel>
                        </div>
                    }
                    </div>
                    </>
            </>
        )
    }