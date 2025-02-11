import "./profilePage.scss";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import axios from "axios";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const { userPosts, savedPosts, chats } = useLoaderData();
  console.log(userPosts);

  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    currentUser && (
      <div className="profilePage">
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <Link to="/profile/update">
                <button>Update Profile</button>
              </Link>
            </div>
            <div className="info">
              <span>
                Avatar:
                <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
              </span>
              <span>
                Username: <b>{currentUser.username}</b>
              </span>
              <span>
                E-mail: <b>{currentUser.email}</b>
              </span>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="title">
              <h1>My List</h1>
              <Link to={"/add"}>
                <button>Add New Post</button>
              </Link>
            </div>
            <List posts={userPosts} />
            <div className="title">
              <h1>Saved List</h1>
            </div>
            <List posts={savedPosts} />
          </div>
        </div>
        <div className="chatContainer">
          <div className="wrapper">
            <Chat chats={chats} />
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;
