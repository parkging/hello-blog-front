import SideMenu from "./sidemenu/SideMenu";
import Content from "./content/Content";
function Body() {
  return (
    <div class="container">
      <div class="row">
        <Content />
        <SideMenu />
      </div>
    </div>
  );
}
export default Body;
