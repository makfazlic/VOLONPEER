import { useState, useEffect } from 'react'
import { ref, getDatabase, query, runTransaction, update, orderByChild, get, child, set, onValue } from "firebase/database";
import { database } from "../firebase";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { ShieldExclamationIcon } from "@heroicons/react/outline";
import Swal from 'sweetalert2'
import { useAuth, storage } from '../firebase'
import { current } from 'daisyui/colors';


function date(a_date, for_else) {

    var OneDay = new Date().getTime() - (1 * 24 * 60 * 60 * 1000)
    var TwoDay = new Date().getTime() - (2 * 24 * 60 * 60 * 1000)
    var Month = new Date().getTime() - (30 * 24 * 60 * 60 * 1000)

    if (a_date > OneDay) {
        return "Today"
    }
    else if (a_date > TwoDay) {
        return "Yesterday"
    } else if (a_date >= Month) {
        return "This month"
    }
    else if (a_date < Month) {
        return for_else.split(",")[0];
    }
}

function updateReport(user_id, post_id, user) {
    const updates = {}
    const users = []

    const postRef = ref(database, `posts/${user_id}/${post_id}`)
    runTransaction(postRef, (post) => {
        if (post) {
            for (let key in post.reportedby) {
                users.push(post.reportedby[key])
            }
            if (post.reported <= 4) {
                post.reported++;
            }
            if (post.reportedby.one == "") {
                post.reportedby.one = user;
            } else if (post.reportedby.two == "") {
                post.reportedby.two = user;
            }
            else if (post.reportedby.three == "") {
                post.reportedby.three = user;
            }
            else if (post.reportedby.four == "") {
                post.reportedby.four = user;
            }
            else if (post.reportedby.five == "") {
                post.reportedby.five = user;
            }
        }
        return post


    })
    console.log(users)
    return users
}

