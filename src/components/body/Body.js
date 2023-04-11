import SideMenu from "./sidemenu/SideMenu";
import Content from "./content/Content";
function Body({ jwt, setJwt }) {
  return (
    <div className="container">
      <div className="row">
        <Content jwt={jwt} />
        <SideMenu />
      </div>
    </div>
  );
}
export default Body;
