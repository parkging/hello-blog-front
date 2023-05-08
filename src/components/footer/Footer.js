function Footer() {
  return (
    <div style={{ height: "100px" }}>
      <footer
        className="bd-footer bg-body-tertiary d-flex justify-content-center"
        style={{ height: "100px" }}
      >
        <div className="container my-auto text-body-secondary">
          <div className="row">
            <div className="footer_div">
              Copyright 2023. parkging ALL rights reserved.
            </div>
          </div>
        </div>

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
          crossOrigin="anonymous"
        ></script>
      </footer>
    </div>
  );
}
export default Footer;
