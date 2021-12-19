import { useState, useEffect } from 'react'
import { getDatabase, ref, get, child, onValue } from 'firebase/database';
import { getAuth } from '../firebase'
export default function SinglePost(props) {
    const db = getDatabase();
    const [post, setPost] = useState(null);
    //const id = props.match.params.id;
    async function populateSinglePost() {
        const items = []
        var segment_str = window.location.pathname; // return segment1/segment2/segment3/segment4
        var segment_array = segment_str.split( '/' );
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
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
        return items;
    }

    useEffect(async () => {
        let x = await populateSinglePost()
        setPost(x);
        console.log(x);
    }, []);

    return (

        <div>
            <p></p>
        </div>
    )
}
