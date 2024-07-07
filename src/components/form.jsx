import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
const FormComponent = () => {
  let [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const values = Object.fromEntries(formData.entries())
    console.log(values)
    const response = await fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cors: 'no-cors',
      },
      body: JSON.stringify(values),
    })
    const data = await response.json()
    setData(data)
    if (response.status === 200) {
      openModal()
    }
  }
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <>
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/80" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="grid gap-4 mb-5 text-2xl font-medium leading-6 text-gray-900"
                    >
                      <p className="">Hello</p>
                      <p className="text-6xl font-light"> {data.name}</p>
                      <p className="text-xl font-medium ">
                        The sport for you is:
                      </p>
                      <div className="flex">
                        <p className="text-lg font-medium bg-[#ffd518] p-3 rounded-xl">
                          {data.sport}
                        </p>
                      </div>
                    </Dialog.Title>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
      <div className="flex flex-col" id="form">
        <h1 className="mb-8 text-4xl text-center">Complete all fields</h1>
        <form
          action=""
          className="px-10 grid grid-cols-3 gap-10 w-[90%] max-w-[1600px] m-auto py-20"
          onSubmit={handleSubmit}
        >
          <div className="grid col-span-1 gap-3">
            <h1>Full name</h1>
            <input
              name="full_name"
              type="text"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Age</h1>
            <input
              name="age"
              type="number"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Gender F or M</h1>
            <select
              name="gender"
              className="px-5 py-3 border border-black outline-none"
            >
              <option value="0">Female</option>
              <option value="1">Male</option>
            </select>
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Weight (KG)</h1>
            <input
              name="weight"
              type="number"
              step="0.01"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Height (Cm)</h1>
            <input
              name="height"
              type="number"
              step="0.01"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Arm muscle (CM^2)</h1>
            <input
              name="arm_muscle"
              type="number"
              step="0.01"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Arm adiposity (CM^2)</h1>
            <input
              name="arm_adip"
              type="number"
              step="0.01"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Thigh muscle (CM^2)</h1>
            <input
              name="thigh_muscle"
              type="number"
              step="0.01"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Thigh adiposity (CM^2)</h1>
            <input
              name="thigh_adip"
              type="number"
              step="0.01"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Leg muscle (CM^2)</h1>
            <input
              name="leg_muscle"
              type="number"
              step="0.01"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Leg adiposity (CM^2)</h1>
            <input
              name="leg_adip"
              type="number"
              step="0.01"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <h1>Arm fat (%)</h1>
            <input
              name="arm_fat"
              type="number"
              step="0.01"
              className="px-5 py-3 border border-black outline-none"
            />
          </div>
          <button type="submit" className="col-span-3 bg-[#Fddb3a] p-5">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default FormComponent
