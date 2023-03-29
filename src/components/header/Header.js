function Header() {
  return (
    <div>
      <nav class="navbar bg-dark" data-bs-theme="dark">
        <div class="container-fluid row">
          <div class="col-7">
            <a class="navbar-brand ms-3" href="/">
              박깅이의 블로그
            </a>
          </div>

          <div class="col-3">
            <a class="" href="/logout">
              로그아웃
            </a>
          </div>

          <div class="col-1 d-lg-none navbar-dark me-4">
            <button
              class="navbar-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
