import React from 'react'

export default function Coordinates({viewState}) {
  return (
    <div className="flex flex-col space-y-2 w-3/5 md:w-2/5 lg:w-1/3 items-center justify-center bg-primary rounded-xl border-2 border-slate-800/30 shadow animate-fade-in-down">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col w-full p-2 rounded-md items-center justify-center">
          <div className="flex space-x-8">
            <p className="text-center">
              Latitude: <b>{viewState.latitude.toFixed(4)}</b>
            </p>
            <p className="text-center">
              Longitude: <b>{viewState.longitude.toFixed(4)}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
