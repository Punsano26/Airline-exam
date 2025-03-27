import React from 'react'
import { FaRegPaperPlane } from "react-icons/fa6";
import FlightSearch from '../../components/FlightSearch';
const Home = () => {
    return (
        <>
            <div>
                <button className="btn btn-secondary m-2"><FaRegPaperPlane />ตั๋วเครื่องบิน</button>
            </div>
            <div className='m-4'>
                <h2 className='text-center text-3xl'>Nakhon Pathom Airline</h2>
            </div>
            <div className='flex justify-center'>
                <FlightSearch />
            </div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-airplanes-near-the-runway-image_15692933.jpg)",
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there Nakhon Pathom Airline</h1>
                        <p className="mb-5">
                            ยินต้อนรับสู่ สนามบินของเรา นครปฐม
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Home