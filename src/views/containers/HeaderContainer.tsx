import Header, { MenuItemProps } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

function HeaderContainer() {
  const auth = useAuth();
  const user = auth.userInfo;

  const menuProps: MenuItemProps[] = [
    { label: "Sign Out", onClick: () => auth.signOut?.mutate() },
  ];

  const navigate = useNavigate();

  return (
    <Header
      isLoggedIn={auth.isSignedIn}
      userInfo={user}
      menu={menuProps}
      isShowMenu={false}
      onBtnSignInClick={() => navigate("/signin")}
    />
  );
}

export default HeaderContainer;
