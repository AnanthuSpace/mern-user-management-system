import Home from "../Components/admin/Home";
import Header from "../Components/common/Header";

function HomePage() {
  return (
    <>
      <Header admin={"true"} />
      <Home />
    </>
  );
}

export default HomePage;
