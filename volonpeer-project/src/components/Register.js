import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid'
import Swal from 'sweetalert2';
import logo2 from '../images/logo2.png'
import { register_base, useAuth, login_google } from '../firebase'
import { getDatabase, ref, onValue, set } from "firebase/database";
import google1 from '../images/google1.png'
import google2 from '../images/google2.png'

async function populateUserField(user) {
    const db = getDatabase();
    const startCountRef = ref(db, 'users/' + user.user.uid);
    onValue(startCountRef, (snapshot) => {
        if (snapshot.val() == null) {
            console.log("User Does not Exists");
            set(ref(db, 'users/' + user.user.uid), {
                firstname: "",
                lastname: "",
                country: "",
                streeAdress: "",
                city: "",
                state: "", 
                zip: "",
                about: "",
                profilePic: "images/profile_basic.jpg",
                coverPic: "images/cover_basic.jpg",        
            });
        } else {
            console.log("User Exists");
        }
    })     
}

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const currentUser = useAuth()


    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
            

        if (passwordRef.current.value.length < 6) {
            setError('Passwords do not match')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be at least 6 characters long',
            })
            return error
        }
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('Passwords do not match')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match',
            })
            return error;
        }



        try {
            setError('')
            register_base(emailRef.current.value, passwordRef.current.value).then(async (user) => {
            await populateUserField(user)}).catch(e => {
                console.log("Error", e)})
        } catch (error) {
            setError("Failed to create an account")
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to create an account',
            })
        }
        //console.log("Current User for Email", currentUser)

        setLoading(false)

    }


async function handleGoogleLogin() {
    setLoading(true)
    try {
        login_google().then(async (user) => {
            console.log("User", user)
        await populateUserField(user)}).catch(e => {
            console.log("Error", e)});
    } catch (error) {
        setError("Failed to create an account")
          Swal.fire({ 
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to create an account',
        })
    }
    console.log("Current user for google", currentUser);


    setLoading(false)
    
}


    return (
        (currentUser) ? <Redirect to="/" /> :
        <div className="min-h-full flex items-center justify-center py-10 pt-12 xl:pt-0 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src={logo2}
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your personal account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or continue with Google
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">

                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                ref={emailRef}
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md  focus:outline-none focus:ring-greenish5 focus:border-greenish5 focus:z-10 sm:text-sm mb-5"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                ref={passwordRef}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md  focus:outline-none focus:ring-greenish5 focus:border-greenish5 focus:z-10 sm:text-sm mb-5"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Confirm password
                            </label>
                            <input
                                ref={passwordConfirmRef}
                                id="cpassword"
                                name="cpassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-greenish5 focus:border-greenish5 focus:z-10 sm:text-sm"
                                placeholder="Confirm password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                    <img src={google1} alt="google" className="h-10" onClick={handleGoogleLogin} />


                        <div className="text-sm">
                            Already have an account?
                            <a href="#" className="font-medium text-greenish6 hover:text-greenish5">
                                <span> </span>Log in
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={loading || currentUser}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-greenish6 hover:bg-greenish7 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-greenish5"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-greenish5 group-hover:text-greenish4" aria-hidden="true" />
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
