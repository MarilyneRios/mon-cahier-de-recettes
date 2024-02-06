import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
//import HeaderConnect from "./Components/headerConnect";
import Footer from "./Components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mon cahier de recettes",
  description:
    "Grâce à cette application, vous allez pouvoir tenir un cahier de recette en ligne comme le faisait nos grands-mères.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-vh-100 d-flex flex-column">
        <div id="section_header">       
          <Header />
        </div>

        <div
          id="section_main"
          className="flex-grow-1  d-flex align-items-center justify-content-center"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url('/table-bois.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "auto",
          }}
        >
          {children}
        </div>

        <div id="section_footer" >
          <Footer/>
        </div>
      </body>
    </html>
  );
}
