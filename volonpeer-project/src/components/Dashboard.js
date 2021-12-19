import { useState, useEffect } from 'react'
import { ref, getDatabase, query, orderByChild, get, child, set, onValue } from "firebase/database";
import { useAuth, database, storage } from "../firebase";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";






export default function Dashboard(props) {
    const [postArray, setPostArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [userInfoFromData, setuserInfoFromData] = useState({});
    const [profile, setProfile] = useState("");
    const [cover, setCover] = useState("");



    useEffect(() => {
        const storage = getStorage();
        const auth = getAuth();
        const db = getDatabase();
        
        const items = [];
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                for (let i in childData) {
                    items.push(childData[i]);
                    console.log(childData[i]);
                }

            });
        );


        onAuthStateChanged(auth, (user) => {
            
            const starCountRef = ref(db, 'users/' + getAuth().currentUser.uid);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                console.log(data);


                if (data.profilePic != "images/profile_basic.jpg") {
                    const starsRef = storageRef(storage, data.profilePic);

                    getDownloadURL(starsRef)
                        .then((url) => {
                            setProfile(url);
                            setuserInfoFromData(data);

                        })
                } else {
                    const starsRef = storageRef(storage, "images/profile_basic.jpg");
                    getDownloadURL(starsRef)
                        .then((url) => {
                            setProfile(url);
                            setuserInfoFromData(data);
                        })

                }

                if (data.coverPic != "images/cover_basic.jpg") {
                    const starsRef = storageRef(storage, data.coverPic);

                    getDownloadURL(starsRef)
                        .then((url) => {

                            setCover(url);
                            setuserInfoFromData(data);

                        })
                } else {
                    const starsRef = storageRef(storage, "images/cover_basic.jpg");
                    getDownloadURL(starsRef)
                        .then((url) => {
                            setCover(url);
                            setuserInfoFromData(data);
                        })

                }

            });
        });

    }, [])

    const points = userInfoFromData.points > 200 ? 200 : userInfoFromData.points;
    //console.log(points);

    function findingRankOfTHeUser(points) {
        if (points < 30) {
            return "A conscious Citizen"
        } else if (points < 60) {
            return "A helpful Citizen"
        } else if (points < 90) {
            return "A friendly neighborhood hero"
        } else if (points < 140) {
            return "The local hero"
        } else if (points < 200) {
            return "National Hero"
        } else {
            return "Superhero"
        }
    }

    function findTheNextRank(points) {
        if (points < 30) {
            return 30
        } else if (points < 60) {
            return 60
        } else if (points < 90) {
            return 90
        } else if (points < 140) {
            return 140
        } else {
            return 200
        }
    }

    const nextRank = findTheNextRank(points);
    const rankOfUser = findingRankOfTHeUser(points);

    return (
        <>
            <div className="flex-auto">

                <img className='h-96 w-full object-fill' src={cover} alt='' />
                <div className="md:flex flex-col lg:flex-row justify-evenly mt-5" >

                    <div className="card compact side bg-base-100">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div>
                                <div className="avatar">
                                    <div className="rounded-full w-14 h-14 shadow">
                                        <img src={profile} alt=''></img>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex flex-col'>
                                    <div>
                                        <h2 className="card-title">{userInfoFromData.firstname} {userInfoFromData.lastname}</h2>
                                        <p className="text-base-content text-opacity-40">{rankOfUser}</p>
                                    </div>

                                    <div className='mt-2 w-30'>
                                        <p>{userInfoFromData.about}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-screen lg:w-1/4 mt-2 stats r-10 ">
                        <div className="stat">
                            <div className="stat-value">{points}/{nextRank}</div>
                            <div className="stat-title">Progress to next Rank</div>
                            <div className="stat-desc">
                                <progress value={points} max={nextRank} className="progress progress-secondary"></progress>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='md:flex flex-col lg:flex-row justify-evenly mt-5'>
                    <div className='mt-10 flex flex-col -mr-40'>
                        <div className='flex flex-row'>
                            <h1 className='w-36  p-2 font-bold shadow'> Country:</h1>
                            <p className='p-2'> {userInfoFromData.country} </p>
                        </div>

                        <div className=' mt-3 flex flex-row'>
                            <h1 className='w-36 border p-2 font-bold shadow'> Street Address:</h1>
                            <p className='p-2'> {userInfoFromData.streeAdress} </p>
                        </div>

                        <div className='mt-3 flex flex-row'>
                            <h1 className='w-36 border p-2 font-bold shadow'> City:</h1>
                            <p className='p-2'> {userInfoFromData.city} </p>
                        </div>

                        <div className='mt-3 flex flex-row'>
                            <h1 className='w-36 border p-2 font-bold shadow'> State/Province:</h1>
                            <p className='p-2'> {userInfoFromData.state} </p>
                        </div>

                        <div className='mt-3 flex flex-row'>
                            <h1 className='w-36 border p-2 font-bold shadow'> ZIP/Postal code:</h1>
                            <p className='p-2'> {userInfoFromData.zip} </p>
                        </div>
                    </div>
                    <div className="mb-20 flex overflow-x-scroll pb-10 mt-10 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 ml-60  md: ml-0">
                        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
                            <div className="inline-block px-3 sm: px-0">
                                <div className="w-96 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                    <p>Something </p>
                                    <button>Something </button>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>

        </>

    )


}