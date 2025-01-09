import Footer from '@/app/(landing)/_components/footer';
import CompanyProfileWizard from './_components/recycle-profile-wizard';
import Header from '@/app/(landing)/_components/Header';
import axios from 'axios';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export interface WasteType {
  createdAt: string;
  _id: string;
  name: string;
  updatedAt: string;
  image:string
}
export default async function RegsiterRecycler() {
  const res = await axios.get(
    `https://api-greencycle.onrender.com/api/waste-type`,
    {
    headers: {
      "x-api-key": process.env.BACKEND_API_KEY,
    }, 
  },
  
    
  ) 
const wasteTypes: WasteType[] = res.data?.data ?? [];
  return (
    <Suspense fallback={  <div className="w-full h-screen flex items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10" />
    </div>} > 
    <Header/>
      <CompanyProfileWizard wasteTypes={wasteTypes} />
      <span className="block my-8"></span>
      <Footer/>
    </Suspense>

  );
   
}