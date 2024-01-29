
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/header";
import HeaderConnect from "./Components/headerConnect";
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
        <div id="section_headr"
        style={{height: "10vh", width:"100vw"}}>
        <Header/>
        </div>
       
            
        <div id="section_main"
        style={{height: "85vh", width:"100vw", overflowY: "auto", backgroundColor: "#f8f9fa",  }}>
        {children} </div>
        
        <div id="section_footer"
        className="m-0 p-0"
        style={{height: "20px", width:"100vw", borderTop: "1px solid black"}}>
        <Footer/>
        </div>
       
      </body>
    </html>
  );
}
