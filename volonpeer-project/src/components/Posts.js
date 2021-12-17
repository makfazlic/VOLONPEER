import { ref, getDatabase, query, orderByChild, get, child, set } from "firebase/database";
import { useState, useEffect } from "react";
import { database } from "../firebase";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { UserAddIcon } from "@heroicons/react/outline";



export default function Posts() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const storage = getStorage();

    async function getImages(post) {
        const url = await getDownloadURL(storageRef(storage, post.image));
        return url;

    }

    function renderSinglePost(item) {
        console.log("This is a ", item);


                return (
                    <div className="container 2xl:w-1/2 mx-auto">
                        <div className="card lg:card-side bordered mt-10">
                            <figure>
                                <img src="" alt="" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{item.about}</p>
                                <div className="card-actions">
                                    <button className="btn btn-primary bg-blueish5 hover:bg-blueish6">Contanct</button>
                                    <button className="btn btn-ghost">More info</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

        }

    function renderMultiplePost(items) {
        return items.map(item => {
            return renderSinglePost(item);
        });
    }



async function getPosts() {
    const dbRef = ref(getDatabase());


    const local_items = []
    const posts = await get(child(dbRef, `posts/`));
    //console.log(posts.val());
    for (let x in posts.val()) {
        //console.log(x)
        for (let y in posts.val()[x]) {
            //console.log(posts.val()[x][y])
            local_items.push(posts.val()[x][y])
        }
    }
    return local_items;
}

useEffect(() => {
    setLoading(false);

    getPosts().then(items => {
        setItems(items);
    })
}, []);

// const [posts, setPosts] = useState({});

// get(child(dbRef, `posts/`)).then((snapshot) => {
//     if (snapshot.exists()) {
//         setPosts(snapshot.val());

//     } else {
//         console.log("No data available");
//     }
// }).catch((error) => {
//     console.error(error);
// });

// let items = [];

// for (let key in posts) {
//     for (let key2 in posts[key]) {
//         items.push(posts[key][key2]);
//     }};

//     console.log(items);




return (

    (loading) ? (
        <p>Loading</p>) : (
        <div>

            {renderMultiplePost(items)}
        </div>
    )

)
}