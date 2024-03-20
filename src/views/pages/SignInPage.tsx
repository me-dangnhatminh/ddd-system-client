import { Box, Container, Stack, Typography } from "@mui/joy";
import SignInFormContainer from "../containers/SignInFormContainer";

function Footer() {
  return (
    <Box>
      <Typography level="body-xs" textAlign="center">
        Task Cafe is protected by reCAPTCHA and the Privacy Policy and Terms of
        Service apply.
      </Typography>
    </Box>
  );
}

function SignInPage() {
  return (
    <Container maxWidth="xs">
      <Stack spacing={2} py={4}>
        <Box children={<SignInFormContainer />} />
        <Box children={<Footer />} />
      </Stack>
    </Container>
  );
}

export default SignInPage;
