import { AmbientBackground } from "@/components/ambient-background";
import { Navbar } from "@/components/navbar";
import { ScrollBuddy } from "@/components/scroll-buddy";
import { StartAtTop } from "@/components/start-at-top";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { Life } from "@/components/life";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Feedback } from "@/components/feedback";
import { ResumeGate } from "@/components/resume-gate";

export default function Home() {
  return (
    <>
      <StartAtTop />
      <AmbientBackground />
      <Navbar />
      <ScrollBuddy />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Life />
        <Contact />
      </main>
      <Footer />
      <ResumeGate />
      <Feedback />
    </>
  );
}
