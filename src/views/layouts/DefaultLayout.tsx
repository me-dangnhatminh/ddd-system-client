import { Container } from "@mui/joy";
import HeaderContainer from "../containers/HeaderContainer";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="lg">
      <HeaderContainer />
      <main>{children}</main>
    </Container>
  );
}

export default DefaultLayout;
