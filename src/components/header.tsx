"use client"
import { PiStarFourFill } from "react-icons/pi"
import { useCountdown } from "../hooks/timer";

function Header() {
  
  const { minutes, seconds, timeLeft } = useCountdown(1);

  const textColor = timeLeft < 30 && timeLeft > 0 ? "text-red-500 animate-pulse" : timeLeft == 0 ? "text-[#fff]" : "text-[#FFBB00]";
  return (
    <div className="bg-[#1D5B43] py-2">
        <p className="text-[14px] min-[375px]:text-[18px] sm:text-[24px] font-[600] leading-[130%] text-[#fff] text-center mb-[4px]">Успейте открыть пробную неделю</p>
        <div className="flex justify-center items-center gap-[8px]">
           <PiStarFourFill className={`text-[14px] ${textColor}`}/> 
           <p className={`text-[28px] min-[375px]:text-[32px] sm:text-[40px] font-[700] ${textColor}`}><span>{minutes.toString().padStart(2, "0")}</span> : <span>{seconds.toString().padStart(2, "0")}</span></p>
           <PiStarFourFill className={`text-[14px] ${textColor}`}/> 
        </div>
    </div>
  )
}

export default Header