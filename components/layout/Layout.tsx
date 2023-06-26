// Components
import { Header, Content, Footer } from "../index";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Content>
        {children}
      </Content>
      <Footer />
    </>
  );
};

export default Layout;
