function Login() {
  return (
    <div
      className="bg-dark p-2 text-dark bg-opacity-10"
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        //   padding-top: 40px,
        //   padding-bottom: 40px,
        //   /*background-color: #f5f5f5;*/
        backgroundColor: "red",
      }}
    >
      <main
        class="form-signin w-25 m-auto align-item-center"
        style={{ height: "100wh" }}
      >
        <form action="login-form.html" method="post" object="${loginForm}">
          <h1 class="d-flex justify-content-center h3 mb-3 fw-normal">
            Please sign in
          </h1>

          <div class="form-floating">
            <input
              type="email"
              id="loginEmail"
              field="*{loginEmail}"
              class="form-control"
              errorclass="border-danger"
              placeholder="name@example.com"
            />
            <label for="loginEmail">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              id="password"
              field="*{password}"
              class="form-control"
              errorclass="border-danger"
              placeholder="Password"
            />
            <label for="password">Password</label>
          </div>

          <div class="checkbox mb-3 d-flex justify-content-center">
            <label>
              <div class="text-danger" errors="*{loginEmail}" />
              <div class="text-danger" errors="*{password}" />
              <div if="${#fields.hasGlobalErrors()}">
                <p
                  class="text-danger"
                  each="err : ${#fields.globalErrors()}"
                  text="${err}"
                >
                  전체 오류 메시지
                </p>
              </div>
            </label>
          </div>
          <div class="row">
            <div class="col-md-6">
              <button class="w-100 btn btn-lg btn-primary" type="submit">
                Sign Up
              </button>
            </div>
            <div class="col-md-6">
              <button
                class="w-100 btn btn-lg btn-secondary"
                type="button"
                onclick="signIn()"
              >
                Sign In
              </button>
            </div>
          </div>
          <p class="mt-5 mb-3 text-muted d-flex justify-content-center">
            &copy; 2023
          </p>
        </form>
      </main>
    </div>
  );
}
export default Login;
