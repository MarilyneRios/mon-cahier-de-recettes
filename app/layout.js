import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mon cahier de recettes",
  description: "Grâce à cette application, vous allez pouvoir tenir un cahier de recette en ligne comme le faisait nos grands-mères.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
      <Header/>
      <div>{children} </div>
     
      </body>
    </html>
  );
}
