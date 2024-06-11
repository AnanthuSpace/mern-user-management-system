import { useEffect, useState } from "react";
import "../../assets/styles/Profile.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../redux/users/userThunk";

function Profile() {

  const userData = useSelector((state)=>state.user.userData)
  const [ username, setUsername ] = useState('')
  const [edit, setEdit ] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    setEdit(false)
  },[userData])

  const saveData = async (e, userId) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("userID", userId);
    formData.append("name", username);
    dispatch(editProfile({ formData, username, toast }));
  }

  return (
    <>
    <ToastContainer/>
    <div className="profile-div">
      <div className="profile-card">
        <div className="image">
          <img
            src="https://wallpapers.com/images/featured/anonymous-pictures-j89s1ratkktsm42d.webp"
            alt="image"
          />
        </div>
        {edit ? 
        <>
        <form onSubmit={(e) => saveData(e, userData._id)}>
        <input
          type="text"
          className="input"
          onChange={(e) => setUsername(e.target.value)}
          placeholder={userData.username}
        />
        {/* <input
          type="text"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={userData.email}
        /> */}
        <div className="btn-div">
        <button className="btn" onClick={()=>setEdit(false)}>Cancel</button>
        <button className="btn" onClick={saveData}>Save</button>
        </div>
        </form>
        </>
        :
        <>
        <div className="text-left">
        <p><span>Name : </span>{userData.username}</p>
        <p><span>Name : </span>{userData.email}</p>
        </div>
        <button className="btn" onClick={()=>setEdit(true)}>Edit</button>
        </>
        }
      </div>
    </div>
    </>
  );
}

export default Profile;
