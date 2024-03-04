import Image from "next/image";
import LoadingImage from "@/../public/loading.gif";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <h2>Welcome to NextJS Self Practise Task!</h2>
      {/* <img src={LoadingImage}/> */}
      <Image src={LoadingImage} width={50} alt="Loading..."/>
    </main>
  );
}
