import Profile from "./Profile";
import Category from "./category/Category";
import CategoryNavi from "./category/CategoryNavi";

function SideMenu() {
  return (
    <div className="col-md-3 sol-sm-0 mt-4 ">
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body container">
          <Profile />
          <CategoryNavi />
        </div>
      </div>

      <div className="container d-none d-lg-block ">
        <Profile />
        <Category />
      </div>
    </div>
  );
}
export default SideMenu;
