import Profile from "./Profile";
import Category from "./Category";
import CategoryNavi from "./CategoryNavi";

function SideMenu() {
  return (
    <div class="col-md-3 sol-sm-0 mt-4 ">
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body container">
          <Profile />
          <CategoryNavi />
        </div>
      </div>

      <div class="container d-none d-lg-block ">
        <Profile />
        <Category />
      </div>
    </div>
  );
}
export default SideMenu;
