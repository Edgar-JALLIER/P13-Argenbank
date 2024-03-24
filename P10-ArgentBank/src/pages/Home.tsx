import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import Features from "../components/Features";

const Home = () => {
  return (
    <>
      <Header />
      <main className="main entry-page">
        <HeroBanner />
        <Features />
      </main>
      <Footer />
    </>
  );
};

export default Home;
