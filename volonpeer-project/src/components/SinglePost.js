import { useState, useEffect } from 'react'
import { getDatabase, ref, get, child, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getAuth } from '../firebase'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapComp from './MapComp';

// 0: "Long Desc"
// 1: "Short desc"
// 2: "12/14/2017, 5:25:02 PM"
// 3: "12/19/2021, 6:43:44 PM"
// 4: "images/bD4pVerZa0Om2XkWXwUlO6ytOLh2/-MrImhBa5_nm9vl-M02H"
// 5: "Lugano"
// 6: "Mak Fazlic"
// 7: "-MrImhBa5_nm9vl-M02I"
// 8: 0
// 9: {five: "", four: "", one: "", three: "", two: ""}
// 10: 1639935824691
// 11: "This is a title"
// 12: "bD4pVerZa0Om2XkWXwUlO6yt

export default function SinglePost(props) {
    const db = getDatabase();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState([]);
    const [image, setImage] = useState('');
    const [when, setWhen] = useState('');
    //const id = props.match.params.id;


    useEffect(() => {
        const items = []
        const storage = getStorage();
        var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
        var segment_array = segment_str.split('/');
        var last_segment = segment_array.pop();
        var second_last_segment = segment_array.pop();
        var post = second_last_segment + "/" + last_segment
        console.log(last_segment);
        get(child(ref(db), `posts/${post}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                for (let key in snapshot.val()) {
                    items.push(snapshot.val()[key]);
                }

                console.log(items);
                setPost(items)
                if (post.length !== 0) {
                    const starsRef = storageRef(storage, `${items[4]}`);
                    getDownloadURL(starsRef)
                        .then((url) => {
                            setImage(url);
                        })
                    setLoading(false);
                    setWhen(items[2].split(",")[0] + " at " + items[2].split(",")[1].split(":")[0] + ":" + items[2].split(",")[1].split(":")[1] + " " + items[2].split(",")[1].split(":")[2].split(" ")[1]);

                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });




    }, []);

    return (
        loading ? <>
            <div class="flex items-center justify-center h-screen">
                <div class="flex items-center justify-center space-x-2 animate-bounce">
                    <div class="w-8 h-8 bg-blueish5 rounded-full"></div>
                    <div class="w-8 h-8 bg-greenish5 rounded-full"></div>
                    <div class="w-8 h-8 bg-gray-500 rounded-full"></div>
                </div>
            </div>
        </> : <div className='pb-96'>
            <div className='container xl:w-1/3 grid lg:grid-cols-2 grid-cols-1 pt-1 mx-auto mt-10'>
                <div className='lg:m-5 '>
                    <img src={image} alt="post" class="lg:w-full w-3/4 mx-auto object-cover rounded-xl" />
                    <div class="px-4 py-4 flex flex-col justify-center items-start">
                        <div class="text-2xl my-5 font-bold self-center">{post[11]}</div>

                        <div class="text-gray-700 my-4 flex text-xl"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>{when}</div>
                        <div class="text-gray-700 my-4 flex flex-row text-xl"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>{post[5]}</div>

                    </div>
                </div>
                <div className=' w-full break-words lg:pt-10'>
                    <div className='px-5 text-justify break-words'>{post[1]}</div>
                </div>
            </div>
            <div className='mb-10 mt-10 lg:mt-0 px-5 text-center lg:w-1/3 w-full text-justify mx-auto'>{post[0]}</div>

            <div className='w-fil h-96'><MapComp /></div>
        </div>

    )
}
