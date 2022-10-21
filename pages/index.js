import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen justify-center items-center">
        <div className='flex flex-col items-center space-y-16'>
          <div className='flex items-center space-x-8'>
            <h1 className='text-4xl tracking-[-2.34px] italic font-black uppercase'>Athleague</h1>
            <h2 className='text-xl tracking-wide font-medium uppercase'>Play through IRL activity circuits stored on Ethereum with this exercise-based dApp.</h2>
          </div>
          <Link href='/home'>
            <div className='bg-zinc-200 hover:bg-lime-400 hover:shadow hover:border-zinc-50 hover:text-white transition ease-in-out duration-100 border rounded-full px-4 py-1 font-medium cursor-pointer text-white uppercase tracking-tight'>GO TO APP</div>
          </Link>
        </div>
      </div>
    </>
  )
}
