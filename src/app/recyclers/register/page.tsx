import Header from '@/app/(landing)/_components/Header';
import CompanyProfileWizard from '../_components/recycle_profile_wizard';
import Footer from '@/app/(landing)/_components/footer';

export default function RegsiterRecycler() {
  return (
    <> 
      <Header/>
      <CompanyProfileWizard />
      <span className="block my-8"></span>
      <Footer/>
    </>
  );
   
}