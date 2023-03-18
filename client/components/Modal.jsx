import { useState } from 'react'
import PropTypes from 'prop-types'

function Modal({ title, isOpen, onClose, onSubmit }) {
  const [items, setItems] = useState({ iteName: '', description: '', price: '' })

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(items)
    setItems({ iteName: '', description: '', price: '' })
    onClose()
  }

  const handleCancel = () => {
    setItems({ iteName: '', description: '', price: '' })
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

            <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6">
              <form onSubmit={handleSubmit}>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                  <div className="mt-2">
                    <input
                      id="name"
                      className="border rounded-md w-full py-2 px-3"
                      type="text"
                      placeholder="Name"
                      value={items.iteName}
                      onChange={(event) => setItems({ ...items, iteName: event.target.value })}
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      className="border rounded-md w-full py-2 px-3"
                      type="text"
                      placeholder="Description"
                      value={items.description}
                      onChange={(event) => setItems({ ...items, description: event.target.value })}
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      className="border rounded-md w-full py-2 px-3"
                      type="text"
                      placeholder="Price"
                      value={items.price}
                      onChange={(event) => setItems({ ...items, price: event.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Modal
