"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCountdown } from '../hooks/timer';

type dataType = {
    id: number,
    period: string, 
    price: number,
    full_price: number,
    text: string,
    is_best: boolean
}


function MainPage() {
    const [data, setData] = useState<dataType[]>([])
    const [selectedItem, setSelectedItem] = useState(3)
    const [requieredBox, setRequieredBox] = useState(false)
    const [requieredBoxForm, setRequieredBoxForm] = useState(false)
    const { timeLeft } = useCountdown(1);
    
    console.log(requieredBox)
    

    const firstDataClass = (s: number) => {
        return "rounded-[20px] cursor-pointer md:col-span-3 md:col-start-[0] md:row-start-[0] md:rounded-[34px] flex flex-row md:flex-col items-center gap-[50px] bg-[#313637] border-[2px]  relative pb-[20px] md:pb-[30px] pl-[30px] md:pl-[122px] pr-[30px] md:pr-[80px] pt-[20px] md:pt-[34px]   md:mb-[14px]" + (selectedItem === s ? " border-[#FDB056]" : " border-[#484D4E]")
    }
    const otherClass = (s: number) => {
        return "md:row-start-[2] cursor-pointer rounded-[20px] md:rounded-[40px] flex flex-row md:flex-col items-center gap-[50px] bg-[#313637] border-[2px] border-[#484D4E] relative pb-[20px] md:pb-[23px] px-[30px] md:px-[18px] pt-[20px] md:pt-[70px] w-full" + (selectedItem === s ? " border-[#FDB056]" : " border-[#484D4E]")
    }

    const firstItemClass = "flex  md:flex-col items-center gap-[40px]"
    const secondItemClass = "flex  items-center gap-[40px]"

    const discountPercent = (price: number, full_price: number) => {
        return Math.round(100 - (price * 100) / full_price )
    };

    useEffect(() => {
        axios.get('https://t-core.fit-hub.pro/Test/GetTariffs').then(res => setData(res.data)).catch(err => console.log(err))
    }, [])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); 
        if(!requieredBox) {
            setRequieredBoxForm(true)
        } else {
            window.location.reload();
        }
    }
  return (
    <div className='px-[16px] md:px-[40px] bg-[#232829] pt-[20px] sm:pt-[50px] pb-[30px] md:pb-[150px]'>
        <div className='max-w-[1216px] mx-auto'>
            <h1 className='font-[700] text-[24px] sm:text-[40px] leading-[110%] text-[#fff] mb-[110px]'>Выбери подходящий для себя <span className='text-[#FDB056]'>тариф</span></h1>
            <div className='flex flex-col min-[1200px]:flex-row items-center gap-[87px] '>
                <img src="/freepik-export-20240531103402atHS 12.png" className='z-[10] relative w-[125px] min-[600px]:w-[300px] min-[1200px]:w-full ' alt="main img" />
                <form onSubmit={handleSubmit} className='mb-[66px]'>
                    <div className='flex  flex-col-reverse md:grid   md:grid-cols-3 gap-[8px] md:gap-[14px] mb-[12px] md:mb-[20px]'>
                        {data.map((item, index) => {
                            return (
                                <div onClick={() => setSelectedItem(index)} className={`${item.is_best  ? firstDataClass(index): otherClass(index)}`} key={item.price}>
                                    {timeLeft != 0 && <div className='transition-all duration-300 absolute top-0 py-[5px] px-[8px] right-[68px] md:right-auto md:left-[50px] bg-[#FD5656] rounded-bl-[8px] rounded-br-[8px]'>
                                        <p className='text-[16px] mdtext-[16px]:md:text-[22px] font-[500] leading-[130%]  text-[#fff]'>{discountPercent(item.price, item.full_price)}%</p>
                                    </div>}
                                    {item.is_best && <p className='absolute top-[10px] right-[20px] text-[#FDB056] text-[16px] md:text-[22px] font-[500] leading-[130%]'>хит!</p>}
                                    <div className={item.is_best ? secondItemClass : firstItemClass}>
                                        <div className=''>
                                            <h3 className='text-[#FFFFFF] font-[500] text-[18px] md:text-[26px] leading-[120%] text-center mb-[16px]'>{item.period}</h3>
                                            <h2 className={`text-[34px] md:text-[50px] ${index == selectedItem ? "text-[#FDB056] " : "text-[#fff] "} font-[600] leading-[100%] text-nowrap`}>{timeLeft != 0 ? item.price : item.full_price} ₽</h2>
                                            {timeLeft != 0 && <p className='transition-all duration-300 text-[#919191] text-end text-[16px] md:text-[24px] leading-[120%] font-[400] line-through'>{item.full_price} ₽</p>}
                                        </div>
                                        <p className='text-[#fff] font-[400] leading-[130%] text-[16px]'>{item.text}</p>
                                    </div>
                                </div>)
                        })}
                    </div>
                    <div className='w-full  md:w-[500px] rounded-[20px] flex items-center gap-[5px] md:gap-[16px] px-[20px] py-[14px] md:py-[18px] bg-[#2D3233] mb-[24px] md:mb-[30px]'>
                        <img src="/alert 1.svg" alt="attention" />
                        <p className='text-[#FFFFFF] text-[12px] md:text-[16px] font-[400] leading-[130%]'>Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц</p>
                    </div>
                    <label className='flex cursor-pointer gap-[12px] items-center mb-[16px]'>
                        <input type="checkbox" onChange={() => setRequieredBox(prev => !prev)} className='w-[20px] h-[20px]' checked={requieredBox}/>
                        <p className={`text-[#CDCDCD] text-[12px] md:text-[16px] font-[400] ${!requieredBox && requieredBoxForm ? "text-[red]" : "text-[#9B9B9B]"}`}>Я согласен с  <span className='underline'>офертой рекуррентных платежей</span> и  <span className='underline'>Политикой конфиденциальности</span> </p>
                    </label>
                    <button type='submit' className='flex text-[20px] font-[700] text-[#191E1F] px-[137px] py-[20px] bg-[#FDB056] rounded-[20px] cursor-pointer mb-[14px] btn' id="hat_btn">
                        <span className='z-[20]' id="hat_text">Купить</span>
                    </button>
                    <p className={`font-[400] text-[10px] md:text-[14px] leading-[120%]`}>Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.</p>
                </form>
            </div>
            <div className='border-[1px] border-[#484D4E] p-[12px] md:p-[20px] rounded-[30px] '>
                <div className='border-[1px] border-[#81FE95] bg-[#2D3233] py-[10px] md:py-[16px] px-[18px] md:px-[30px] rounded-[30px] inline-block mb-[30px]'>
                    <p className='text-[#81FE95] text-[18px] md:text-[28px] font-[500]'>гарантия возврата 30 дней</p>
                </div>
                <p className='text-[#DCDCDC] text-[14px] md:text-[24px] font-[400]'>Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.</p>
            </div>
        </div>
    </div>
  )
}

export default MainPage