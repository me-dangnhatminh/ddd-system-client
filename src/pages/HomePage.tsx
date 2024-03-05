import { useQuery } from "react-query";
import { getUsers } from "../api/http-rest/auth/auth.api";

function Users() {
  const { isLoading, data, error } = useQuery("users", getUsers);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {`${error}`}</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Users />
    </div>
  );
}
export default HomePage;

