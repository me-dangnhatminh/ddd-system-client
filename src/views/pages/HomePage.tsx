import { useMe } from "../../contexts/auth/hook"; // react query

function HomePage() {
  const { data: user, isPending, error, isError } = useMe();

  if (isPending) return <p>Loading...</p>;
  if (isError) throw error;

  return (
    <div>
      <h1>Home Page</h1>
      <p>
        Welcome, <span style={{ fontWeight: "bold" }}>{user?.name}</span>
      </p>
    </div>
  );
}
export default HomePage;

