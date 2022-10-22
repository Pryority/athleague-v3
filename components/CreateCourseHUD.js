import React from 'react'
import { TrashIcon, ArrowUturnRightIcon, PencilSquareIcon } from '@heroicons/react/24/solid'


export default function CreateCourseHUD({checkpoints}) {
  return (

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
          <div key={index}>
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
              // BETWEEN START AND FINISH
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
          </div>
        ))}
      </div>
      
      {/* BOTTOM HUD */}
      <div
        id='bottom-HUD'
        className='grid grid-cols-5 w-full justify-around space-x-4 items-center'
      >
        {/* UNDO BUTTON */}
        <div id='undo' className='flex w-full justify-center'>
          <div className='flex w-full justify-center'>
            {checkpoints.length === 0 ? (
              // DISABLED
              <div
                className='flex flex-col w-12 h-12 cursor-not-allowed justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow-md text-2xl font-black
                      opacity-50'
              >
                <ArrowUturnRightIcon className='rotate-180 text-slate-500'  />
              </div>
            ) : (
              // ENABLED
              <div
                className='flex flex-col w-12 h-12 cursor-pointer justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow-md text-2xl font-black'
                onClick={() => {
                  checkpoints.pop()
                  console.log(
                    'Deleting previous Checkpoint -- UPDATED CHECKPOINTS ARRAY',
                    checkpoints
                  )
                  setViewState({ ...viewState })
                }}
              >
                <ArrowUturnRightIcon className='rotate-180 text-slate-500' />
              </div>
            )}
          </div>
        </div>
        {checkpoints.length <= 1 ? (
          <div className='flex w-1/3 items-center col-span-3 justify-center'>
            <button
              className='flex space-x-2 w-full cursor-not-allowed text-center items-center justify-center bg-zinc-500 border-2 border-zinc-200 p-2 rounded-xl opacity-50'
              type='submit'
              onClick={() => {
                setShowSave(!showSave)
              }}
            >
              <h1 className=''>Save Course</h1>
              <PencilSquareIcon className='w-8 h-8 text-[#1e1e1e]'/>
            </button>
          </div>
        ) : (
          <div className='flex w-1/3 items-center col-span-3 justify-center'>
            <button
              className='flex space-x-2 w-full cursor-pointer text-center items-center justify-center bg-green-500 border-2 border-lime-200 p-2 rounded-xl'
              type='submit'
              onClick={() => {
                setShowSave(!showSave)
              }}
            >
              <h1 className=''>Save Course</h1>
              <PencilSquareIcon className='w-8 h-8 text-[#b8fa93]'/>
            </button>
          </div>
        )}

        <div className='flex w-full justify-center'>
          {checkpoints.length === 0 ? (
            <div
              className='flex flex-col w-12 h-12 cursor-not-allowed justify-center items-center bg-red-200 p-3 rounded-xl border-2 border-red-300 shadow-md text-2xl font-black opacity-50'
              onClick={() => setShowClear(true)}
            >
              <TrashIcon className='text-[#b02727]' />
            </div>
          ) : (
            <div
              className='flex flex-col w-12 h-12 cursor-pointer justify-center items-center bg-red-200 p-3 rounded-xl border-2 border-red-300 shadow-md text-2xl font-black'
              onClick={() => setShowClear(true)}
            >
              <TrashIcon className='text-[#b02727]' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
