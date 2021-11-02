import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import CMS_PATH from '../components/CMS_PATH';
import axios from 'axios';

export default function About(){

    const [ data, setData ] = useState([])

    const router = useRouter()
    const {id} = router.query

    const el = useRef();
    const q = gsap.utils.selector(el);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
            `${CMS_PATH()}/wp-json/wp/v2/pages/?slug=about`,
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
                duration:0.5,
            });
        }, [{id}]);

    if(data[0]){
        return (
            <div ref={el}>
                <p className="about-p fade-in" dangerouslySetInnerHTML={{__html: data[0].content.rendered}} />
            </div>
        )
    } else if(data[1]){
        return (
            <div ref={el}>
                <p className="about-p fade-in" dangerouslySetInnerHTML={{__html: data[1].content.rendered}} />
            </div>
        )
    } else {
        return null
    }
}