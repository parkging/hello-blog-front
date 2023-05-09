function Profile() {
  return (
    <div className="my-2">
      <div id="frag_profile" className="row">
        <div className="card mx-auto" style={{ width: "18rem" }}>
          <img
            className="card-img-top mt-3"
            alt="..."
            // src="https://lh3.googleusercontent.com/pw/AMWts8C9s7ADZwXu_B-RWkVIL-H1Fk0xaZxvDBTxX7K0JM5098I3dYCzZ2IlF18FJFM1ppcWD2vqjZym9hIVcubn6VSHexQU13qoSdUvFyigaq9ftm2M1AcwYFq6N8Ylrc-9bnGT5FNDcMlRnuV5Vv3eJz7MSg=w1580-h1306-s-no?authuser=0"
            src="/profile.jpg"
          />
          <div className="card-body">
            <h5 className="card-title">박깅이</h5>
            <p className="card-text">도전하는 개발자!</p>
            <a
              href="https://github.com/parkging"
              target="_blank"
              className="card-link"
            >
              github.
            </a>
            <a
              href="https://portfolio.parkging.com"
              target="_blank"
              className="card-link"
            >
              portfolio.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
