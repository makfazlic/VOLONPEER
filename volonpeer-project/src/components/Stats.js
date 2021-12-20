import { useState, useEffect } from 'react'
import { getStorage, ref as storageRef, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth, database, storage } from "../firebase";
import { onValue, ref } from "firebase/database";

export default function Stats() {
    const [usersCount, setUsersCount] = useState([])
    const [activeCount, setActiveCount] = useState([])
    const [postCount, setPostCount] = useState([])

    useEffect(() => {
        const dbRef1 = ref(database, 'users');
        const userc = [];
        onValue(dbRef1, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                console.log(childData);
                userc.push(childData)
                //console.log(j)

                setUsersCount(userc);


            })
        });

        const dbRef = ref(database, 'posts');
        const postsc = [];
        const activc = [];
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                console.log(childData);
                for (let i in childData) {
                    postsc.push(childData[i])
                   
                }
                //console.log(j)

                setActiveCount(userc);
                setPostCount(postsc);


            })
        });

    }, [])

    var count = 0;
    var active = 0;
    var posts = 0;
    console.log(postCount);
    usersCount.forEach((val) => {
        count += 1;
    })

    postCount.forEach((val) => {
        if (val.state !== "Not Accepted") {
            console.log(val)
            active+= 1;
        }
        
    })

    postCount.forEach((val) => {
        posts += 1;
    })


    return (
        <div className="pb-12 mt-20 bg-white container mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-blueish6 font-semibold tracking-wide uppercase">statistics</h2>
                    <p className="mt-2 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-4xl leading-10">
                        The numbers speak for themselves
                    </p>
                </div>

                <div className="mt-10 md:mt-20">
                    <div className="w-full shadow-2xl stats grid-flow-row md:grid-flow-col">
                        <div className="stat place-items-center place-content-center">
                            <div className="stat-title">Users</div>
                            <div className="stat-value">{count}</div>
                            
                        </div>
                        <div className="stat place-items-center place-content-center">
                            <div className="stat-title">Posts</div>
                            <div className="stat-value text-success">{posts}</div>
                           
                        </div>
                        <div className="stat place-items-center place-content-center">
                            <div className="stat-title">Successfull colaborations</div>
                            <div className="stat-value text-error">{active}</div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}