import React from "react";
import axios from "axios";
import List from "./List";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      vis: "non-vis",
      page: 1,
      pages: 25,
      per_page: 10,
      pagination: []
    };
  }

  re_search() {
    this.setState(
      () => {
        return { page: 1 };
      },
      () => this.search()
    );
  }

  search() {
    let text = document.getElementById("search-text").value;

    let paggArr = new Array(this.state.pages);
    for (let i = 0; i < paggArr.length; i++) paggArr[i] = i;

    if (text !== "") {
      let sort = document.getElementById("sort-items").value;
      let sortValue = sort.split("-")[1];
      let pagination =
        "&page=" + this.state.page + "&per_page=" + this.state.per_page;
      let url =
        "https://api.github.com/search/repositories?q=" + text + pagination;

      if (sort === "best-matches") url += "&o=desc";

      if (sort === "most-stars") url += "&sort=" + sortValue + "&order=desc";

      if (sort === "fewest-stars") url += "&sort=" + sortValue + "&order=asc";

      if (sort === "most-forks") url += "&sort=" + sortValue + "&order=desc";

      if (sort === "fewest-forks") url += "&sort=" + sortValue + "&order=asc";

      if (sort === "resently-updated")
        url += "&sort=" + sortValue + "&order=desc";

      if (sort === "lasts-resently-updated")
        url += "&sort=" + sortValue + "&order=asc";

      axios(url)
        .then((response) => {
          if (response.data.items.length !== 0) {
            this.setState(
              () => {
                return {
                  data: response.data.items,
                  pagination: paggArr,
                  vis: "vis"
                };
              },
              () => this.ActiveP()
            );
          } else alert("Репозиториев с таким именем не найдено.");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  next() {
    if (this.state.page === this.state.pages)
      this.setState(
        () => {
          return { page: 1 };
        },
        () => this.search()
      );
    else
      this.setState(
        (state) => {
          return { page: state.page + 1 };
        },
        () => this.search()
      );
  }

  prev() {
    if (this.state.page !== 1)
      this.setState(
        (state) => {
          return { page: state.page - 1 };
        },
        () => this.search()
      );
    else
      this.setState(
        (state) => {
          return { page: state.pages };
        },
        () => this.search()
      );
  }

  CurrentP(page) {
    this.setState(() => {
      return { page: page };
    });
  }

  ActiveP() {
    let pages = document.getElementsByClassName("page");

    for (let i = 0; i < pages.length; i++) {
      if (this.state.page === +pages[i].innerText) {
        pages[i].classList.add("active");
      } else {
        pages[i].classList.remove("active");
      }
    }
  }

  changePageOnClick(page) {
    this.setState(
      () => {
        return { page: page };
      },
      () => this.search()
    );
  }

  render() {
    return (
      <div>
        <h3 className="headhead"> Search Repos </h3>
        <div id="search">
          <select id="sort-items" onChange={() => this.CurrentP(1)}>
            <option value="best-match">Best match</option>
            <option value="most-stars">Most stars</option>
            <option value="fewest-stars">Fewest stars</option>
            <option value="most-forks">Most forks</option>
            <option value="fewest-forks">Fewest forks</option>
            <option value="resently-updated">Resently updated</option>
            <option value="lasts-resently-updated">
              Lasts resently updated
            </option>
          </select>
          <input type="text" id="search-text" />
          <button onClick={() => this.re_search()}>Search</button>
        </div>

        <List data={this.state.data} />

        <div id="pagination" className={this.state.vis}>
          <button onClick={() => this.prev()}>Prev</button>
          <div id="pages">
            {this.state.pagination.map((page) => {
              return (
                <div
                  className="page"
                  onClick={() => this.changePageOnClick(page + 1)}
                  key={page}
                >
                  {page + 1}
                </div>
              );
            })}
          </div>
          <button onClick={() => this.next()}>Next</button>
        </div>
      </div>
    );
  }
}
