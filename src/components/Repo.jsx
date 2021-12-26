import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Diagram from "./Diagramm";

const repoQuery = gql`
  query Info($repoName: String!) {
    viewer {
      id
      login
      repository(name: $repoName) {
        issues(first: 100) {
          edges {
            node {
              state
            }
          }
        }
        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              committedDate
            }
          }
        }
        forkCount
        updatedAt
        createdAt
        languages(first: 10) {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

export default function Repo() {
  let path = window.location.pathname;
  const repoName = path.slice(6, path.length);
  const { loading, error, data } = useQuery(repoQuery, {
    variables: { repoName }
  });

  if (loading)
    return (
      <div>
        <img
          src="https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif"
          alt="preloader"
        />
      </div>
    );
  if (error) return <p>Возикла ошибка{console.log(error.message)}</p>;
  let closeIssue = 0;
  let openIssue = 0;
  let issues = data.viewer.repository.issues.edges;
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].node.state === "OPEN") openIssue++;
    else if (issues[i].node.state === "CLOSED") closeIssue++;
  }

  let createDateTime = data.viewer.repository.createdAt;
  createDateTime = createDateTime.slice(0, createDateTime.length - 1);
  let createDate = createDateTime.split("T")[0];
  let createTime = createDateTime.split("T")[1];

  let updateDateTime = data.viewer.repository.updatedAt;
  updateDateTime = updateDateTime.slice(0, updateDateTime.length - 1);
  let updateDate = updateDateTime.split("T")[0];
  let updateTime = updateDateTime.split("T")[1];

  return (
    <div id="repo-info">
      <div id="title">
        <strong>Репозиторий:</strong> {repoName}
      </div>
      <div id="date-time-create">
        <strong>Дата и время создания: </strong>
        {createDate} {createTime}
      </div>
      <div id="date-time-update">
        <strong>Последнее обновление: </strong> {updateDate} {updateTime}
      </div>
      <div id="languages">
        <strong>Используемые языки программирования:</strong>
        <ul>
          {data.viewer.repository.languages.nodes.length !== 0 ? (
            data.viewer.repository.languages.nodes.map((language) => {
              return <li key={language.id}>{language.name}</li>;
            })
          ) : (
            <div>Нет языков программирования</div>
          )}
        </ul>
      </div>
      <div id="forks">
        <strong>Количество форков: </strong>
        {data.viewer.repository.forkCount}
      </div>
      {issues.length === 0 ? (
        <div id="not-issues">Empty issues</div>
      ) : (
        <Diagram open={openIssue} close={closeIssue} />
      )}
    </div>
  );
}
