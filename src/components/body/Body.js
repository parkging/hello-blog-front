import SideMenu from "./sidemenu/SideMenu";
import Content from "./content/Content";
function Body() {
  return (
    <div className="container">
      <div className="row">
        <Content />
        <SideMenu />
      </div>
    </div>
  );
}
export default Body;
