import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/user.hook";
import Header, { MenuItemProps } from "../components/Header";
import { IUserDTO } from "../../api/http-rest/user";
import { useAuth } from "../../hooks";

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
  const auth = useAuth();
  const menu: MenuItemProps[] = [
    { label: "Sign Out", onClick: () => auth.signOut?.mutate() },
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
  const user = useUser();

  if (user.data) return <HeaderSignedIn user={user.data} />;
  return <HeaderNotSignedIn />;
}

export default HeaderContainer;
