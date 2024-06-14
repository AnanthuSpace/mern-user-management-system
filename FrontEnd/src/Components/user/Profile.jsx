import { useEffect, useState, useRef } from "react";
import "../../assets/styles/Profile.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../redux/users/userThunk";
import { useNavigate } from "react-router-dom";
import { Camera } from "../../assets/svg/svg";

function Profile() {
  const userData = useSelector((state) => state.user.userData);
  const [username, setUsername] = useState("");
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const imageIconReference = useRef(null);
  const dispatch = useDispatch();
  

  useEffect(() => {
    setEdit(false);
  }, [userData]);


  const saveData = async (e, userID) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userID", userID); 
    formData.append("username", username);
    if (image) {
      formData.append("newImage", image);
    }
    dispatch(editProfile({ formData, username, image, toast }));
  };

  return (
    <>
      <ToastContainer />
      <div className="profile-div">
        <div className="profile-card">
          {edit ? (
            <>
              <form className="profileform" onSubmit={(e)=>saveData(e, userData._id)}>
                <div
                  className="circle"
                  style={
                    image
                      ? { backgroundImage: `url(${URL.createObjectURL(image)})` }
                      : { backgroundImage: `url(../src/assets/images/${userData.profileURL})` }
                  }
                >
                  <input
                    type="file"
                    hidden
                    ref={imageIconReference}
                    onChange={(e) => setImage(e.target.files[0])}
                    accept=".png, .jpeg, .jpg"
                  />
                  <div onClick={() => imageIconReference.current.click()}>
                    <Camera />
                  </div>
                </div>
                <input
                  type="text"
                  className="profileinput"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={userData.username}
                />
                <div className="btn-div">
                  <button type="button" className="btn" onClick={() => { setEdit(false); setImage(null) }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn">
                    Save
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="image">
                <img
                  src={`../src/assets/images/${userData.profileURL}`}
                />
              </div>
              <div className="text-left">
                <p><span>Name : </span>{userData.username}</p>
                <p><span>Email : </span>{userData.email}</p>
              </div>
              <button className="btn" onClick={() =>{ setEdit(true),setUsername(userData.username)}}>Edit</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
