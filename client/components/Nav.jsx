import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

export default function Nav() {
  const [token, setToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Perform localStorage action
    setToken(localStorage.getItem('access_token'))
  }, [])

  function logout(event) {
    event.preventDefault()
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true }).then(() => {
      axios
        .get(
          'http://127.0.0.1:8000/api/logout',
          {
            headers: {
              'content-type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              Authorization: 'Bearer ' + token,
            },
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user')
          router.push('/login')
        })
        .catch(error => {
          toast.error(`${error.response.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
            pauseOnHover: false,
          })
        })
    })
  }

  return (
    <header className="flex justify-evenly text-white p-2.5 font-semibold bg-blue-400">
      <div className="flex items-center space-x-5">
        <div>
          <Link href="/">
            <a
              className="border-b-2 border-double
  border-transparent hover:border-current select-none"
            >
              Home
            </a>
          </Link>
        </div>

        {token ? (
          <div className="flex items-center space-x-5 justify-around">
            <div>
              <Link href="/products">
                <a
                  className="border-b-2 border-double
     border-transparent hover:border-current select-none"
                >
                  Products
                </a>
              </Link>
            </div>
            <div>
              <Link href="/profile">
                <a
                  className="border-b-2 border-double
     border-transparent hover:border-current select-none"
                >
                  Profile
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {token ? (
          <div className="flex items-center">
            <button onClick={logout}>
              <a className="bg-red-700 hover:bg-red-900 transition ease-in text-white font-bold px-4 py-1 rounded-full">
                Logout
              </a>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-5">
            <Link href="/login">
              <a className="hover:bg-indigo-600 p-1 rounded-md transition ease-in">Login</a>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
