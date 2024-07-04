import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <div className="title">
            <h1>Find Real Estate & GEt Your Dream Place Find Real Estate</h1>
          </div>
          <p>
            Start Your Journey to Your Dream Home Here! Whether you’re looking
            for a cozy family residence or a premium investment property, our
            professional team is dedicated to providing you with the best
            service.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>+16</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
