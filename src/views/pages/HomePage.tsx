import { useMe } from "../../contexts/auth/hook"; // react query

function HomePage() {
  const { data: user, isPending, error, isError } = useMe();

  if (isPending) return <p>Loading...</p>;
  if (isError) throw error;

  return (
    <div>
      <h1>Home Page</h1>
      <p>Hello, {user.email}</p>
    </div>
  );
}
export default HomePage;

