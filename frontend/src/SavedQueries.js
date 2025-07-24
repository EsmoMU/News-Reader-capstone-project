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
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor:
              item.queryName === params.selectedQueryName
                ? "#f0f8ff"
                : "#fafafa",
            boxShadow:
              item.queryName === params.selectedQueryName
                ? "0 2px 8px rgba(59, 130, 246, 0.15)"
                : "0 1px 3px rgba(0, 0, 0, 0.05)",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              fontSize: "1.1em",
              fontWeight: "600",
              marginBottom: "6px",
              color: "#1f2937",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            {item.queryName}
          </div>
          <div
            style={{
              fontSize: "0.9em",
              color: "#6b7280",
              lineHeight: "1.5",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            <div>
              <strong style={{ color: "#374151" }}>Search:</strong>{" "}
              <span style={{ color: "#059669" }}>"{item.q}"</span>
            </div>
            <div>
              <strong style={{ color: "#374151" }}>Language:</strong>{" "}
              {item.language || "en"}
            </div>
            <div>
              <strong style={{ color: "#374151" }}>Page Size:</strong>{" "}
              {item.pageSize || 10}
            </div>
            {item.sortBy && (
              <div>
                <strong style={{ color: "#374151" }}>Sort By:</strong>{" "}
                {item.sortBy}
              </div>
            )}
            {item.from && (
              <div>
                <strong style={{ color: "#374151" }}>From:</strong> {item.from}
              </div>
            )}
            {item.to && (
              <div>
                <strong style={{ color: "#374151" }}>To:</strong> {item.to}
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
          <li
            style={{
              padding: "10px",
              textAlign: "center",
              color: "#9ca3af",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontStyle: "italic",
            }}
          >
            No Saved Queries, Yet!
          </li>
        )}
      </ul>
      {/* Only show reset button when user is logged in */}
      {params.currentUser && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button
            type="button"
            onClick={params.onReset}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              fontSize: "0.9em",
              fontWeight: "500",
              cursor: "pointer",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={e => (e.target.style.backgroundColor = "#dc2626")}
            onMouseOut={e => (e.target.style.backgroundColor = "#ef4444")}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
// Already enhanced with modern fonts and colors
