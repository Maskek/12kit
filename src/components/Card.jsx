import React from "react";

export default function Card(props) {
  return (
    <div className="Card">
      <div>
        <img className="avatar" alt="avatar" src={props.avatar} />
      </div>
      <div className="Login">
        <h3>{props.login}</h3>
      </div>
      <a className="url" href={props.url}>
        <div>{props.name}</div>
      </a>
    </div>
  );
}
