import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  function login(event) {
    event.preventDefault()
    axios
      .post(
        'http://127.0.0.1:8000/api/login',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'content-type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
        {
          withCredentials: true,
        }
      )
      .then(response => {
        toast.warning('Welcome !', {
          position: 'top-right',
          autoClose: 2000,
        })
        localStorage.setItem('user', JSON.stringify(response.data.data))
        localStorage.setItem('access_token', response.data.token)
        router.push('/profile')
      })
      .catch(error => {
        toast.error(`${error.message}`, {
          position: 'top-right',
          autoClose: 1000,
          pauseOnHover: false,
        })
      })
  }
  return (
    <div className="animate__animated animate__fadeIn bg-gray-200 min-h-screen flex flex-col">
      <Head>
        <title>login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={login}
          className="bg-white px-6 py-8 rounded-xl shadow-md text-black w-full"
        >
          <h1 className="mb-8 text-3xl text-center font-bold">Log in</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-center font-semibold py-2 rounded bg-green-500 text-white focus:outline-none my-2"
          >
            Log In
          </button>
        </form>

        <div className="text-grey-dark mt-6">
          Dont have an account?
          <Link href="/register">
            <a
              className="p-2 font-bold font-sans border-b-2 border-double 
    border-transparent hover:border-current cursor-pointer select-none"
            >
              Register
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
