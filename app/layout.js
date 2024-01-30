
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/header";
//import HeaderConnect from "./Components/headerConnect";
import  Footer  from "./Components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mon cahier de recettes",
  description: "Grâce à cette application, vous allez pouvoir tenir un cahier de recette en ligne comme le faisait nos grands-mères.",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="fr">
      <body className={inter.className}>
        
        {/* <HeaderConnect/>*/}
        <div id="section_header"
        className="m-0 p-0"
        >
        <Header/>
        </div>
            
        <div id="section_main"
        className="my-3 p-0"
        style={{  width:"100vw"}}>
        {children} </div>
        
        <div id="section_footer"
       
        style={{  borderTop: "1px solid black"}}>
        <Footer/>
        </div>
       
      </body>
    </html>
  );
}
