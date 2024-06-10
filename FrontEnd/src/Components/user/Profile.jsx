import "../../assets/styles/Profile.css";

function Profile() {
  return (
    <div className="profile-div">
      <div className="profile-card">
        <div className="image">
          <img
            src="https://wallpapers.com/images/featured/anonymous-pictures-j89s1ratkktsm42d.webp"
            alt="image"
          />
        </div>
        {/* <label className="label">
            Username
          </label> */}
        <input
          type="text"
          className="input"
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="Ananthu Mohan"
        />
        {/* <label className="label">
            Email
          </label> */}
        <input
          type="text"
          className="input"
          // onChange={(e) => setEmail(e.target.value)}
          placeholder="ananthumohan@gmail.com"
        />

        <button className="btn">Edit</button>
      </div>
    </div>
  );
}

export default Profile;
