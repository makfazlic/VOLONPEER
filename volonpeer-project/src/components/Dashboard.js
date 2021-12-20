import { useState, useEffect } from 'react'
import { ref, getDatabase, query, orderByChild, get, child, set, onValue, runTransaction } from "firebase/database";
import { useAuth, database, storage } from "../firebase";
import { getStorage, ref as storageRef, getDownloadURL, deleteObject } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2';






export default function Dashboard(props) {
    const [postArray, setPostArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [userInfoFromData, setuserInfoFromData] = useState({});
    const [profile, setProfile] = useState("");
    const [cover, setCover] = useState("");
    const [image, setImage] = useState("");
    const [userItemsFromDatabase, setuserItemsFromDatabase] = useState([]);
    const [userIdFromDatabase, setuserIdFromDatabase] = useState("");
    const [jobFromDatabase, setJobFromDatabase] = useState([]);



    useEffect(() => {
        const storage = getStorage();
        const auth = getAuth();
        const db = getDatabase();




        onAuthStateChanged(auth, (user) => {
            const dbRef = ref(db, 'posts');
            const items = [];
            const userItems = []
            onValue(dbRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    for (let i in childData) {
                        items.push(childData[i]);
                        //console.log(childData[i].user);
                        //console.log(getAuth().currentUser.uid, childData[i].user);
                        if (childData[i].user === getAuth().currentUser.uid) {
                            userItems.push(childData[i]);
                        }
                        //console.log(userItems);
                        setuserItemsFromDatabase(userItems);
                    }

                })

                console.log(userItems);
                userItems.forEach((val) => {
                    if (val.image !== "images/basic.png") {
                        const starRef1 = storageRef(storage, val.image);

                        getDownloadURL(starRef1)
                            .then((url) => {
                                val.image = url
                                setImage(url);
                            })

                    }
                })

            });

            const items1 = [];
            const userItems1 = []
            const dbRef1 = ref(database, 'posts');
            onValue(dbRef1, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    for (let i in childData) {
                        items1.push(childData[i]);
                        //console.log(childData[i].user);
                        //console.log(getAuth().currentUser.uid, childData[i].user);
                        console.log(childData[i]);
                        console.log(getAuth().currentUser.uid);
                        console.log(childData[i].acceptID);
                        if (childData[i].acceptedID === getAuth().currentUser.uid) {
                            userItems1.push(childData[i]);
                        }
                        console.log(userItems1);
                        //console.log(userItems);
                        setJobFromDatabase(userItems1);
                    }

                })
            });

            const starCountRef = ref(db, 'users/' + getAuth().currentUser.uid);
            setuserIdFromDatabase(getAuth().currentUser.uid);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                //console.log(data);


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

    function deletePost(id) {
        //const storage = getStorage();
        console.log(userIdFromDatabase);
        const db = getDatabase();
        set(ref(db, 'posts/' + userIdFromDatabase + '/' + id), null).then(() => {
            console.log("Post Removed");
            window.location.href = "/dashboard";
        }).catch((error) => {
            console.log(error);
        });
        //const desertRef = ref(storage, 'posts/' + userIdFromDatabase + '/' + id);

        //dbRef.remove();

    }

    function addPoints(acceptedId) {
        console.log(userIdFromDatabase);
        const db = getDatabase();
        const postRef = ref(db, 'users/' + acceptedId);
        runTransaction(postRef, (user) => {
            if (user) {
                user.points += 5;
            }
            return user;
        });
    }

    function reducePoints(acceptedId) {
        console.log(userIdFromDatabase);
        const db = getDatabase();
        const postRef = ref(db, 'users/' + acceptedId);
        runTransaction(postRef, (user) => {
            if (user) {
                if (user.points > 4) {
                    user.points -= 5;
                } else {
                    user.points = 0;
                }

            }
            return user;
        });
    }

    function getJob() {

        const render = [];
        for (var i = 0; i < jobFromDatabase.length; i++) {

            render.push(
                <tr>
                    <th>{i+1}</th>
                    <td>{jobFromDatabase[i].title}</td>
                    <td>{jobFromDatabase[i].name}</td>
                    <td>{jobFromDatabase[i].dateby}</td>
                    <td>{jobFromDatabase[i].location}</td>
                    <td>{jobFromDatabase[i].email}</td>
                </tr>
            )
        }
        console.log(render);
        return render;
    }

    function renderPosts() {
        const render = []
        userItemsFromDatabase.forEach((value) => {
            //console.log(value);
            (value.state == "Not Accepted") ?
                render.push(
                    <div className="w-96 h-96 mr-5 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <img className="h-1/3 w-full" src={value.image} />
                        <div className='flex flex-row justify-evenly pt-10 h-1/3'>
                            <h1 className='font-bold'> Title </h1>
                            <div className="divider divider-vertical"></div>
                            <h1 className='w-1/2 text-left'>{value.title} </h1>
                        </div>

                        <div className='flex flex-row justify-evenly pt-10'>
                            <h1 className='font-bold pr-10'> Status </h1>
                            <h1 className='w-1/2 text-left'>{value.state}</h1>
                        </div>

                        <div className='w-full flex justify-center items-end mt-3'>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                        title: 'Are you sure?',
                                        text: "You won't be able to revert this!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, delete it!'
                                    }).then((result) => {
                                        if (result.value) {
                                            Swal.fire(
                                                'Deleted!',
                                                'Your file has been deleted.',
                                                'success'
                                            ).then(() => {
                                                deletePost(value.postid);
                                            })
                                        }
                                    }
                                    )
                                }}
                                className="text-white mx-auto hover:bg-red-800 py-2 px-4 bg-red-700 rounded "
                            >
                                Delete your Request
                            </button>
                        </div>

                    </div>
                )
                :
                render.push(
                    <div className="w-96 h-96 mr-5 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <img className="h-1/3 w-full" src={value.image} />
                        <div className='flex flex-row justify-evenly pt-10 h-1/3'>
                            <h1 className='font-bold'> Title </h1>
                            <div className="divider divider-vertical"></div>
                            <h1 className='w-1/2 text-left'>{value.title} </h1>
                        </div>

                        <div className='flex flex-row justify-evenly pt-10'>
                            <h1 className='font-bold pr-10'> Status </h1>
                            <h1 className='w-1/2 text-left'>{value.state}</h1>
                        </div>

                        <div className='w-full flex justify-between items-end mt-3'>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                        title: 'Are you sure?',
                                        text: "You won't be able to revert this, if it is not done!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, it is done!'
                                    }).then((result) => {
                                        if (result.value) {
                                            Swal.fire(
                                                'Done!',
                                                'Congrats!.',
                                                'success'
                                            ).then(() => {
                                                reducePoints(value.acceptedID);
                                                deletePost(value.postid);
                                            })
                                        }
                                    }
                                    )
                                }}
                                className="text-white mx-auto hover:bg-red-800 py-2 px-4 bg-red-700 rounded "
                            >
                                Abandoned
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                        title: 'Are you sure?',
                                        text: "You won't be able to revert this, if it is not done!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, it is done!'
                                    }).then((result) => {
                                        if (result.value) {
                                            Swal.fire(
                                                'Done!',
                                                'Congrats!.',
                                                'success'
                                            ).then(() => {
                                                addPoints(value.acceptedID);
                                                deletePost(value.postid);
                                            })
                                        }
                                    }
                                    )
                                }}
                                className="text-white mx-auto hover:bg-greenish5 py-2 px-4 bg-greenish7 rounded "
                            >
                                Finished
                            </button>
                        </div>

                    </div>
                )
        })
        return render;
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

                    <div className='mt-10 flex flex-col'>
                        <h1 className='text-bold pb-5'> ABOUT: </h1>

                        <div className='flex flex-row'>
                            <h1 className='w-36  p-2 font-bold '> Country:</h1>
                            <p className='p-2'> {userInfoFromData.country} </p>
                        </div>

                        <div className=' mt-3 flex flex-row'>
                            <h1 className='w-36 p-2 font-bold '> Street Address:</h1>
                            <p className='p-2'> {userInfoFromData.streeAdress} </p>
                        </div>

                        <div className='mt-3 flex flex-row'>
                            <h1 className='w-36 p-2 font-bold '> City:</h1>
                            <p className='p-2'> {userInfoFromData.city} </p>
                        </div>

                        <div className='mt-3 flex flex-row'>
                            <h1 className='w-36  p-2 font-bold '> State/Province:</h1>
                            <p className='p-2'> {userInfoFromData.state} </p>
                        </div>

                        <div className='mt-3 flex flex-row'>
                            <h1 className='w-36  p-2 font-bold '> ZIP/Postal code:</h1>
                            <p className='p-2'> {userInfoFromData.zip} </p>
                        </div>
                    </div>

                    <div className="pl-100 mb-20 flex overflow-x-scroll pb-10 mt-10 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100  md:ml-0">

                        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ">
                            <div className="inline-block px-3 sm: px-0 flex  pt-1 flex-row">
                                {renderPosts()}
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className='text-center font-bold w-full mt-10 '>The Jobs you accepted</h1>
                <div className="overflow-x-auto container mx-auto mt-10 w-full lg:w-1/2 mb-20">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Job</th>
                                <th>Name</th>
                                <th>Time</th>
                                <th>Location</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getJob()}
                        </tbody>
                    </table>
                </div>

            </div>

        </>

    )


}