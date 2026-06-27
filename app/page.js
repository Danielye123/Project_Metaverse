import { Footer, Navbar } from '../components';
import ParallaxBlob from '../components/ParallaxBlob';
import ScrollProgress from '../components/ScrollProgress';
import {
  About, Explore, Faq, Feedback, GetStarted, Hero, Insights, Pricing, Stats, WhatsNew, World,
} from '../sections';

const Page = () => (
  <div className="bg-primary-black overflow-x-clip">
    <ScrollProgress />
    <Navbar />
    <Hero />
    {/* <Singularity /> temporarily disabled — re-add `Singularity` to the sections import above to restore */}
    <div className="relative">
      <About />
      <ParallaxBlob className="gradient-03 z-0" baseRotate={-114.2} range={140} />
      <Explore />
    </div>
    <div className="relative">
      <GetStarted />
      <ParallaxBlob className="gradient-04 z-0" baseRotate={-53.13} range={140} />
      <WhatsNew />
    </div>
    <Pricing />
    <div className="relative">
      <World />
      <ParallaxBlob className="gradient-04 z-0" baseRotate={-53.13} range={140} />
      <Stats />
    </div>
    <div className="relative">
      <Insights />
      <ParallaxBlob className="gradient-04 z-0" baseRotate={-53.13} range={140} />
      <Faq />
    </div>
    <Feedback />
    <Footer />
  </div>
);

export default Page;
