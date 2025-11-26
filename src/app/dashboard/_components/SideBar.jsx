
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import DashBoard from '../page'
import { Layout, Shield } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import UploadPDF from './UploadPDF'


function SideBar() {
    return (

        <div className='shadow-md h-screen p-3'>
            <Image src={'/logo.svg'} alt='logo' width={60} height={60} />


            <div className="">
                <div className="mt-10 ">
                    <UploadPDF>
                    <Button className='w-full'>+ Upload Files</Button>

                    </UploadPDF>
                    <div className="flex gap-2 items-center p-5 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
                        <Layout />
                        <h2>Worksapce</h2>
                    </div>
                </div>

                <div className="flex gap-2 items-center p-5 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
                    <Shield />
                    <h2>Upgrade</h2>
                </div>
            </div>

            <div className="absolute bottom-25 w-[80%]">
                <Progress value={33}/>
               <div className="flex flex-col text-center">
                 <p className='text-sm mt-2'>2 out of 5 PDF Uploaded</p>
                 <p className='text-xs text-gray-600 mt-2'>Upgrade to Upload more PDF</p>
               </div>
            </div>
        </div>
    )
}

export default SideBar
