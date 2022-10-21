import React, { useEffect, useRef, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import { TrashIcon, ArrowUturnDownIcon, PencilSquareIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'
import { NavigationControl } from 'react-map-gl'
import { GeolocateControl } from 'react-map-gl'
import { ScaleControl } from 'react-map-gl'
import { Link } from 'next/link'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export default function Home() {
  const [viewState, setViewState] = useState({
    latitude: 49.29837092831224,
    longitude: -122.93407397752691,
    zoom: 10.647035651394196,
  })
  const [course, setCourse] = useState({
    username: 'matt',
    title: 'Your Course',
    type: '',
    desc: '',
    checkpoints: '',
  })
  const [checkpoints, setCheckpoints] = useState([])
  const [isSelectedCP, setIsSelectedCP] = useState(null)
  const [showSave, setShowSave] = useState(false)
  const [showQuit, setShowQuit] = useState(false)
  const [canAddCP, setCanAddCP] = useState(true)
  const [showClear, setShowClear] = useState(false)

  const mapRef = useRef()
  const handleMarkerClick = (cp, lat, long) => {
    console.log(cp)
    setIsSelectedCP(true)
    setCanAddCP(false)
    setViewState({
      latitude: lat,
      longitude: long,
    })
    console.log(`Current Course ID: ${isSelectedCP}`)
    console.log(`Course Coordinates: \n Lat-${lat} Long-${long}`)
  }

  const handleAddMarker = (loc) => {
    const checkpoint = {
      lat: loc.lat,
      long: loc.long,
    }
    checkpoints.push(checkpoint)
    // console.log('Adding Marker -- UPDATED CHECKPOINTS ARRAY:', checkpoints)
    setCourse((prev) => ({ ...prev, checkpoints: checkpoints }))
    setIsSelectedCP(!isSelectedCP)
  }

  const handleChange = (e) => {
    setCourse((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      checkpoints: checkpoints,
    }))
  }

  const handleSaveFormSubmit = () => {
    console.log('Saved Course: ', course)
  }

  useEffect(() => {}, [])

  return (
    <div className='flex flex-col h-screen  w-full items-center justify-center relative'>
      <Map
        {...viewState}
        ref={mapRef}
        onMove={(e) => setViewState(e.viewState)}
        mapboxAccessToken={TOKEN}
        // mapStyle='mapbox://styles/matthewpryor/ckzepsxne002b14ov4oo7gb8r'
        mapStyle='mapbox://styles/mapbox/streets-v9'
        className='relative w-full flex'
        minZoom={2}
        onClick={(e) => {
          if (canAddCP) {
            handleAddMarker({ lat: e.lngLat.lat, long: e.lngLat.lng })
            setViewState({ ...viewState })
          }
          setCanAddCP(true)
        }}
      >
        {/* RENDER CHECKPOINTS */}
        {checkpoints.map((marker, index) => {
          return (
            <>
              <Marker
                key={index}
                latitude={marker.lat}
                longitude={marker.long}
                anchor='top'
                offset={[0, -10]}
                scale={2}
                onClick={() => setCanAddCP(false)}
              >
                {index === 0 ? (
                  // START
                  <div
                    className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/80 hover:from-lime-500/70 hover:to-lime-500/70 to-lime-500/80 border-2 border-lime-200/80 hover:border-lime-200/70 justify-center items-center'
                    onClick={() => {
                      handleMarkerClick(marker, marker.lat, marker.long)
                      setCanAddCP(false)
                    }}
                  >
                    <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                      {index + 1}
                    </div>
                  </div>
                ) : index === checkpoints.length - 1 ? (
                  // FINISH
                  <div
                    className='h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500/80 hover:from-yellow-500/70 hover:to-yellow-500/70 to-yellow-500/80 border-2 border-yellow-200/80 hover:border-yellow-200/70 justify-center items-center'
                    onClick={() => {
                      handleMarkerClick(marker, marker.lat, marker.long)
                      setCanAddCP(false)
                    }}
                  >
                    <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                      {index + 1}
                    </div>
                  </div>
                ) : index === isSelectedCP ? (
                  <div
                    className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/80 hover:from-orange-500/70 hover:to-red-500/70 to-lime-500/80 border-2 border-blue-200/80 hover:border-sky-200/70 justify-center items-center animate-pulse'
                    onClick={() => {
                      handleMarkerClick(marker, marker.lat, marker.long)
                      setCanAddCP(false)
                    }}
                  >
                    <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                      {index + 1}
                    </div>
                  </div>
                ) : (
                  <div
                    className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/80 hover:from-blue-500/70 hover:to-sky-500/70 to-blue-500/80 border-2 border-blue-200/80 hover:border-sky-200/70 justify-center items-center'
                    onClick={() => {
                      handleMarkerClick(marker, marker.lat, marker.long)
                      setCanAddCP(false)
                    }}
                  >
                    <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                      {index + 1}
                    </div>
                  </div>
                )}
              </Marker>

              {isSelectedCP.long === marker.long && (
                <Popup
                  latitude={marker.lat}
                  longitude={marker.long}
                  anchor='bottom'
                  closeButton={true}
                  closeOnClick={false}
                  offset={[-10, -40]}
                >
                  <div className='flex flex-col space-y-2 w-full items-center'>
                    <p className='flex w-full text-sm text-center'>{`Update Checkpoint: ${
                      index + 1
                    } to be`}</p>
                    <div className='flex justify-around w-full'>
                      <div className='bg-green-400 px-2 rounded-sm font-medium'>
                        Start
                      </div>
                      <div className='bg-yellow-400 px-2 rounded-sm sfont-medium'>
                        Finish
                      </div>
                    </div>
                  </div>
                </Popup>
              )}
            </>
          )
        })}

        <div
          id='upper-HUD'
          className='flex w-full px-2 space-x-2 justify-start items-center absolute top-2 z-2'
        >
          <div
            className='flex w-10 h-10 bg-slate-700 rounded-full items-center justify-center opacity-90 border-2 border-slate-100/30'
            onClick={() => setShowQuit(true)}
          >
            <ArrowLeftIcon className='text-white'/>
          </div>

          <div className='flex flex-col space-y-2 w-3/5 md:w-2/5 lg:w-1/3 items-center justify-center bg-slate-200/90 rounded-xl border-2 border-slate-800/30 shadow animate-fade-in-down'>
            {/* <WalletBalance /> */}
            <div className='flex flex-col w-full items-center justify-center'>
              <div className='flex flex-col w-full p-2 rounded-md items-center justify-center'>
                <div className='flex space-x-8'>
                  <p className='text-center'>
                    Latitude: <b>{viewState.latitude.toFixed(4)}</b>
                  </p>
                  <p className='text-center'>
                    Longitude: <b>{viewState.longitude.toFixed(4)}</b>
                  </p>
                </div>
                <div className='border-b border-slate-300 flex w-5/6' />
              </div>
            </div>
          </div>
        </div>
        <div
          id='HUD'
          className='flex flex-col space-y-2 w-full justify-around items-center absolute bottom-20 animate-slow-fade-in-up'
        >
          <div
            id='checkpoints-array'
            className='flex flex-wrap justify-center gap-2 w-5/6 p-2'
          >
            {checkpoints.map((checkpoint, index) => (
              // <div className='rounded-full border shadow w-8 h-8 bg-slate-500' />
              <>
                {index === 0 ? (
                  // START
                  <div
                    className='h-10 w-10 rounded-full bg-gradient-to-br from-lime-500/80 hover:from-lime-500/70 hover:to-lime-500/70 to-lime-500/80 border-2 border-lime-200/80 hover:border-lime-200/70 justify-center items-center'
                    onClick={() => {
                      setViewState({
                        latitude: checkpoint.lat,
                        longitude: checkpoint.long,
                      })
                      setIsSelectedCP(!isSelectedCP)
                    }}
                  >
                    <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                      {index + 1}
                    </div>
                  </div>
                ) : index === checkpoints.length - 1 ? (
                  // FINISH
                  <div
                    className='h-10 w-10 rounded-full bg-gradient-to-br from-yellow-500/80 hover:from-yellow-500/70 hover:to-yellow-500/70 to-yellow-500/80 border-2 border-yellow-200/80 hover:border-yellow-200/70 justify-center items-center'
                    onClick={() => {
                      setViewState({
                        latitude: checkpoint.lat,
                        longitude: checkpoint.long,
                      })
                      setIsSelectedCP(!isSelectedCP)
                    }}
                  >
                    <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                      {index + 1}
                    </div>
                  </div>
                ) : (
                  <div
                    className='h-10 w-10 rounded-full bg-gradient-to-br from-sky-500/80 hover:from-blue-500/70 hover:to-sky-500/70 to-blue-500/80 border-2 border-blue-200/80 hover:border-sky-200/70 justify-center items-center'
                    onClick={() => {
                      setViewState({
                        latitude: checkpoint.lat,
                        longitude: checkpoint.long,
                      })
                      setIsSelectedCP(!isSelectedCP)
                    }}
                  >
                    <div className='flex w-full justify-center h-full items-center text-md font-bold'>
                      {index + 1}
                    </div>
                  </div>
                )}
              </>
            ))}
            {/* </div> */}
          </div>
          <div
            id='bottom-HUD'
            className='flex w-full md:w-2/3 lg:w-1/2 justify-around space-x-4 items-center'
          >
            <div id='undo-redo' className='flex w-1/3 justify-center'>
              <div className='flex w-full justify-center'>
                {checkpoints.length === 0 ? (
                  <div
                    className='flex flex-col w-12 h-12 justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow-md text-2xl font-black
                          opacity-50'
                  >
                    <ArrowUturnDownIcon />
                  </div>
                ) : (
                  <div
                    className='flex flex-col w-12 h-12 justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow-md text-2xl font-black'
                    onClick={() => {
                      checkpoints.pop()
                      console.log(
                        'Deleting previous Checkpoint -- UPDATED CHECKPOINTS ARRAY',
                        checkpoints
                      )
                      setViewState({ ...viewState })
                    }}
                  >
                    <ArrowUturnDownIcon />
                  </div>
                )}
                {/* <div className='flex flex-col w-full h-12 justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow-md text-2xl font-black opacity-50'>
                              <RedoIcon />
                          </div> */}
              </div>
            </div>
            {checkpoints.length <= 1 ? (
              <div className='flex w-1/3 justify-center cursor-pointer'>
                <button
                  className='flex space-x-2 w-full text-center items-center justify-center bg-green-500 border-2 border-lime-200 p-3 rounded-xl opacity-50'
                  type='submit'
                  onClick={() => {
                    setShowSave(!showSave)
                  }}
                >
                  <h1 className='flex'>Save Course</h1>
                  <PencilSquareIcon className='w-8 h-8 text-[#b8fa93]'/>
                </button>
              </div>
            ) : (
              <div className='flex w-1/3 justify-center cursor-pointer'>
                <button
                  className='flex space-x-2 w-full text-center items-center justify-center bg-green-500 border-2 border-lime-200 p-3 rounded-xl'
                  type='submit'
                  onClick={() => {
                    setShowSave(!showSave)
                  }}
                >
                  <h1 className='flex curs'>Save Course</h1>
                  <PencilSquareIcon className='w-8 h-8 text-[#b8fa93]'/>
                </button>
              </div>
            )}

            <div className='flex w-1/3 justify-center'>
              {checkpoints.length === 0 ? (
                <div
                  className='flex flex-col w-12 h-12 justify-center items-center bg-red-200 p-3 rounded-xl border-2 border-red-300 shadow-md text-2xl font-black opacity-50'
                  onClick={() => setShowClear(true)}
                >
                  <TrashIcon className='text-[#b02727]' />
                </div>
              ) : (
                <div
                  className='flex flex-col w-12 h-12 justify-center items-center bg-red-200 p-3 rounded-xl border-2 border-red-300 shadow-md text-2xl font-black'
                  onClick={() => setShowClear(true)}
                >
                  <TrashIcon className='text-[#b02727]' />
                </div>
              )}
            </div>
          </div>
        </div>

        {showSave && (
          <div
            id='save'
            className='flex w-full justify-center items-center relative h-full z-100 bg-black/80'
          >
            <div className='absolute w-1/2 p-8'>
              <div className='p-4 rounded-xl bg-zinc-50 flex flex-col justify-center items-center w-full space-y-4 border shadow'>
                <div className='flex justify-between w-full'>
                  <p className='tracking-tighter text-xl md:text-2xl lg:text-4xl font-extrabold uppercase bg-gradient-to-r from-lime-600 via-lime-500 to-lime-600 bg-clip-text text-transparent'>
                    {`SAVE ${course.title}`}
                  </p>
                  <div
                    className='w-6 h-6 rounded-full ml-2 md:ml-0 bg-zinc-300 relative flex justify-center items-center cursor-pointer'
                    // onClick={toggle}
                  >
                    <div className='w-4 h-4 rounded-full bg-white relative flex justify-center items-center object-center transition ease-in-out duration-200 hover:bg-black'>
                      {/* <InformationCircleIcon className='h-6 w-6 absolute object-center text-stone-700 transition ease-in-out duration-200 hover:text-stone-50' /> */}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col space-y-2 w-full'>
                  <p className='text-xs'>Enter the name of your new course</p>
                  <input
                    className={`mb-5 p-2 text-lg w-full rounded border border-pink-300/50 focus:ring-[2px] focus:outline-none focus:ring-pink-500 ${
                      showSave
                        ? 'focus:ring-lime-500 border-lime-300/50'
                        : 'focus:pink-500'
                    }`}
                    placeholder='Course Name'
                    //   value={SecretString}
                    //   onChange={(e) => setCourse(...prev=> ({prev: e.target.value}))}
                    onChange={handleChange}
                  />
                </div>
                <div className='p-4 rounded bg-zinc-100 border grid grid-cols-2 w-full'>
                  <div className='flex items-center space-x-2'>
                    <p className='text-base font-medium tracking-tighter uppercase text-zinc-700'>
                      Checkpoints:
                    </p>
                    <p className='font-semibold text-lg'>{checkpoints.length}</p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <p>Type:</p>
                    <select className='rounded-md p-1 font-semibold'>
                      <option value='volvo'>Objective</option>
                      <option value='saab'>Adventure</option>
                      <option value='mercedes'>Lookout</option>
                      <option value='audi'>Freestyle</option>
                    </select>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full space-y-1'>
                  <button
                    className={`w-full ${
                      showSave
                        ? 'bg-green-500 border rounded-sm px-2 py-1 text-sm md:text-md lg:text-lg hover:bg-green-600 transition ease-in-out duration-200 text-white cursor-pointer'
                        : 'bg-red-500 border rounded-sm px-2 py-1 text-sm md:text-md lg:text-lg hover:bg-red-600/90 transition ease-in-out duration-200 text-white cursor-not-allowed'
                    }`}
                    // disabled={!SecretString}
                    onClick={async () => {
                      console.log('course saved')
                      setShowSave(!showSave)
                      console.log(course.checkpoints.length)
                      console.log(course.title)
                      handleSaveFormSubmit()
                    }}
                  >
                    Save Course
                  </button>
                  <button
                    className='w-full bg-[#fcffff] border border-stone-300 rounded-sm px-2 py-1 text-sm md:text-md lg:text-lg hover:bg-zinc-300 hover:border-[#fcffff] hover:text-gray-700 text-gray-600 cursor-pointer'
                    onClick={async () => {
                      //   await checkidentity()
                    }}
                  >
                    Load Existing Identity
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showQuit && (
          <div
            id='save'
            className='flex w-full justify-center items-center relative h-full z-100 bg-black/80'
            onClick={() => setShowQuit(false)}
          >
            <div className='flex justify-center items-center h-full'>
              <form
                id='save-course-form'
                className='flex flex-col w-5/6 pb-4 space-y-4 justify-center items-center absolute bg-slate-200  rounded-xl border-2 p-2 shadow lg:scale-75'
              >
                <div className='flex flex-col w-full justify-center items-center space-y-1 p-2'>
                  <div className='flex w-full justify-center items-center mb-4'>
                    <p className='text-2xl text-center font-medium lg:text-4xl'>
                      Sure you want to quit?
                    </p>
                  </div>
                  <p className='flex w-full justify-center items-center text-md text-center font-normal lg:text-xl'>
                    Your course creation progress will be lost.
                  </p>
                </div>
                <div className='flex w-2/3 space-x-8'>
                  <div
                    className='flex w-1/2 bg-slate-400 rounded-md text-lg text-slate-100 p-1 justify-center items-center'
                    onClick={() => {
                      console.log('cancel quit modal')
                      setShowQuit(!showQuit)
                    }}
                  >
                    Cancel
                  </div>
                  <Link
                    to='/'
                    className='flex w-1/2 bg-red-500 rounded-md text-lg text-slate-100 p-1 justify-center items-center'
                  >
                    Quit
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}

        {showClear && (
          <div
            id='save'
            className='flex w-full justify-center items-center relative h-full z-100 bg-black/80'
          >
            <div className='flex justify-center items-center h-full'>
              <form
                id='save-course-form'
                className='flex flex-col w-5/6 pb-4 space-y-4 justify-center items-center absolute bg-slate-200  rounded-xl border-2 p-2 shadow lg:scale-75'
              >
                <div className='flex flex-col w-full justify-center items-center space-y-1 p-2'>
                  <div className='flex w-full justify-center items-center'>
                    <p className='text-2xl text-center font-medium lg:text-4xl'>
                      Clear ALL Checkpoints?
                    </p>
                  </div>
                </div>
                <div className='flex w-2/3 space-x-8'>
                  <div
                    className='flex w-1/2 bg-slate-400 rounded-md text-lg text-slate-100 p-1 justify-center items-center'
                    onClick={() => {
                      console.log('cancel quit modal')
                      setShowClear(!showClear)
                    }}
                  >
                    Cancel
                  </div>
                  <div
                    className='flex w-1/2 bg-red-500 rounded-md text-lg text-slate-100 p-1 justify-center items-center'
                    onClick={() => {
                      console.log('cleared checkpoints')
                      setShowClear(!showClear)
                      setCheckpoints([])
                    }}
                  >
                    Clear
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        <NavigationControl />
        <GeolocateControl />
        <ScaleControl />
      </Map>
    </div>
  )
}
