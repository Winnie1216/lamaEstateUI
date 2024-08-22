import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);

  const openHandler = () => {
    setOpen((preOPen) => !preOPen);
  };

  return (
    <nav className="navbar">
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="logo"></img>
          <span>Real Estate</span>
        </a>
        <a href="/">Home</a>
        <a href="/list">Property</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to={"/profile"} className="profile">
              <div className="notification">3</div>
              Profile
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}

        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={openHandler} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/list">Property</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
