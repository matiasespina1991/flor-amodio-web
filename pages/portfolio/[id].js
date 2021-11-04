import { useRouter } from 'next/router'
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import CMS_PATH from '../../components/CMS_PATH'
import { gsap } from 'gsap'
import axios from 'axios'

export default function Portfolio() {

    // React state
    const [ JSON_data, setJSON_data ] = useState([])

    // Browser path (ex. "/contact", "/about")
    const router = useRouter()
    const pathname = router.query.id

    // Fetch from wordpress API
    useEffect(() => {
        const fetchData = async () => {
            const wordpressApi = await axios(
            `${CMS_PATH}/wp-json/wp/v2/portfolio?_embed`,
            );
            const json = [wordpressApi.data]

            // Saving wordpress JSON data to React state
            setJSON_data(json[0])
    };
    fetchData()
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
            duration: 0.4,
            x: -5,
            stagger: 0.15,
        });
        // GSAP effect triggered by changes in the pathname
    }, [pathname])

    // Retruning wordpress data into HTML using javascript
    return (
            <div ref={parentContainer} className="portfolio-area-container">
                {JSON_data.map((wp_item, key) => {
                    if(
                        wp_item._embedded["wp:term"][0][0].slug
                        ==
                        pathname
                    ){
                        return (
                            <div key={key} className="portfolio-img-container fade-in">
                                <img src={wp_item.featured_media_src_url} alt="" />
                                <div className="image-caption" dangerouslySetInnerHTML={{__html: wp_item.content.rendered}} />
                            </div>
                            
                        )
                    }
                })}
            </div>
    )
}