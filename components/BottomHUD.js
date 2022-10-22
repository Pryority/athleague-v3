import React from 'react'
import {
  TrashIcon,
  ArrowUturnRightIcon,
  PencilSquareIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/solid'

export default function BottomHUD({checkpoints}) {
  return (
    <div
      id='bottom-HUD'
      className='flex w-full md:w-2/3 lg:w-1/2 justify-around space-x-4 items-center'
    >
      {/* UNDO BUTTON */}
      <div id='undo' className='flex w-1/3 justify-center'>
        <div className='flex w-full justify-center'>
          {checkpoints.length === 0 ? (
            // DISABLED
            <div
              className='flex flex-col w-12 h-12 cursor-not-allowed justify-center items-center bg-slate-200 p-3 rounded-xl border-2 border-slate-300 shadow-md text-2xl font-black
                          opacity-50'
            >
              <ArrowUturnRightIcon className='rotate-180 text-slate-500' />
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
        <div className='flex w-1/3 justify-center'>
          <button
            className='flex space-x-2 w-full cursor-not-allowed text-center items-center justify-center bg-zinc-500 border-2 border-zinc-200 p-2 rounded-xl opacity-50'
            type='submit'
            onClick={() => {
              setShowSave(!showSave)
            }}
          >
            <h1>Save Course</h1>
            <PencilSquareIcon className='w-8 h-8 text-[#1e1e1e]' />
          </button>
        </div>
      ) : (
        <div className='flex w-1/3 justify-center'>
          <button
            className='flex space-x-2 w-full cursor-pointer text-center items-center justify-center bg-green-500 border-2 border-lime-200 p-2 rounded-xl'
            type='submit'
            onClick={() => {
              setShowSave(!showSave)
            }}
          >
            <h1>Save Course</h1>
            <PencilSquareIcon className='w-8 h-8 text-[#b8fa93]' />
          </button>
        </div>
      )}

      <div className='flex w-1/3 justify-center'>
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
  )
}
