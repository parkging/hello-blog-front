import Profile from "./Profile";
import Category from "./category/Category";
import Offcanvas from "react-bootstrap/Offcanvas";

function SideMenu({ sideMenuShow, handleClose }) {
  return (
    <div className="col-md-3 sol-sm-0 mt-4 ">
      <Offcanvas
        show={sideMenuShow}
        onHide={handleClose}
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body container">
          <Profile />
          <Category />
        </Offcanvas.Body>
      </Offcanvas>

      <div className="container d-none d-lg-block ">
        <Profile />
        <Category />
      </div>
    </div>
  );
}
export default SideMenu;
