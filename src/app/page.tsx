import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Philosophy } from "@/components/sections/Philosophy";
import { Gallery } from "@/components/sections/Gallery";
import { Formats } from "@/components/sections/Formats";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Manifesto />
        <About />
        <Services />
        <Process />
        <Philosophy />
        <Gallery />
        <Formats />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