export default function Posts() {
    const [postArray, setPostArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(true)
    const currentUser = useAuth()


    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, 'posts');
        const items = [];
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                for (let i in childData) {
                    items.push(childData[i]);
                }

            });

            const storage = getStorage();

            var newitems = items.map(f => [
                f.name, // 0
                f.user, // 1
                f.postid, // 2
                f.title, // 3
                f.compelling, // 4 
                f.about, // 5
                f.image, // 6
                f.datepost, // 7
                f.dateby, // 8
                f.location, // 9
                f.reported, //10
                f.time, // 11
                f.reportedby // 12
            ])
            console.log("These are:", newitems[0][12].one)
            console.log(postArray)

            for (let i in newitems) {
                if (newitems[i][6] != "images/basic.png") {
                    const starsRef = storageRef(storage, newitems[i][6]);



                    getDownloadURL(starsRef)
                        .then((url) => {
                            console.log(url)
                            console.log(loaded)
                            if (loaded) {
                                // Insert url into an <img> tag to "download"
                                newitems[i][6] = url
                                console.log(newitems[i][6])

                                setPostArray(postArray.concat(newitems))
                                setLoaded(false)
                            }
                        })
                        .catch((error) => {
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                default:
                                    // console.log(error.message);
                                    break;
                                case 'storage/object-not-found':
                                    console.log('File does not exist');
                                    // File doesn't exist
                                    break;
                                case 'storage/unauthorized':
                                    console.log('User doesn\'t have permission to access the object');
                                    // User doesn't have permission to access the object
                                    break;
                                case 'storage/canceled':
                                    console.log('User canceled the upload');
                                    // User canceled the upload
                                    break;
                                case 'storage/unknown':
                                    console.log('Unknown error occurred, inspect the server response');
                                    // Unknown error occurred, inspect the server response
                                    break;
                            }
                        });
                }
                else {
                    const starsRef = storageRef(storage, "images/basic.png");



                    getDownloadURL(starsRef)
                        .then((url) => {
                            console.log(url)
                            console.log(loaded)
                            if (loaded) {
                                // Insert url into an <img> tag to "download"
                                newitems[i][6] = url

                                setPostArray(postArray.concat(newitems))
                                setLoaded(false)
                            }
                        })
                        .catch((error) => {
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                default:
                                    // console.log(error.message);
                                    break;
                                case 'storage/object-not-found':
                                    console.log('File does not exist');
                                    // File doesn't exist
                                    break;
                                case 'storage/unauthorized':
                                    console.log('User doesn\'t have permission to access the object');
                                    // User doesn't have permission to access the object
                                    break;
                                case 'storage/canceled':
                                    console.log('User canceled the upload');
                                    // User canceled the upload
                                    break;
                                case 'storage/unknown':
                                    console.log('Unknown error occurred, inspect the server response');
                                    // Unknown error occurred, inspect the server response
                                    break;
                            }
                        });
                }

            }


        }, {
            onlyOnce: true
        });
        setLoading(false)

    }, [])


    if (loading) {
        return (
            <div class="flex items-center justify-center h-screen">
            <div class="flex items-center justify-center space-x-2 animate-bounce">
                <div class="w-8 h-8 bg-blueish5 rounded-full"></div>
                <div class="w-8 h-8 bg-greenish5 rounded-full"></div>
                <div class="w-8 h-8 bg-gray-500 rounded-full"></div>
            </div>
        </div>
        )
    } else {
        var rows = []
        for (let i = 0; i < postArray.length; i++) {

            rows.push(


                (postArray[i][10] === 5) ?  <></> : <div className="relative flex flex-col items-center hover:opacity-100 m-4 bg-gray-200 opacity-80 mb-10 rounded-xl">
                            <div className="h-60 flex">
                                <img src={postArray[i][6]} className='rounded-t-xl object-fill' alt="post" />
                            </div>
                            <div className="flex-1 rounded-b-xl text-left bg-gray-200 w-full">
                                <h1 className="px-5 text-xl font-bold mt-5 text-center">{postArray[i][3]}</h1>
                                <p className="px-4 mt-5 mx-2 pb-2 mb-5 text-lg break-words overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 h-32 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                                    {postArray[i][4]}
                                </p>

                                <div className='flex justify-between px-5 w-full mb-5'>
                                    <a className="block px-4 py-2 text-md text-white bg-blueish5 hover:bg-blueish6 font-bold rounded text-white" href={'/posts/'+postArray[i][2]}>See details</a>
                                    {postArray[i][12].one == currentUser.uid || postArray[i][12].two == currentUser.uid || postArray[i][12].three == currentUser.uid || postArray[i][12].four == currentUser.uid || postArray[i][12].five == currentUser.uid ?
                                        <div className='flex justify-center items-center text-md opacity-60 text-red-600 cursor-pointer '
                                            onClick={() => {


                                                Swal.fire(
                                                    'Already reported!',
                                                    'You have already reported this post',
                                                    'info'
                                                )



                                            }

                                            }
                                        >

                                            <span className='mr-1'>Reported</span>
                                            <ShieldExclamationIcon className='h-5' /> </div>

                                        :

                                        <div className='flex justify-center items-center text-md hover:text-red-600 cursor-pointer '
                                            onClick={() => {

                                                updateReport(postArray[i][1], postArray[i][2], currentUser.uid)

                                                Swal.fire(
                                                    'Reported!',
                                                    'Thank you for helping us build an inclusive and friendly community of helpers',
                                                    'success'
                                                ).then(() => {
                                                    window.location.reload()
                                                })







                                            }

                                            }
                                        >

                                            <span className='mr-1'>Report</span>
                                            <ShieldExclamationIcon className='h-5' /> </div>

                                    }
                                </div>
                                <div className='top-0 right-0 absolute pb-10 pl-48 rounded-tr-xl pt-2 pr-4 bg-gradient-to-tr from-transparent via-transparent to-black'>
                                    <span className='text-white text-sm font-bold'>{date(postArray[i][11], postArray[i][7])}</span>
                                </div>
                            </div >
                        </div>

            )

        }
        return <div className="min-h-screen">
            <h1 className="text-2xl font-bold w-full leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate text-center mt-20 mb-10">All posts</h1>
            <div className='container mx-auto grid  md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 '>
                {rows}
            </div>
        </div>;


    }



}
