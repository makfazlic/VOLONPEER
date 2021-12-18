import React, { useRef, useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { useAuth, database, storage } from '../firebase'
import { ref as storageRef, uploadBytes } from 'firebase/storage'

import Maps from '../components/Maps';

export default function NewPosts() {
    const title = useRef()
    const about = useRef()
    const location = useRef()
    const currentUser = useAuth()
    const [selectedFile, setSelectedFile] = useState();
    const [selected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    async function handleSubmit(e) {
        var today = new Date();
        e.preventDefault()
        console.log(title.current.value, about.current.value, location.current.value, today.toLocaleString())
        console.log(currentUser.email);

        if (selected) {
            console.log(selectedFile)
        }
        const postListRef = ref(database, 'posts/' + currentUser.uid);
        const newPostRef = push(postListRef);
        console.log(newPostRef.key)

        const imagesRef = storageRef(storage, 'images' + "/" + currentUser.uid + "/" + newPostRef.key);

        const uploadRef = 
        push(ref(database, 'posts/' + currentUser.uid), {
            title: title.current.value,
            about: about.current.value,
            location: location.current.value,
            image: imagesRef.fullPath,
            date: today.toLocaleString(),
        });

        if (selected) {
            const snapshot = await uploadBytes(imagesRef, selectedFile);
            console.log(snapshot.downloadURL);

        }


    }
    return (
        <>
            <div>
                <div className="pb-20 pt-10 md:grid md:grid-cols-2 md:gap-6">
                    <div className="mt-5 mx-auto md:mt-0 md:col-span-2">
                        <h1 className="text-2xl font-bold w-full leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate text-center mt-20 mb-10">Ask from community </h1>
                        <form onSubmit={handleSubmit}>
                            <div className=" sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                            Post title
                                        </label>
                                        <input
                                            ref={title}
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder="Enter the title of your post"
                                            className="mt-1 focus:ring-blueish5 focus:border-blueish5 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>



                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            About
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                ref={about}
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="shadow-sm focus:ring-blueish5 focus:border-blueish5 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder="Tell us a about your post."
                                                defaultValue={''}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Tell us more about your post, and any details which the helpers should know beforehand.
                                        </p>
                                    </div>



                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">A photo related to the request</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-blueish6 hover:text-blueish5 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blueish5"
                                                    >
                                                        <span>Upload a Photo</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={changeHandler} />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                            Location:
                                        </label>
                                        <input
                                            ref={location}
                                            type="text"
                                            name="location"
                                            id="location"
                                            placeholder="Enter your location here"
                                            className="mt-1 focus:ring-blueish5 focus:border-blueish5 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    < Maps />
                                </div>

                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        href= "/posts"
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blueish6 hover:bg-blueish7 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueish5"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>

            </div>
        </>
    )
}

