import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/header";
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
      <body className="">
        <div id="section_header" 
        style={{
        maxHeight: "5vh",
        width: "100vw",
        }}>
          <Header />
        </div>

        <div
          id="section_main"
          className="m-0 py-3 relative"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flex: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            minHeight: "80vh",
            zIndex: "-1",
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {children}
        </div>

        <div id="section_footer" 
        style={{ 
        maxHeight: "3vh", 
        margin:"auto",
        paddingTop: "0.5rem"
        }}>
          <Footer />
        </div>
      </body>
    </html>
  );
}
