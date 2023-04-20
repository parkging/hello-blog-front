import SideMenu from "./sidemenu/SideMenu";
import Content from "./content/Content";
function Body({ jwt, member, sideMenuShow, handleClose, changeTitle }) {
  return (
    <div className="container">
      <div className="row">
        <Content jwt={jwt} member={member} changeTitle={changeTitle} />
        <SideMenu sideMenuShow={sideMenuShow} handleClose={handleClose} />
      </div>
    </div>
  );
}
export default Body;
