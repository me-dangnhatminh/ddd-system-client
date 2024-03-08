import { useMe } from "../../contexts/auth/auth.hook";
import Header from "../components/Header";

function HeaderContainer() {
  const { data: user, isError, error, isPending, isSuccess } = useMe();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <>{error}</>;

  return (
    <Header
      isLoggedIn={isSuccess}
      userInfo={{
        firstName: user.name,
        lastName: user.name,
        avatarUrl: "fake",
      }}
      isShowMenu={false}
      onBtnLoginClick={(e) => {
        e.preventDefault();
        console.log("Login button clicked");
      }}
    />
  );
}

export default HeaderContainer;
