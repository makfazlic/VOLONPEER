import { useState, useEffect } from "react"
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage, ref as sref, getDownloadURL } from "firebase/storage";


export default function Example() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storage = getStorage();

        const db = getDatabase();
        const dbRef = ref(db, '/users');


        onValue(dbRef, (snapshot) => {
            const temp = [];
            snapshot.forEach((childSnapshot) => {
                var tmp_obj = {}
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                //console.log(childData);
                const starsRef = sref(storage, 'images/users/' + childKey + '/1/' + childKey);
                tmp_obj = childData
                getDownloadURL(starsRef)
                    .then((url) => {
                        tmp_obj.profilePic = url;
                        //console.log(tmp_obj.profilePic);
                    }).catch((error) => {
                        const starsRef2 = sref(storage, 'images/profile_basic.jpg');
                        getDownloadURL(starsRef2)
                            .then((url2) => {
                                tmp_obj.profilePic = url2;
                           })
                    });




                temp.push(tmp_obj);
                //setPeople(people.concat(childSnapshot.val()));
                // ...
            });

            temp.sort(function (a, b) {
                return b.points - a.points;
            })
            setPeople(temp);

        }, {
            onlyOnce: true
        });
        setTimeout(() => {
            setLoading(true);
        }, 3000);

    }, []);
    
    console.log(people);

    return (!loading? <></> :
        <div className="flex flex-col container mx-auto">
            <h1 className="text-center text-2xl font-bold mt-20 mb-10">Current Superhero Standings</h1>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Represents                                        </th>

                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Score
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {people.map((person) => (
                                    <tr key={person.county}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={person.profilePic} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{person.firstname}</div>
                                                    <div className="text-sm text-gray-500">{person.country}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{person.city}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.points}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}