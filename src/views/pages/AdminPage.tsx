import { useListUsers } from "../../contexts/auth/hook";
import Loading from "../components/Loading";

function AdminPage() {
  const getListUser = useListUsers();

  if (getListUser.isPending) return <Loading />;
  if (getListUser.isError) throw getListUser.error;

  return (
    <div>
      <h1>Admin Page</h1>
      <p>This page is only accessible by admin users.</p>
      <h2>Users</h2>
      <ul>
        {getListUser.data.map((u) => (
          <li key={u.id}>
            <span>{u.id}</span>
            <span> - </span>
            <span style={{ color: "green" }}>{u.name}</span>
            <span> - </span>
            <span style={{ color: "blue" }}>{u.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
