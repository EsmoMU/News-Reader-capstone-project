export function SavedQueries(params) {
  function onSavedQueryClick(savedQuery) {
    params.onQuerySelect(savedQuery);
  }

  function getQueries() {
    return params.savedQueries.map((item, idx) => {
      return (
        <li
          key={idx}
          onClick={() => onSavedQueryClick(item)}
          className={
            item.queryName === params.selectedQueryName ? "selected" : ""
          }
          style={{
            marginBottom: "12px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
            backgroundColor:
              item.queryName === params.selectedQueryName
                ? "#e3f2fd"
                : "#f9f9f9",
          }}
        >
          <div
            style={{
              fontSize: "1.1em",
              fontWeight: "bold",
              marginBottom: "6px",
              color: "#333",
            }}
          >
            {item.queryName}
          </div>
          <div style={{ fontSize: "0.9em", color: "#666", lineHeight: "1.4" }}>
            <div>
              <strong>Search:</strong> "{item.q}"
            </div>
            <div>
              <strong>Language:</strong> {item.language || "en"}
            </div>
            <div>
              <strong>Page Size:</strong> {item.pageSize || 10}
            </div>
            {item.sortBy && (
              <div>
                <strong>Sort By:</strong> {item.sortBy}
              </div>
            )}
            {item.from && (
              <div>
                <strong>From:</strong> {item.from}
              </div>
            )}
            {item.to && (
              <div>
                <strong>To:</strong> {item.to}
              </div>
            )}
          </div>
        </li>
      );
    });
  }

  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {params.savedQueries && params.savedQueries.length > 0 ? (
          getQueries()
        ) : (
          <li style={{ padding: "10px", textAlign: "center", color: "#999" }}>
            No Saved Queries, Yet!
          </li>
        )}
      </ul>
      {/* Only show reset button when user is logged in */}
      {params.currentUser && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button type="button" onClick={params.onReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
