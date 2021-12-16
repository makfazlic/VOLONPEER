/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import logo1 from '../images/logo1.png'
import { logout } from '../firebase'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header(props) {
  const navigation = [
    { name: 'Home', href: '/', current: props.location == "home" },
    { name: 'Posts', href: '/posts', current: props.location == "posts" },
    { name: 'Leaderboard', href: '/leaderboard', current: props.location == "leaderboard" },
    { name: 'Privacy', href: '/privacy-policy', current: props.location == "privacy-policy" },
  ]

  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-10 w-auto"
                    src={logo1}
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-10 w-auto"
                    src={logo1}
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-greenish5 text-white hover:bg-greenish7' : 'text-greenish5 hover:text-greenish7',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    {props.user ? 
                      <a
                        href="/dashboard"
                        className={classNames(
                          props.location=="dashboard" ? 'bg-greenish5 text-white hover:bg-greenish7' : 'text-greenish5 hover:text-greenish7',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={props.location=="dashboard" ? 'page' : undefined}
                      >
                        Dashboard
                      </a> : <></>}
                  </div>
                </div>
              </div>
              {props.user ? (<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button className="block px-4 py-2 text-sm  bg-blueish5 hover:bg-blueish6 font-bold rounded mr-4 text-white xl:block hidden">+ Post</button>
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={logout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>)
                : <>
                  <a className="block px-4 py-2 text-sm  bg-white hover:bg-gray-100 font-bold rounded mr-2 text-blueish5 border-blueish6 border-2 xl:block hidden" href="/login" aria-current={props.location == "login" ? 'page' : undefined}>Login</a>
                  <a className="block px-4 py-2 text-sm  bg-blueish5 hover:bg-blueish6 font-bold rounded text-white xl:block hidden" href="/login" aria-current={props.location == "login" ? 'page' : undefined}>Register</a>
                </>
              }

            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(

                    item.current ? 'bg-greenish5 text-white hover:bg-greenish7' : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {props.user ? (
                <>
              <a href="/dashboard" aria-current={props.location == "dashboard" ? 'page' : undefined}
                                className={classNames(

                                  props.location=="dashboard" ? 'bg-greenish5 text-white hover:bg-greenish7' : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                                  'block px-3 py-2 rounded-md text-base font-medium'
                                )}
              >Dashboard</a>
              <a href="/newpost" aria-current={props.location == "newpost" ? 'page' : undefined}
                                className={classNames(

                                  props.location=="newpost" ? 'bg-greenish5 text-white hover:bg-greenish7' : 'text-white hover:bg-gray-700 hover:text-white',
                                  'block px-3 py-2 rounded-md text-base font-medium bg-blueish5 hover:bg-blueish6'
                                )}
              >+ Post</a>

              </>
              ) :
                <>
                  <a  href="/login" aria-current={props.location == "login" ? 'page' : undefined}
                                                  className={classNames(

                                                    props.location=="login" ? 'bg-greenish5 text-white hover:bg-greenish7' : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                                                    'block px-3 py-2 rounded-md text-base font-medium'
                                                  )}
                  >Login</a>
                  <a href="/register" aria-current={props.location == "register" ? 'page' : undefined}
                                                  className={classNames(

                                                    props.location=="register" ? 'bg-greenish5 text-white hover:bg-greenish7' : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                                                    'block px-3 py-2 rounded-md text-base font-medium'
                                                  )}
                  >Register</a>
                </>
              }


            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
