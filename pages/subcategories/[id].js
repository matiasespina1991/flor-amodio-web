import { useRouter } from 'next/router'
// import axios from 'axios';

// axios.get('https://example.com/wp-json/wp/v2/posts?_embed')
export default function CoverArtwork() {
    const router = useRouter()
    const {id} = router.query
    console.log({id})
    return (
        <div>Welcome to {id}</div>
    )
}