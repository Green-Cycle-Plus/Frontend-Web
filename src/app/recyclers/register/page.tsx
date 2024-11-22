import Footer from '@/app/(landing)/_components/footer';
import CompanyProfileWizard from './_components/recycle-profile-wizard';
import Header from '@/app/(landing)/_components/Header';
import axios from 'axios';

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
    <div className=""> 
    <Header/>
      <CompanyProfileWizard wasteTypes={wasteTypes} />
      <span className="block my-8"></span>
      <Footer/>
    </div>
  );
}