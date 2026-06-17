import { Footer, Navbar } from '../components';
import {
  About, Explore, Faq, Feedback, GetStarted, Hero, Insights, Pricing, Stats, WhatsNew, World,
} from '../sections';

const Page = () => (
  <div className="bg-primary-black overflow-x-clip">
    <Navbar />
    <Hero />
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
      <Explore />
    </div>
    <div className="relative">
      <GetStarted />
      <div className="gradient-04 z-0" />
      <WhatsNew />
    </div>
    <Pricing />
    <div className="relative">
      <World />
      <div className="gradient-04 z-0" />
      <Stats />
    </div>
    <div className="relative">
      <Insights />
      <div className="gradient-04 z-0" />
      <Faq />
    </div>
    <Feedback />
    <Footer />
  </div>
);

export default Page;
