import { useNavigate } from "react-router-dom";
import Header, { MenuItemProps } from "../components/Header";
import { IUserDTO } from "../../api/http-rest/user";
import { useSignOut, useUser } from "../../hooks";
import { AuthToken } from "../../api/http-rest/auth";

function HeaderNotSignedIn() {
  const navigate = useNavigate();
  return (
    <Header
      userInfo={undefined}
      menu={[]}
      isShowMenu={false}
      isLoggedIn={false}
      onBtnSignInClick={() => navigate("/signin")}
    />
  );
}

function HeaderSignedIn({ user }: { user: IUserDTO }) {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const menu: MenuItemProps[] = [
    { label: "Sign Out", onClick: () => signOut.mutate() },
  ];

  return (
    <Header
      onBtnSignInClick={() => navigate("/signin")}
      isLoggedIn={true}
      userInfo={user}
      menu={menu}
      isShowMenu={false}
    />
  );
}

function HeaderContainer() {
  const isSignedIn = AuthToken.isSignedIn();

  const user = useUser(isSignedIn);
  if (user.data) return <HeaderSignedIn user={user.data} />;
  return <HeaderNotSignedIn />;
}

export default HeaderContainer;
