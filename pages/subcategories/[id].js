import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CoverArtwork() {

    const [ data, setData ] = useState([])

    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
            `http://floramodioweb.local/wp-json/wp/v2/portfolio?_embed`,
            );
            const dataJSON = [result.data];
            setData(dataJSON[0]);
        };
        fetchData();
        }, []);

    return (
            <div className="portfolio-area-container">
                {data.map((item, key) => {
                    if(
                        item._embedded["wp:term"][0][0].slug
                        ==
                        id
                    ){
                        return (
                            <div key={key} className="portfolio-img-container">
                                <img src={item.featured_media_src_url} alt="" />
                                <div className="image-caption" dangerouslySetInnerHTML={{__html: item.content.rendered}} />
                            </div>
                            
                        )
                    }
                })}
            </div>
    )
}