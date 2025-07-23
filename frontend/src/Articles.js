import { useState } from "react";
export function Articles(params) {
  const [queryDetailsbutton, setQueryDetailsbutton] = useState(
    "Display Query Details"
  );
  let articles = params.data.articles ? params.data.articles : [];
  let queryName = params.query.queryName ? params.query.queryName : "na";
  let articleCount = params.data.totalResults ? params.data.totalResults : 0;
  // console.log(params.query);
  function displayDetailsButton() {
    if (queryDetailsbutton == "Display Query Details") {
      setQueryDetailsbutton("Hide Details");
    } else {
      setQueryDetailsbutton("Display Query Details");
    }
  }
  return (
    <div>
      Query: {queryName}
      <br />
      Count: {articleCount}
      <div style={{ textAlign: "center" }}>
        <button type="button" onClick={displayDetailsButton}>
          {queryDetailsbutton}
        </button>
        <div
          className={
            queryDetailsbutton == "Hide Details" ? "visible" : "hidden"
          }
        >
          Query Text: {params.query.q} <br />
          Language: {params.query.language} <br />
          Page Size: {params.query.pageSize}
          <br />
        </div>
      </div>
      <ol>
        {articles.map((item, idx) => {
          if (item) {
            if (item.title) {
              if (item.title === "[Removed]") {
                return <li key={idx}>Was Removed</li>;
              }
              let trimTitle = item.title.substring(0, 60);
              return (
                <li
                  key={idx}
                  style={{
                    fontSize: "0.9em",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    marginBottom: "4px",
                  }}
                >
                  {trimTitle}
                  <a href={item.url} target="_blank" rel="noreferrer">
                    &nbsp;Link
                  </a>
                </li>
              );
            } else {
              return <li key={idx}>No Title</li>;
            }
          } else {
            return <li key={1}>No Item</li>;
          }
        })}
      </ol>
    </div>
  );
}
