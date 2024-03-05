import { useUser } from "../../contexts/auth/use-user";

function HomePage() {
  const { data: user, isPending } = useUser();

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome {user?.name}</p>
    </div>
  );
}
export default HomePage;

