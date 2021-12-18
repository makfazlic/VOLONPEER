import { useState, useEffect } from 'react'
import { ref, getDatabase, query, orderByChild, get, child, set, onValue } from "firebase/database";
import { database } from "../firebase";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { ShieldExclamationIcon } from "@heroicons/react/outline";
import Swal from 'sweetalert2'

export default function Posts() {
    const [postArray, setPostArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(true)
    const [reported, setReport] = useState(false)


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

            var newitems = items.map(f => [f.title, f.about, f.image, f.date])
            console.log(postArray)

            for (let i in newitems) {
                if (newitems[i][2] != "images/basic.png") {
                    const starsRef = storageRef(storage, newitems[i][2]);



                    getDownloadURL(starsRef)
                        .then((url) => {
                            console.log(url)
                            console.log(loaded)
                            if (loaded) {
                                // Insert url into an <img> tag to "download"
                                newitems[i][2] = url
                                console.log(newitems[i][2])

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
                                newitems[i][2] = url
                                console.log(newitems[i][2])

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
            <div className="loading">
                <div className="loading__icon">
                </div>
                <div className="loading__text">
                    <h1>Loading...</h1>
                </div>
            </div>
        )
    } else {
        var rows = []
        for (let i = 0; i < postArray.length; i++) {

            rows.push(



                <div className="relative flex flex-col items-center hover:opacity-100 m-4 bg-gray-200 opacity-80 mb-10 rounded-xl">
                    <div className="h-60 flex">
                        <img src={postArray[i][2]} className='rounded-t-xl object-fill' alt="post" />
                    </div>
                    <div className="flex-1 rounded-b-xl text-left bg-gray-200 w-full">
                        <h1 className="px-5 text-xl font-bold mt-5 text-center">{postArray[i][0]}</h1>
                        <p className="px-4 mt-5 mx-2 pb-2 text-lg overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 h-32 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                            {postArray[i][1]}
                        </p>

                    </div>
                    <div className='flex justify-between px-5 w-full mb-5'>
                        <a className="block px-4 py-2 text-md text-white bg-blueish5 hover:bg-blueish6 font-bold rounded text-white">See details</a>
                        <div className='flex justify-center items-center text-md hover:text-red-600 cursor-pointer '
                            onClick={() => {

                                if (!reported) {
                                    setReport(true)
                                    Swal.fire(
                                        'Reported!',
                                        'Thank you for helping us build an inclusive and friendly community of helpers',
                                        'success'
                                    )
                                }


                            }

                            }
                        >

                            <><span className='mr-1'>Report</span>
                                <ShieldExclamationIcon className='h-5' />
                            </>
                        </div>
                    </div>
                    <div className='top-0 right-0 absolute pb-10 pl-48 rounded-tr-xl pt-2 pr-4 bg-gradient-to-tr from-transparent via-transparent to-black'>
                        <span className='text-white'>Now</span>
                    </div>
                </div>

            )

        }
        return <>
            <h1 className="text-2xl font-bold w-full leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate text-center mt-20 mb-10">All posts</h1>
            <div className='container mx-auto grid  md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 '>
                {rows}
            </div>
        </>;


    }



}
