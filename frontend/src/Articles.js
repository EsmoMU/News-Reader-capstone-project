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
      <div
        style={{
          fontSize: "1.15em",
          fontWeight: "600",
          color: "#1f2937",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          marginBottom: "4px",
        }}
      >
        Query: {queryName}
      </div>
      <div
        style={{
          fontSize: "0.95em",
          color: "#6b7280",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          marginBottom: "8px",
        }}
      >
        Count: {articleCount}
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          onClick={displayDetailsButton}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 14px",
            fontSize: "0.95em",
            fontWeight: "500",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            marginBottom: "6px",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          {queryDetailsbutton}
        </button>
        <div
          className={
            queryDetailsbutton == "Hide Details" ? "visible" : "hidden"
          }
          style={{
            fontSize: "0.92em",
            color: "#374151",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            margin: "8px 0",
          }}
        >
          Query Text: <span style={{ color: "#059669" }}>{params.query.q}</span>{" "}
          <br />
          Language: {params.query.language} <br />
          Page Size: {params.query.pageSize}
          <br />
        </div>
      </div>
      <div
        style={{
          height: "250px",
          width: "100%",
          maxWidth: "350px",
          overflowY: "auto",
          overflowX: "hidden",
          border: "1px solid #e0e0e0",
          boxSizing: "border-box",
          margin: "0 auto",
          backgroundColor: "#fafafa",
          borderRadius: "8px",
        }}
      >
        <ol
          style={{
            margin: 0,
            paddingLeft: "2em",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          {articles.map((item, idx) => {
            if (item) {
              if (item.title) {
                if (item.title === "[Removed]") {
                  return (
                    <li
                      key={idx}
                      style={{
                        color: "#ef4444",
                        fontStyle: "italic",
                      }}
                    >
                      Was Removed
                    </li>
                  );
                }
                let trimTitle = item.title.substring(0, 100);
                return (
                  <li
                    key={idx}
                    style={{
                      fontSize: "0.95em",
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      marginBottom: "4px",
                      color: "#374151",
                    }}
                  >
                    {trimTitle}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#2563eb",
                        textDecoration: "underline",
                        marginLeft: "6px",
                      }}
                    >
                      Link
                    </a>
                  </li>
                );
              } else {
                return (
                  <li
                    key={idx}
                    style={{ color: "#9ca3af", fontStyle: "italic" }}
                  >
                    No Title
                  </li>
                );
              }
            } else {
              return (
                <li key={1} style={{ color: "#9ca3af", fontStyle: "italic" }}>
                  No Item
                </li>
              );
            }
          })}
        </ol>
      </div>
    </div>
  );
}
