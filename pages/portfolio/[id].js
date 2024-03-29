import { useRouter } from 'next/router'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import CMS_PATH from '../../components/CMS_PATH'
import { gsap } from 'gsap'
import axios from 'axios'
import Carousel from 'react-material-ui-carousel'
import CircularProgress from '@mui/material/CircularProgress';

function Portfolio() {

    // React state
    const [ JSON_data, setJSON_data ] = useState([])
    const [ isFetching, setIsFetching ] = useState(true)
    const [ imgLoaded, setImgLoaded ] = useState(false)
    const [ modularON, setModularON ] = useState(false)
    const [ imageInModular, setImageInModular ] = useState('')
    const [ moduleType, setModuleType ] = useState('')
    const [ carouselInModular, setCarouselInModular ] = useState([])
    const [ hideLoadingFlower, setHideLoadingFlower ] = useState(false)
    const [ loadedImages, setLoadedImages ] = useState([])

    // Browser path (ex. "/contact", "/about")
    const router = useRouter()
    const pathname = router.query.id

    const categoryNumber = pathname == "featured" && 125 || pathname == "cover-art" && 32 || pathname == "identity" && 35 || pathname == "video-titles" && 38 || pathname == "posters-and-flyers" && 41 || pathname == "merch-graphic-design" && 80 || pathname == "demete" && 44 || pathname == "merch-shop-now" && 83 

    // Fetch from wordpress API
    useEffect(() => {     
        const getData = async () => {  
            await axios.get(`${CMS_PATH}/wp-json/wp/v2/portfolio?per_page=100&acf_format=standard&?filter[limit]=100`)  
            .then(wordpressApi => {  
                const json = [wordpressApi.data] 

                // filter json data by category, it should include the category number
                const filteredJson = json[0].filter((item) => {
                    return item.categories.includes(categoryNumber)
                })
                setJSON_data(filteredJson)
                // setJSON_data(json[0])
                setIsFetching(false)
            })  
            .catch(err => {  
            console.log(err)  
            });  
        }  
        getData()  
    }, [pathname])

    useEffect(() => {
        if(isFetching && !imgLoaded){
            setTimeout(
                () => setHideLoadingFlower(true),
                2500
            )
        }
    }, [isFetching, imgLoaded])
    


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
        setCarouselInModular([])
        setModularON(true)
        setImageInModular(e.target.src)
        setModuleType('image')
    }


    const handleOnClickCarousel = (imagesArray) => {
        setImageInModular('')
        setModularON(true)
        setCarouselInModular(imagesArray)
        setModuleType('carousel')
    }

    function handleCloseModular() {
        setModularON(false)
        setCarouselInModular([])
        setImageInModular('')
        setModuleType('')
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
                    style={{ objectFit: 'cover', height: '100%', width: '100%' }} 
                    onLoad={() => imageIsLoaded()} 
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
                onLoad={() => imageIsLoaded()} 
                src={props.item} 
                alt="" />
            </div>
        )
    }
    


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
                    
                <div className="portfolio-column-left">
                    {JSON_data.map((wp_item, key) => {

                        // console.log('index', key)

                        if(key % 2 !== 0){
                            return
                        }
                        
                        if(itemIsAGallery(wp_item) &&  wp_item.categories.includes(categoryNumber)){

                            const gallery = wp_item.acf
                            const imagesArray = [wp_item.featured_media_src_url]

                            Object.entries(gallery).forEach((val,index) => {
                                if(val[1] != false){
                                    imagesArray.push(val[1])
                                }
                            })
                
                            return(
                                
                                <div key={`${key}-left`} className={`portfolio-img-caption-wrapper fade-in img-key-${key}`}>
                                    <div className="portfolio-img-container">
                                        {/* <CircularProgress color="inherit" sx={{ position: 'absolute', margin: '45%' }} /> */}
                                        <Carousel 
                                        sx={{ display: 'flex'}}
                                        autoPlay={false} 
                                        animation="slide" 
                                        swipe={true}
                                        width={420}
                                        indicators={false} 
                                        navButtonsAlwaysVisible={true}>
                                            {
                                                imagesArray.map((image, key) => {
                                                    return <CarouselItem item={image} key={key} allImages={imagesArray} />
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
                                <div key={`${key}-left`} className={`portfolio-img-caption-wrapper fade-in img-key-${key}`}>
                                    <div className={`portfolio-img-container ${!loadedImages.includes(key) ? 'placeholder-background' : null}`}>
                                        {
                                            !loadedImages.includes(key)
                                            &&
                                            <CircularProgress color="inherit" sx={{ position: 'absolute', margin: '43%' }} />
                                        }
                                        <img 
                                         onLoad={
                                            () => {
                                                if(key){
                                                    setLoadedImages((imagesKeys) => [...imagesKeys, key])
                                                }
                                            }    
                                        } 
                                        onClick={(e) => handleOnClickImage(e)} 
                                        loading='lazy' 
                                        src={wp_item.featured_media_src_url} alt="" />

                                        {/* <Image height={400} loading="lazy" width={400} onLoadingComplete={() => imageIsLoaded()} onClick={(e) => handleOnClickImage(e)} src={wp_item.featured_media_src_url} alt="" /> */}
                                    </div>
                                    {imgLoaded ? <div className="image-caption" dangerouslySetInnerHTML={{__html: wp_item.content.rendered}} /> : ""}
                                </div>
                                
                            )
                        }
                    })}
                </div>

                <div className="portfolio-column-right">
                    {JSON_data.map((wp_item, key) => {

                            if(key % 2 === 0){
                                return
                            }
                        
                        if(itemIsAGallery(wp_item) &&  wp_item.categories.includes(categoryNumber)){

                            const gallery = wp_item.acf
                            const imagesArray = [wp_item.featured_media_src_url]

                            Object.entries(gallery).forEach((val,index) => {
                                if(val[1] != false){
                                    imagesArray.push(val[1])
                                }
                            })
                
                            return(
                                
                                <div key={`${key}-right`} className={`portfolio-img-caption-wrapper fade-in img-key-${key}`}>
                                    <div className="portfolio-img-container">
                                        {/* <CircularProgress color="inherit" sx={{ position: 'absolute', margin: '45%' }} /> */}
                                        <Carousel 
                                        sx={{ display: 'flex'}}
                                        autoPlay={false} 
                                        animation="slide" 
                                        swipe={true}
                                        width={420}
                                        indicators={false} 
                                        navButtonsAlwaysVisible={true}>
                                            {
                                                imagesArray.map((image, key) => {
                                                    return <CarouselItem item={image} key={key} allImages={imagesArray} />
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
                                <div key={`${key}-right`} className={`portfolio-img-caption-wrapper fade-in img-key-${key}`}>
                                    <div className={`portfolio-img-container ${!loadedImages.includes(key) ? 'placeholder-background' : null}`}>
                                        {
                                            !loadedImages.includes(key)
                                            &&
                                            <CircularProgress color="inherit" sx={{ position: 'absolute', margin: '43%' }} />
                                        }
                                        <img 
                                         onLoad={
                                            () => {
                                                if(key){
                                                    setLoadedImages((imagesKeys) => [...imagesKeys, key])
                                                }
                                            }    
                                        } 
                                        onClick={(e) => handleOnClickImage(e)} 
                                        loading='lazy' 
                                        src={wp_item.featured_media_src_url} alt="" />

                                        {/* <Image height={400} loading="lazy" width={400} onLoadingComplete={() => imageIsLoaded()} onClick={(e) => handleOnClickImage(e)} src={wp_item.featured_media_src_url} alt="" /> */}
                                    </div>
                                    {imgLoaded ? <div className="image-caption" dangerouslySetInnerHTML={{__html: wp_item.content.rendered}} /> : ""}
                                </div>
                                
                            )
                        }
                    })}
                </div>


                <div className="portfolio-column-mobile">
                    {JSON_data.map((wp_item, key) => {

                           
                        
                        if(itemIsAGallery(wp_item) &&  wp_item.categories.includes(categoryNumber)){

                            const gallery = wp_item.acf
                            const imagesArray = [wp_item.featured_media_src_url]

                            Object.entries(gallery).forEach((val,index) => {
                                if(val[1] != false){
                                    imagesArray.push(val[1])
                                }
                            })
                
                            return(
                                
                                <div key={`${key}-right`} className={`portfolio-img-caption-wrapper fade-in img-key-${key}`}>
                                    <div className="portfolio-img-container">
                                        {/* <CircularProgress color="inherit" sx={{ position: 'absolute', margin: '45%' }} /> */}
                                        <Carousel 
                                        sx={{ display: 'flex'}}
                                        autoPlay={false} 
                                        animation="slide" 
                                        swipe={true}
                                        width={420}
                                        indicators={false} 
                                        navButtonsAlwaysVisible={true}>
                                            {
                                                imagesArray.map((image, key) => {
                                                    return <CarouselItem item={image} key={key} allImages={imagesArray} />
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
                                <div key={`${key}-right`} className={`portfolio-img-caption-wrapper fade-in img-key-${key}`}>
                                    <div className={`portfolio-img-container ${!loadedImages.includes(key) ? 'placeholder-background' : null}`}>
                                        {
                                            !loadedImages.includes(key)
                                            &&
                                            <CircularProgress color="inherit" sx={{ position: 'absolute', margin: '43%' }} />
                                        }
                                        <img 
                                         onLoad={
                                            () => {
                                                if(key){
                                                    setLoadedImages((imagesKeys) => [...imagesKeys, key])
                                                }
                                            }    
                                        } 
                                        onClick={(e) => handleOnClickImage(e)} 
                                        loading='lazy' 
                                        src={wp_item.featured_media_src_url} alt="" />

                                        {/* <Image height={400} loading="lazy" width={400} onLoadingComplete={() => imageIsLoaded()} onClick={(e) => handleOnClickImage(e)} src={wp_item.featured_media_src_url} alt="" /> */}
                                    </div>
                                    {imgLoaded ? <div className="image-caption" dangerouslySetInnerHTML={{__html: wp_item.content.rendered}} /> : ""}
                                </div>
                                
                            )
                        }
                    })}
                </div>
                    
                </div>
                <div className={`modular ${modularON ? "" : 'hidden-modular'}`} onClick={() => handleCloseModular()} style={{zIndex: 8, overflow: 'hidden', height: '100%'}}>
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
                        <div style={{position: 'relative', height: '100%'}}>
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

export default Portfolio

