import { useEffect, useState } from 'react';
import axios from 'axios';

export default function About(){

    const [ data, setData ] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
            `http://floramodioweb.local/wp-json/wp/v2/pages/?slug=about`,
            );
            const dataJSON = [result.data];
            setData(dataJSON[0]);
        };
        fetchData();
        }, []);

    if(data[0]){
        return (
            <div>
                <p className="about-p" dangerouslySetInnerHTML={{__html: data[0].content.rendered}} />
            </div>
        )
    } else if(data[1]){
        return (
            <div>
                <p className="about-p" dangerouslySetInnerHTML={{__html: data[1].content.rendered}} />
            </div>
        )
    } else {
        return null
    }
}