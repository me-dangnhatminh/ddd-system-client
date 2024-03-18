import Header, { MenuItemProps } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useMe } from "../../contexts/auth/user.hook";
import { useSignOut } from "../../contexts/auth/auth.hook";

function HeaderContainer() {
  const { data: user, isSuccess } = useMe();
  const signOut = useSignOut();

  const menuProps: MenuItemProps[] = [
    { label: "Sign Out", onClick: () => signOut.mutate() },
  ];

  const navigate = useNavigate();

  return (
    <Header
      isLoggedIn={isSuccess}
      userInfo={user}
      menu={menuProps}
      isShowMenu={false}
      onBtnSignInClick={() => navigate("/signin")}
    />
  );
}

export default HeaderContainer;
