import React from "react";

function Register() {
  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/user_blog_api/token/", {
        username: "arif",
        password: "arif",
        refresh:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIxNDI5NDI4LCJqdGkiOiIwOTdlMTE0ODdiNmI0ZWQ3ODYxNjkzODg0MjdlYmZmMiIsInVzZXJfaWQiOjF9.WaJzg_fkR0d54pez2dtca-F_OCdIwAGHrFYnnyaFwH0",
      })
      .then(
        (res) => {
        //   console.log(res.data);
          const { access, refresh } = res.data;
          window.localStorage.setItem("a_token", access);
          window.localStorage.setItem("r_token", access);
        },
        (error) => {
        //   console.log(error);
        }
      );
  }, []);
  // method: 'get', //you can set what request you want to be
  // url: 'http://127.0.0.1:8000/user_blog_api/token/',
  // auth: {username:'arif',
  //  password:'arif'},
  // headers: {
  //     "access-control-allow-origin" : "*",
  //     "Content-type": "application/json; charset=UTF-8"
  // //   Authorization: 'Bearer ' + varToken

  //   })
  return <div>Register</div>;
}

export default Register;
