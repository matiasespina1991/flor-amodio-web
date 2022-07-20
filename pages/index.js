import { useRouter } from 'next/router'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import CMS_PATH from '../components/CMS_PATH'
import { gsap } from 'gsap'
import axios from 'axios'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

export default function Home() {
    // React state
    const [ JSON_data, setJSON_data ] = useState([])
    const [ isFetching, setIsFetching ] = useState(true)
    const [ imgLoaded, setImgLoaded ] = useState(false)
    const [ modularON, setModularON ] = useState(false)
    const [ imageInModular, setImageInModular ] = useState('')

        // Browser path (ex. "/contact", "/about")
        const router = useRouter()
        const pathname = router.query.id

        const categoryNumber = 125
        http://localhost:3000/wp-json/gallery_plugin/v1/post/280
        // Fetch from wordpress API
        useEffect(() => {     
            const getData = async () => {  
                await axios.get(`${CMS_PATH}/wp-json/wp/v2/portfolio?per_page=99&acf_format=standard`)  
                .then(wordpressApi => {  
                    const json = [wordpressApi.data] 
                    setJSON_data(json[0])
                    setIsFetching(false)
                    // console.log(json[0])
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



        function Item(image) {
            return (
                <>
                    <img onLoad={() => imageIsLoaded()} onClick={(e) => handleOnClickImage(e)} src={image.item} alt="" />
                </>
            )
        }

        // Retruning wordpress data into HTML using javascript //
        return (
            <>
                    <div className={`loader-container ${(isFetching && !imgLoaded) ? null : 'hidden'}`}>
                        <img style={{width: '100%', height: '100%'}} className="main-loader" src="https://thumbs.gfycat.com/OrganicMajorFallowdeer.webp" alt="" />
                    </div>
                    <>
                    <div ref={parentContainer} className="portfolio-area-container">
                        {JSON_data.map((wp_item, key) => {
                            
                            if(itemIsAGallery(wp_item)){
                                const gallery = wp_item.acf

                                console.log(wp_item.featured_media_src_url)
                                return(
                                    
                                    <div key={key} className="portfolio-img-caption-wrapper fade-in">
                                        <div className="portfolio-img-container">
                                            <Carousel 
                                            
                                            autoPlay={false} animation="slide" height={420} width={420}
                                             indicators={false} 
                                            navButtonsAlwaysVisible={true}>
                                            {
                                                wp_item.featured_media_src_url && <img onLoad={() => imageIsLoaded()} onClick={(e) => handleOnClickImage(e)} src={wp_item.featured_media_src_url} alt="" />
                                            }
                                            {
                                                gallery.second_featured_image != false && <Item item={gallery.second_featured_image} /> 
                                            }
                                            {
                                                gallery.third_featured_image != false && <Item item={gallery.third_featured_image} /> 
                                            }
                                            {/* {
                                                gallery.fourth_featured_image != false && <Item item={gallery.fourth_featured_image} /> 
                                            }
                                            {
                                                gallery.fifth_featured_image != false && <Item item={gallery.fifth_featured_image} /> 
                                            } */}
                                            </Carousel>
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
                                            {/* <Image onLoadingComplete={imageIsLoaded} src={wp_item.featured_media_src_url} alt="" layout="fill" objectFit="contain" quality="100" />     */}
                                        </div>
                                        {imgLoaded ? <div className="image-caption" dangerouslySetInnerHTML={{__html: wp_item.content.rendered}} /> : ""}
                                    </div>
                                    
                                )
                            }
                        })}
                    </div>
                    <div style={{zIndex: 99}} className={`modular ${modularON ? "" : 'hidden-modular'}`}>
                        <div onClick={() => setModularON(false)} className="close-modular">X</div>
                        <div style={{zIndex: 99}} onClick={() => setModularON(false)} className="modular-image-container">
                            <img style={{zIndex: 99}} className="modular-image" src={imageInModular} alt="" />
                        </div>
                    </div>
                    </>
            </>
        )
    }