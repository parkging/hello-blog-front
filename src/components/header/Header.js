import { Link as Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <nav className="navbar bg-dark" data-bs-theme="dark">
        <div className="container-fluid row">
          <div className="col-7">
            <a className="navbar-brand ms-3" href="/">
              박깅이의 블로그
            </a>
          </div>

          <div className="col-3">
            <Link className="" to={`/login`}>
              로그인
            </Link>
          </div>

          <div className="col-1 d-lg-none navbar-dark me-4">
            <button
              className="navbar-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
