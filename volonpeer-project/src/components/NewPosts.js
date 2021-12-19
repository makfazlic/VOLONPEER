import React, { useRef, useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { useAuth, database, storage } from '../firebase'
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { BadgeCheckIcon } from '@heroicons/react/outline';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';


export default function NewPosts() {
  const name = useRef()
  const title = useRef()
  const compelling = useRef()
  const about = useRef()
  const location = useRef()
  const currentUser = useAuth()
  const [loaded, setLoaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState();
  const [selected, setIsSelected] = useState(false);
  const [value, setValue] = React.useState(new Date());
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {

    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(lat, lng);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  const changeHandler = (event) => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };


  function prepareHandleSubmit(e) {
    e.preventDefault()
    if (title.current.value.length == 0 || compelling.current.value.length == 0 || about.current.value.length == 0) {
      Swal.fire(
        "Fill all required fields",
        "To make your post appear on our platform you need to complete all fields mareked with red",
        "error"
      )
    }
    else {
      handleSubmit(e).then(() => {


        console.log("here1");
        Swal.fire(
          "You have made a submisson",
          "You can see your post on your dashboard at any time",
          "success"

        ).then(() => {
          window.location.href = "/posts"

        })
      });



    }
  }
  async function handleSubmit(e) {


    var today = new Date();
    e.preventDefault()


    const postListRef = ref(database, 'posts/' + currentUser.uid);
    const newPostRef = push(postListRef);

    const imagesRef = storageRef(storage, 'images' + "/" + currentUser.uid + "/" + newPostRef.key);
    const postUnderListRef = ref(database, "posts" + "/" + currentUser.uid)

    const pushSet = push(postUnderListRef)

    const upload = {
      name: name.current.value || "Posted anonymously",
      user: currentUser.uid,
      postid: pushSet.key,
      title: title.current.value,
      compelling: compelling.current.value,
      about: about.current.value,
      location: location.current.value || "Unspecified",
      image: selected ? imagesRef.fullPath : "images/basic.png",
      datepost: today.toLocaleString(),
      time: new Date().getTime(),
      dateby: value.toLocaleString(),
      reported: 0,
      lat: lat || 46.8182,
      lng: lng || 8.2275,
      reportedby: {
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",

      }

    }
    set(pushSet, upload);

    if (selected) {
      console.log(upload.image)
      await uploadBytes(imagesRef, selectedFile);

    }
    else {
      console.log(upload.image)
    }

    setLoaded(true)
    console.log("here2")

  }

  console.log("This is the date", value)
  return (
    <>
      <div>
        <div className="pb-20 pt-10 md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 mx-auto md:mt-0 md:col-span-2">
            <h1 className="text-2xl font-bold w-full leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate text-center mt-20 mb-10">Ask from community </h1>
            <form onSubmit={prepareHandleSubmit}>
              <div className=" sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      ref={name}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      className="mt-1 focus:ring-blueish5 focus:border-blueish5 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      This is going to be displayed on yout post.
                    </p>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Post title <span className='text-red-600'> *</span>
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


                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      When you need help <span className='text-red-600'> *</span>
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}

                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}

                      />

                    </LocalizationProvider>

                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-5">
                      Share your location if you need help here.
                    </label>
                    <a className='py-3 px-4 rounded hover:bg-gray-300 text-black border-2 border-black mt-2' onClick={
                      () => { getLocation() }}>{(lat === null || lng === null) ? "Get Location" : "Located"}</a>
                  </div>





                  <div>
                    <label htmlFor="compelling" className="block text-sm font-medium text-gray-700">
                      Compeling description <span className='text-red-600'> *</span>
                    </label>
                    <div className="mt-1">
                      <textarea
                        ref={compelling}
                        id="compelling"
                        name="compelling"
                        rows={3}
                        className="shadow-sm focus:ring-blueish5 focus:border-blueish5 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Write a short interesting description about your post."
                        defaultValue={''}
                      />
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      Write something that will get someone interested in your post.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      About <span className='text-red-600'> *</span>
                    </label>
                    <div className="mt-1">
                      <textarea
                        ref={about}
                        id="about"
                        name="about"
                        rows={7}
                        className="shadow-sm focus:ring-blueish5 focus:border-blueish5 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Tell us a more about your post."
                        defaultValue={''}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Tell us more about your post, and any details which the helpers should know beforehand.
                    </p>
                  </div>



                  <div>
                    <label className="block text-sm font-medium text-gray-700">A photo related to the request</label>
                    <div class="border border-dashed rounded-xl mt-1 border-gray-500 relative">
                      <input id="file-upload" name="file-upload" type="file" multiple class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" onChange={changeHandler} />
                      {selected ?
                        <div class="text-center p-20 absolute top-0 right-0 left-0 m-auto flex justify-center items-center">

                          <BadgeCheckIcon className='h-7 mr-1' />
                          <span class="">Selected</span>
                        </div> : <div class="text-center p-10 absolute top-0 right-0 left-0 m-auto">

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
                          </div>
                          <h4>
                            Drop files anywhere to upload
                            <br />or
                          </h4>
                          <p class="">Select Files</p>
                        </div>}
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

                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between items-center">
                  <span className='text-red-600 text-sm'>* mandatory fields</span>

                  <button




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

