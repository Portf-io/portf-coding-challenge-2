import Head from "next/head";
import styles from "../styles/Home.module.css";
import HomeHeader from "../components/Home/HomeHeader";
import HomeBody from "../components/Home/HomeBody";

export default function Home() {
  return (
    <div className="flex flex-col space-y-24">
      <HomeHeader />
      <HomeBody />
    </div>
  );
}
