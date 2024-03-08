import { useMe } from "../../contexts/auth/auth.hook"; // react query
import DefaultLayout from "../layouts/DefaultLayout";

function HomePage() {
  const { data: user, isPending, error, isError } = useMe();

  if (isPending) return <p>Loading...</p>;
  if (isError) throw error;

  return (
    <DefaultLayout>
      <h1>Welcome {user?.name}</h1>
    </DefaultLayout>
  );
}
export default HomePage;

