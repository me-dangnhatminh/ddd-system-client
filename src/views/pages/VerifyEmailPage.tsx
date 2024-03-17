import { Container, Card, Typography } from "@mui/joy";
import DigitInput from "../containers/singup/DigitInput";
import { useMe } from "../../contexts/auth/user.hook";

function VerifyEmailPage() {
  const getMe = useMe();
  if (getMe.isError) throw getMe.error;
  if (getMe.isPending) return <>loading...</>;

  return (
    <Container maxWidth="sm">
      <Card>
        <Typography>You're almost done!</Typography>
        <Typography>We sent a launch code to {getMe.data.email}.</Typography>
        <DigitInput digitSize={6} />
      </Card>
    </Container>
  );
}

export default VerifyEmailPage;
