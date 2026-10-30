import { useState } from 'react'
import Login from '../features/auth/components/Login'
import Register from '../features/auth/components/Register'

export default function Home() {

    const [active,setActive] = useState(true)

    function toggleActive()
    {
       setActive(!active)
    }

  return (
   
    <div className="container">
        <div className='flex flex-wrap max-w-6xl  mx-auto h-screen justify-between items-center'>
            <div className="md:w-[50%] w-full">
              <h1 className="hidden text-5xl font-extrabold tracking-tight text-[#00298d] sm:text-6xl lg:block">Route Posts</h1>
              <p className="hidden mt-4 text-2xl font-medium leading-snug text-slate-800 lg:block">Connect with friends and the world around you on Route Posts.</p>
              <div className='border my-10 shadow bg-white rounded-2xl p-4 border-brdr-color'>
               <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d]">About Route Academy</p>
               <p className="mt-1 text-lg font-bold text-slate-900">Egypt's Leading IT Training Center Since 2012</p>
               <p className="mt-2 text-sm leading-relaxed text-slate-700">Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in delivering high-quality training courses in programming, web development, and application development. We've identified the unique challenges people may face when learning new technology and made efforts to provide strategies to overcome them.</p>
               
               <div className='grid grid-cols-3 gap-3 my-4'>
                 {[...Array(5)].map(()=>{
                return(
                    <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2"><p className="text-base font-extrabold text-[#00298d]">2012</p><p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Founded</p></div>
                )
               })}
               </div>
              </div>
            </div>
            <div className="md:w-[40%] w-full">
                <div className='border my-10 shadow bg-white rounded-2xl p-4 border-brdr-color'>
                    <div className='flex text-center items-center text-social-blue font-bold bg-[#f0f2f5] p-1 rounded'>
                        <div className="w-1/2 cursor-pointer">
                         <span onClick={toggleActive} style={active?{backgroundColor:'white'}:{}}  className='block p-1 rounded-md '>Login</span>
                        </div>
                        <div className="w-1/2 cursor-pointer">
                         <span className='block p-1 rounded-md ' onClick={toggleActive}  style={!active?{background:'white'}:{}} >Register</span>
                        </div>
                    </div>
                </div>


                {/* toggle register/login */}

                {
                    active?<Login></Login>:<Register></Register>
                }

            </div>
        </div>
    </div>
  )
}
