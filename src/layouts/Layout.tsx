import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;