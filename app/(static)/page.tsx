import HeroSection from './_sections/HeroSection'
import FeaturesSection from './_sections/FeaturesSection'
import SupportSection from './_sections/SupportSection'
import CustomersSection from './_sections/CustomersSection'

export default function Home() {
  return (
    <div className='text-white'>
      <HeroSection />
      <FeaturesSection />
      <CustomersSection />
      <SupportSection />
    </div>
  )
}