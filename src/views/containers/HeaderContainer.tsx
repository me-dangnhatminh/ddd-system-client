import { useNavigate } from "react-router-dom";
import { useMe } from "../../contexts/auth/auth.hook";
import Header from "../components/Header";

function HeaderContainer() {
  const { data: user, isSuccess } = useMe();
  const navigate = useNavigate();

  return (
    <Header
      isLoggedIn={isSuccess}
      userInfo={user}
      isShowMenu={false}
      onBtnSignInClick={() => navigate("/signin")}
    />
  );
}

export default HeaderContainer;
