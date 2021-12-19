import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from '../firebase'
export default function SinglePost(props) {
    const db = getDatabase();
    const id = props.match.params.id;
    async function populateSinglePost() {

        
        return onValue(ref(db, '/posts/' + id), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                console.log(childData)
            })
        }, {
            onlyOnce: true
        });
    }


    return (

        <div>

        </div>
    )
}
