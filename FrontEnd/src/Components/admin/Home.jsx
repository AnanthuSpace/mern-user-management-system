import "../../assets/styles/Home.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  deleteUser,
  updateUser,
} from "../../redux/admin/adminThunk";
import { Editbtn, DeleteBtn } from "../../assets/svg/svg";
import alertMsg from "../../assets/alert/alert";

function Home() {
  const [editUserID, setEditUserID] = useState(null);
  const [editedUserName, setEditedUserName] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  let usersData = useSelector((state) => state.admin.adminData);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleDelete = (id) => {
    alertMsg("Do you want to delete this user permanently?").then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser({ id, toast }));
        console.log("Confirmed");
      }
    });
  };

  const openEdit = (id, name) => {
    setEditUserID(id);
    setEditedUserName(name);
  };

  const handleSaveEdit = (id) => {
    dispatch(updateUser({ id, name: editedUserName, toast }));
    setEditUserID(null);
    dispatch(fetchUser());
  };

  const filteredUsers = search
    ? usersData.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    : usersData;

  return (
    <>
      <ToastContainer />
      <div className="main-div">
        <h1>User List</h1>
        <input
          className="search"
          type="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredUsers && filteredUsers.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Username</th>
                <th style={{ width: "40%" }}>Email</th>
                <th style={{ width: "15%" }}>Edit</th>
                <th style={{ width: "15%" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  {editUserID === user._id ? (
                    <>
                      <td>
                        <input
                          className="editnameInput"
                          type="text"
                          defaultValue={user.username}
                          onChange={(e) => setEditedUserName(e.target.value)}
                        />
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="saveName"
                          onClick={() => handleSaveEdit(user._id)}
                        >
                          Save
                        </button>
                      </td>
                      <td>
                        <button
                          className="cancelName"
                          onClick={() => setEditUserID(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={() => openEdit(user._id, user.username)}
                        >
                          <Editbtn />
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(user._id)}>
                          <DeleteBtn />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Users Found</p>
        )}
      </div>
    </>
  );
}

export default Home;
