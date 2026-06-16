import { useEffect, useState } from "react";
import api from "../services/api";
import Pagination from "../../components/Pagination";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const currentUsers = users.slice(firstIndex, lastIndex);
  const permissionsList = ["read", "write", "delete"];

  // GET USERS
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // UPDATE USER
  const handleSave = async () => {
    await api.put(`/users/${selected.id}`, selected);
    await fetchUsers();
    setSelected(null);
  };

  // ROLE CHANGE
  const handleRole = (e) => {
    setSelected({ ...selected, role: e.target.value });
  };

  // PERMISSION TOGGLE
  const togglePermission = (perm) => {
    let updated = [...selected.permissions];

    if (updated.includes(perm)) {
      updated = updated.filter((p) => p !== perm);
    } else {
      updated.push(perm);
    }

    setSelected({ ...selected, permissions: updated });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User Role & Permission Management</h2>

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.permissions.join(", ")}</td>
              <td>
                <button onClick={() => setSelected(u)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      {/* EDIT FORM */}
      {selected && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid black" }}>
          <h3>Edit User</h3>

          {/* ROLE */}
          <div>
            <label>Role: </label>
            <select value={selected.role} onChange={handleRole}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="editor">Editor</option>
            </select>
          </div>

          {/* PERMISSIONS */}
          <div style={{ marginTop: 10 }}>
            <p>Permissions:</p>

            {permissionsList.map((perm) => (
              <label key={perm} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={selected.permissions.includes(perm)}
                  onChange={() => togglePermission(perm)}
                />
                {perm}
              </label>
            ))}
          </div>

          {/* BUTTON */}
          <div style={{ marginTop: 10 }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setSelected(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
