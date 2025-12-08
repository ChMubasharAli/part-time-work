import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Lyout";
import Notch from "@/components/Notch/Notch";

export default function Home() {
  return (
    <Layout>
      <Notch />
      <HeroSection />
    </Layout>
  );
}
