import Footer from '@/app/(landing)/_components/footer';
import CompanyProfileWizard from './_components/recycle-profile-wizard';
import Header from '@/app/(landing)/_components/Header';

export default function RegsiterRecycler() {
  return (
    <div className=""> 
    <Header/>
      <CompanyProfileWizard />
      <span className="block my-8"></span>
      <Footer/>
    </div>
  );
   
}