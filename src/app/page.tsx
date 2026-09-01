import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Intro from "@/components/Intro";
import Progress from "@/components/progress";
import Service from "@/components/Service";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Intro />
      <Info />
      <Progress />
      <Service />
      <Footer />
    </main>
  );
}