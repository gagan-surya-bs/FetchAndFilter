import React, { useEffect, useState } from "react";
import Axios from "../Utility/Axios";
import "./fetch.css";

const FetchData = () => {
  let [state, setState] = useState([]);
  let [ascendings, setascendings] = useState([]);
  let [descendings, setdescending] = useState([]);
  let [searchTerm, setsearchterm] = useState("");
  let [loading, setloading] = useState(true);

  useEffect(() => {
    Axios.get("posts/")
      .then(data => setState(data.data))
      .catch(error => console.log(error));
  }, []);

  let handleDescending = () => {
    let { id } = state;
    let x = state.sort((a, b) => b.id - a.id);
    setdescending(x);

    setloading(false);
  };
  let handleAscending = () => {
    let { id } = state;
    let y = state.sort((a, b) => a.id - b.id);
    setascendings(y);
    setloading(true);
  };

  return (
    <section id="fetchblock">
      <article>
        <main className="main">
          <div className="leftblock">
            <button className="" onClick={handleAscending}>
              Ascending
            </button>
            <button
              className="bg-gray-500 p-2 rounded-md"
              onClick={handleDescending}
            >
              Descending
            </button>
          </div>
          <div className="rightblock">
            {" "}
            <input
              type="search"
              name="searchTerm"
              placeholder="search..."
              className="form-control"
              value={searchTerm}
              onChange={e => setsearchterm(e.target.value)}
            />
          </div>
        </main>
        <div className="contentblock">
          {(loading === true ? state : descendings)

            .filter(val => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((value, index) => {
              return (
                <ul key={value.id} className="list">
                  <label htmlFor="name">{value.id}</label>
                  <li style={{listStyle:"none"}}>{value.title}</li>
                </ul>
              );
            })}
        </div>
      </article>
    </section>
  );
};

export default FetchData;
