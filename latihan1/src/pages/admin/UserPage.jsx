import { useEffect, useState } from "react";
import api from "../../services/api";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const handleUpdate = async () => {
    await api.put(`/users/${editUser.id}`, editUser);
    setEditUser(null);
    fetchUsers();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Management (RBAC)</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Permissions</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.username}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">{u.permissions.join(", ")}</td>

              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2"
                  onClick={() => setEditUser(u)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT FORM */}
      {editUser && (
        <div className="mt-4 p-4 border">
          <h2 className="font-bold">Edit User</h2>

          {/* ROLE */}
          <select
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>

          {/* PERMISSIONS */}
          <div className="mt-2">
            <label>
              <input
                type="checkbox"
                checked={editUser.permissions.includes("read")}
                onChange={(e) => {
                  const perms = e.target.checked
                    ? [...editUser.permissions, "read"]
                    : editUser.permissions.filter((p) => p !== "read");

                  setEditUser({ ...editUser, permissions: perms });
                }}
              />
              read
            </label>

            <label className="ml-2">
              <input
                type="checkbox"
                checked={editUser.permissions.includes("write")}
                onChange={(e) => {
                  const perms = e.target.checked
                    ? [...editUser.permissions, "write"]
                    : editUser.permissions.filter((p) => p !== "write");

                  setEditUser({ ...editUser, permissions: perms });
                }}
              />
              write
            </label>

            <label className="ml-2">
              <input
                type="checkbox"
                checked={editUser.permissions.includes("delete")}
                onChange={(e) => {
                  const perms = e.target.checked
                    ? [...editUser.permissions, "delete"]
                    : editUser.permissions.filter((p) => p !== "delete");

                  setEditUser({ ...editUser, permissions: perms });
                }}
              />
              delete
            </label>
          </div>

          <button
            className="bg-green-600 text-white px-3 mt-3"
            onClick={handleUpdate}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
