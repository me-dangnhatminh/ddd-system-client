import { Box, Container, Stack } from "@mui/joy";

interface DefaultLayoutProps {
  header: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode;
}

function DefaultLayout({ header, main, footer }: DefaultLayoutProps) {
  return (
    <Container maxWidth="lg">
      <Stack direction="column">
        <Box children={header} />
        <Box children={main} />
        <Box children={footer} />
      </Stack>
    </Container>
  );
}

export default DefaultLayout;
