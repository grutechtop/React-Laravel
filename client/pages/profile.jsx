import { useState, useEffect } from 'react'
import NavBar from '../components/Nav'
import Head from 'next/head'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

export default function Profile() {
  const [user, setUser] = useState('')

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    axios
      .get(
        'http://127.0.0.1:8000/api/profile',
        {
          headers: {
            'content-type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: 'Bearer ' + access_token,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then(response => {
        setUser(response.data.data)
      })
      .catch(error => {
        toast.error(`${error.message}`, {
          position: 'top-right',
          autoClose: 1000,
          pauseOnHover: false,
        })
      })
  }, [])

  return (
    <div className="animate__animated animate__fadeIn">
      <Head>
        <title>profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <ToastContainer />
      <div className="flex justify-center mt-32">
        {user ? (
          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
            <div className="flex justify-center md:justify-end -mt-16">
              <img
                alt="image"
                className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
              ></img>
            </div>
            <div>
              <h2 className="text-gray-800 text-3xl font-semibold">{user.email}</h2>
              <p className="mt-2 text-gray-600">
                Created at : {user.created_at.split('T')[0]} <br />
                Updated at : {user.updated_at.split('T')[0]}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <p className="text-xl font-medium text-indigo-500">{user.name}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center p-10">
            <svg
              version="1.1"
              id="loader-1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
              viewBox="0 0 40 40"
              enableBackground="new 0 0 40 40"
              xmlSpace="preserve"
            >
              <path
                opacity="0.2"
                fill="#000"
                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
              />
              <path
                fill="#000"
                d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 20 20"
                  to="360 20 20"
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
