import Form from './components/form'
function App() {
  return (
    <>
      <div className="py-10 px-10 bg-[#212121] flex justify-between">
        <div className="flex gap-3 font-medium">
          <span className="flex">
            <h1 className="text-4xl text-[#Fddb3a]">A</h1>
            <h1 className="text-4xl text-[#f6f4e6]">nalysis</h1>
          </span>
          <span className="flex">
            <h1 className="text-4xl text-[#Fddb3a]">M</h1>
            <h1 className="text-4xl text-[#f6f4e6]">orphological</h1>
          </span>
        </div>
        <div className="flex gap-3">
        </div>
      </div>
      <div className="grid justify-center px-10 text-center py-36 mb-28">
        <h1 className="mb-8 text-8xl">Predict sport talent</h1>
        <h1 className="mb-5 text-3xl">Morphologic analysis</h1>
        <div className="flex justify-center">
          <a href="#form" className="bg-[#Fddb3a] p-5">
            {' '}
            Lets go !{' '}
          </a>
        </div>
      </div>

      <Form />
    </>
  )
}

export default App
