import { useAuth } from "../../hooks/use-auth";

export default function UsersPage() {
  const { logout } = useAuth();
  return (
    <>
      <h1>this is users page</h1>
      <button
        className="p-2 bg-blue-600 cursor-pointer text-white"
        onClick={() => logout()}
      >
        Logout
      </button>
    </>
  );
}
