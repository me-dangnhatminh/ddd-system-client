import DefaultLayout from "../layouts/DefaultLayout";

import HeaderContainer from "../containers/HeaderContainer";

function HomeContainer() {
  return <div>Home</div>;
}

function HomePage() {
  return (
    <DefaultLayout
      header={<HeaderContainer />}
      main={<HomeContainer />}
      footer={<p>Footer</p>}
    />
  );
}
export default HomePage;

