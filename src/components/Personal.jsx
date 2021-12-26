import React from "react";
import Repos from "./OpenPersonal";

export default class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  auth() {
    let token = document.getElementById("input-token").value;
    localStorage.setItem("token", token);
    window.location.reload();
  }
  render() {
    return (
      <div>
        <div id="form">
          <h4>Вход</h4>
          <input id="input-token" placeholder="Введите ваш token" />
          <button
            onClick={() => {
              this.auth();
            }}
          >
            Войти
          </button>
        </div>

        <Repos />
      </div>
    );
  }
}
