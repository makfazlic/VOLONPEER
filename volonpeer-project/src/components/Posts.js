import { useState, useEffect } from 'react'
import { ref, getDatabase, query, orderByChild, get, child, set, onValue } from "firebase/database";
import { database } from "../firebase";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { UserAddIcon } from "@heroicons/react/outline";

export default function Posts() {
    const [postArray, setPostArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState('')


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
                const starsRef = storageRef(storage, newitems[i][2]);



                getDownloadURL(starsRef)
                    .then((url) => {
                        // Insert url into an <img> tag to "download"
                        newitems[i][2] = url
                        setPostArray(postArray.concat(newitems))
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
            setLoading(false)


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
                <div className="container 2xl:w-1/2 mx-auto">

                
                    
                    <div className="flex flex-col items-center hover:opacity-100 bg-gray-200 opacity-80 mb-10 rounded-xl">
                    <div className="flex-1">
                            <img src={postArray[i][2]} className='rounded-t-xl ' alt="post" />
                        </div>
                        <div className="flex-1 rounded-b-xl text-left">
                            <h1 className="text-2xl font-bold mt-5">{postArray[i][0]}</h1>
                            <p className="text-lg">{postArray[i][1]}</p>
                        
                        </div>
            
                </div>
                </div>
                
                )
        
            }
        return rows;
        

    }



}
