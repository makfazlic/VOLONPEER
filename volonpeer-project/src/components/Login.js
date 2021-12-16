import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid'
import Swal from 'sweetalert2';
import logo2 from '../images/logo2.png'
import { login_base, useAuth } from '../firebase'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
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

    try {
        setError('')
        login_base(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
        setError("Failed to create an account")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to create an account',
        })
    }

    setLoading(false)

}

  return (

    currentUser ? <Redirect to="/dashboard" /> :
    <div className="min-h-full flex items-center justify-center py-10 pt-12 xl:pt-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
        Now: { currentUser && currentUser.email }

          <img
            className="mx-auto h-12 w-auto"
            src={logo2}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
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
                className="appearance-none  relative block w-full mb-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-greenish5 focus:border-greenish5 focus:z-10 sm:text-sm"
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
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-greenish5 focus:border-greenish5 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-greenish6 focus:ring-greenish5 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-greenish6 hover:text-greenish5">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
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
