// import CompanyProfileWizard from '../_components/recycle-profile-wizard';
import Footer from '@/app/(landing)/_components/footer';
import { RecyclerOnboardingWizard } from './_components/recycler-onboarding-wizard';

export default function RegsiterRecycler() {
  return (
    <div className=""> 
      <RecyclerOnboardingWizard />
      <span className="block my-8"></span>
      <Footer/>
    </div>
  );
   
}