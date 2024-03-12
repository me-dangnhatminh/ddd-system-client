import { Container } from "@mui/joy";
import HeaderContainer from "../containers/HeaderContainer";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Container maxWidth="lg">
      <HeaderContainer />
      <main>{children}</main>
      <footer>Footer</footer>
    </Container>
  );
}

export default DefaultLayout;
