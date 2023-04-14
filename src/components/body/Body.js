import SideMenu from "./sidemenu/SideMenu";
import Content from "./content/Content";
function Body({ jwt, member }) {
  return (
    <div className="container">
      <div className="row">
        <Content jwt={jwt} member={member} />
        <SideMenu />
      </div>
    </div>
  );
}
export default Body;
