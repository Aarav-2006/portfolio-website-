import Cursor from "./components/Cursor";
import CornerCrosshairs from "./components/CornerCrosshairs";
import BackgroundLayer from "./components/BackgroundLayer";
import Hero from "./sections/Hero";
import ContactMe from "./sections/ContactMe";
import Now from "./sections/Now";
import Awards from "./sections/Awards";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import { SectionDivider } from "./components/SectionLabel";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BackgroundLayer />
      <Cursor />
      <CornerCrosshairs />

      <Hero />
      <ContactMe />
      <SectionDivider />
      <Now />
      <SectionDivider />
      <Awards />
      <SectionDivider />
      <Experience />
      <Footer />
    </main>
  );
}
