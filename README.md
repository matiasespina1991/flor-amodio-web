Project developedusing Next JS and Wordpress as Headless CMS

https://amodioflorencia.com/


The following is an example of a React component rendering data obtained from the Wordpress API of the website:

``` javascript
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function Portfolio() {

    // React state
    const [ JSON_data, setJSON_data ] = useState([])

    // Fetch from wordpress API
    useEffect(() => {
        const fetchData = async () => {
            const wordpressApi = await axios(
            `https://www.amodioflorencia.com/wp-json/wp/v2/portfolio?_embed`,
            );
            const json = [wordpressApi.data]

            // Saving wordpress JSON data to React state
            setJSON_data(json[0])
    };
    fetchData()
    }, [])

    // Retruning wordpress fetched data into HTML using javascript/React
    return (
            <div className="portfolio-area-container">
                {JSON_data.map((wp_item, key) => {
                    return (
                        <div key={key} className="portfolio-img-container fade-in">
                            <img src={wp_item.featured_media_src_url} alt="" />
                            <div className="image-caption" dangerouslySetInnerHTML={{__html: wp_item.content.rendered}} />
                        </div>

                    )
                })}
            </div>
    )
}

```


This is how the API looks like: <br>
https://www.amodioflorencia.com/wp-json/wp/v2/portfolio?_embed

<img src="https://i.ibb.co/r6Gxjs1/Screen-Shot-2021-11-04-at-11-04-37-PM.png" alt="" />
