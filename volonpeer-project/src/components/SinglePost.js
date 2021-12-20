import { useState, useEffect } from 'react'
import { getDatabase, ref, get, child, onValue, runTransaction } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapComp from './MapComp';
import { getStepLabelUtilityClass } from '@mui/material';
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import Swal from 'sweetalert2';
import emailjs from "emailjs-com";
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
    const [map, setMap] = useState([]);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [userid, setUserid] = useState('');
    //const id = props.match.params.id;
    function sendEmail(email_from, email_to, post_id) {

        console.log(email_from, email_to, post_id)
        emailjs.send('service_latewwj', 'template_egddb5o', {
            post: "volonpeer.web.app/posts/" + post_id,
            from: email_from,
            to: email_to,
            }, process.env.REACT_APP_EMAILJS_API_KEY)
            .then((result) => {
                console.log(result.text);
                // analytics event
                //logEvent(analytics, 'contact_form_submit', {
                //    name: e.target.name.value,
                //    email: e.target.email.value,
                //    message: e.target.message.value
                //});
                Swal.fire(
                    'Thank you!',
                    'We will email you soon!',
                    'success'
                  )
            }, (error) => {
                console.log(error.text);
                Swal.fire(
                    'Oops...',
                    'Something went wrong!',
                    'error'
                    )
            });
            
    }

    const auth = getAuth();

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
                    const starsRef = storageRef(storage, `${items[6]}`);
                    getDownloadURL(starsRef)
                        .then((url) => {
                            setImage(url);
                        })
                    setWhen(items[3].split(",")[0] + " at " + items[3].split(",")[1].split(":")[0] + ":" + items[3].split(",")[1].split(":")[1] + " " + items[3].split(",")[1].split(":")[2].split(" ")[1]);
                    setLat(items[7]);
                    setLong(items[8]);
                    setUserid(auth.currentUser.uid);
                    console.log(post)
                    setLoading(false);

                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });




    }, []);

    async function helpedPostTriger(userIdOfPost, postId) {
        console.log(postId);
        const db = getDatabase();
        console.log(userIdOfPost);
        const postRef = ref(db, 'posts/' + userIdOfPost + "/" + postId);
        console.log(postRef);

        await runTransaction(postRef, (post) => {
            if (post) {
                
                post.state = "Accepted";
                post.acceptedID = userid;
                console.log(post);
            }
            return post
        });
    }

    //console.log(getAuth().currentUser.uid)
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
            <div className='container xl:w-1/2 grid lg:grid-cols-2 grid-cols-1 pt-1 mx-auto mt-10'>
                <div className='lg:m-5 '>
                    <img src={image} alt="post" class="lg:w-full w-3/4 mx-auto object-cover rounded-xl" />
                    <div class="px-4 py-4 flex flex-col justify-center items-start">
                        <div class="text-2xl my-5 font-bold self-center">{post[10]}</div>

                        <div class="text-gray-700 my-4 flex text-xl"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>{when}</div>
                        <div class="text-gray-700 my-4 flex flex-row text-xl"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>{post[9]}</div>
                        {(userid === post[17]) ?
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                        title: 'Is this a joke to you?',
                                        text: "Well if you can do everything by yourself, why you need us? I guess a better question is why you need anyone. Please delete your account now. You have been blacklisted. No, you have been actually put on our murder list. We will find you. Will will get revenge.",
                                        icon: 'question',
                                    })
                                }}
                                className='mx-auto w-full py-2 bg-blueish5 hover:bg-blueish7 text-white rounded'>Help them</button>
                            :
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                        title: 'Are you sure you want to help?',
                                        text: "By continuing you are hereby committing to help this person",
                                        icon: 'question',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, I want!'
                                    }).then((result) => {
                                        if (result.value) {
                                            Swal.fire(
                                                'Thanks!',
                                                'Your request was sent.',
                                                'success'
                                            ).then(() => {
                                                //deletePost(value.postid);
                                                helpedPostTriger(post[17], post[11])
                                                sendEmail(auth.currentUser.email, post[5], post[17]+"/"+post[11])
                                            })
                                        }
                                    }
                                    )
                                }}


                                className='mx-auto w-full py-2 bg-blueish5 hover:bg-blueish7 text-white rounded'>Help them</button>
                        }
                    </div>
                </div>
                <div className=' w-full break-words lg:pt-10'>
                    <h1 className='text-center w-fill text-xl mb-10'>About</h1>
                    <div className='px-5 text-justify break-words mb-10'>{post[2]}</div>
                    <h1 className='text-center w-fill text-xl mb-10'>More detail</h1>

                    <div className='mb-10 text-justify break-words px-5'>{post[0]}</div>

                </div>

            </div>

            <div className='w-fill h-96'>{(lat === 0 || long === 0) ? <></> : <MapComp lat={lat} long={long} />}</div>
        </div>

    )
}
