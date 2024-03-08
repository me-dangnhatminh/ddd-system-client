import { IconButton, Stack } from "@mui/joy";
import googleURL from "../../assets/google.svg";
import facebookURL from "../../assets/facebook.svg";
import github from "../../assets/github.svg";

function CustomIcon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt="Google"
      style={{ width: "28px", height: "28px", padding: "8px" }}
    />
  );
}

type SignInThirtySeviceContainerProps = {
  isSumitting?: boolean;
};

function SignInThirtySeviceContainer({
  isSumitting,
}: SignInThirtySeviceContainerProps) {
  function handleGoogleSignIn() {
    console.log("Google Sign In");
  }

  function handleFacebookSignIn() {
    console.log("Facebook Sign In");
  }

  function handleGithubSignIn() {
    console.log("Github Sign In");
  }

  return (
    <Stack direction="row" spacing={4} pt={1} justifyContent="center">
      <IconButton
        disabled={isSumitting}
        variant="plain"
        children={<CustomIcon src={googleURL} />}
        onClick={handleGoogleSignIn}
      />
      <IconButton
        disabled={isSumitting}
        variant="plain"
        children={<CustomIcon src={facebookURL} />}
        onClick={handleFacebookSignIn}
      />
      <IconButton
        disabled={isSumitting}
        variant="plain"
        children={<CustomIcon src={github} />}
        onClick={handleGithubSignIn}
      />
    </Stack>
  );
}

export default SignInThirtySeviceContainer;
