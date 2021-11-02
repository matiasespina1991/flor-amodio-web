import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import CMS_PATH from '../../components/CMS_PATH'
import axios from 'axios';

export default function Portfolio() {

    const [ data, setData ] = useState([])

    const router = useRouter()
    const {id} = router.query

    const el = useRef();
    const q = gsap.utils.selector(el);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
            `${CMS_PATH()}/wp-json/wp/v2/portfolio?_embed`,
            );
            const dataJSON = [result.data];
            setData(dataJSON[0]);
        };
        fetchData();
        }, []);

        useEffect(() => {
            gsap.fromTo(q(".fade-in"), {
                opacity: 0,
            },{
                opacity: 1,
                duration: 0.8,
                x: -5,
                stagger: 0.1,
            });
        }, [{id}]);

    return (
            <div ref={el} className="portfolio-area-container">
                {data.map((item, key) => {
                    if(
                        item._embedded["wp:term"][0][0].slug
                        ==
                        id
                    ){
                        return (
                            <div key={key} className="portfolio-img-container fade-in">
                                <img src={item.featured_media_src_url} alt="" />
                                <div className="image-caption" dangerouslySetInnerHTML={{__html: item.content.rendered}} />
                            </div>
                            
                        )
                    }
                })}
            </div>
    )
}