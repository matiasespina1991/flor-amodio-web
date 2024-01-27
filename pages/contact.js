import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGlobalContext } from '../context/GlobalContext';

export default function ContactPage(){

    // const [ data, setData ] = useState([])

    const router = useRouter()
    const {id} = router.query

    const el = useRef();
    const q = gsap.utils.selector(el);

    const { contactData } = useGlobalContext();

    const data = contactData;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //         `${CMS_PATH}/wp-json/wp/v2/pages/?slug=contact`,
    //         );
    //         const dataJSON = [result.data];
    //         setData(dataJSON[0]);
    //     };
    //     fetchData();
    //     }, []);

    useEffect(() => {
        gsap.fromTo(q(".fade-in"), {
            opacity: 0,
        },{
            opacity: 1,
            duration:0.2,
        });
    }, [{id}]);


    if(data[0]){
        return (
            <div ref={el}>
                <p className="contact-p fade-in" dangerouslySetInnerHTML={{__html: data[0].content.rendered}} />
            </div>
        )
    } else if(data[1]){
        return (
            <div ref={el}>
                <p className="contact-p fade-in" dangerouslySetInnerHTML={{__html: data[1].content.rendered}} />
            </div>
        )
    } else {
        return null
    }
}