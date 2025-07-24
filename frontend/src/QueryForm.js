export function QueryForm(params) {
  const handleChange = event => {
    let newQueryObject = { ...params.formObject };
    newQueryObject[event.target.name] = event.target.value;
    params.setFormObject(newQueryObject);
  };

  function onSubmitClick(event) {
    event.preventDefault();
    if (!params.formObject.queryName) {
      alert("please provide a name for the query!");
      return;
    }
    if (!params.formObject.q || params.formObject.q.length === 0) {
      alert("please provide some text for the query field!");
      return;
    }
    params.submitToParent(params.formObject);
  }

  function currentUserIsAdmin() {
    if (params.currentUser) {
      if (params.currentUser.user) {
        if (params.currentUser.user === "admin") {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <form
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#374151",
        backgroundColor: "#fafafa",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        maxWidth: "340px",
        margin: "0 auto",
      }}
    >
      <div
        className={currentUserIsAdmin() ? "visible" : "hidden"}
        style={{ border: "solid black 1px" }}
      >
        {/* Extra fields */}
        <div>
          <label htmlFor="language">Language: </label>
          <select
            id="language"
            name="language"
            value={params.formObject.language}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            {/* Add options for specific languages (e.g., en, es, fr) */}
          </select>
        </div>

        <div>
          <label htmlFor="pageSize">Page Size: </label>
          <input
            type="number"
            id="pageSize"
            name="pageSize"
            min={1}
            max={100}
            value={params.formObject.pageSize}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="queryName"
          style={{
            fontWeight: "600",
            color: "#1f2937",
            fontSize: "1em",
          }}
        >
          Query Name:
        </label>
        <input
          id="queryName"
          type="text"
          value={params.formObject.queryName}
          onChange={e =>
            params.setFormObject({
              ...params.formObject,
              queryName: e.target.value,
            })
          }
          style={{
            width: "100%",
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            fontSize: "0.95em",
            marginTop: "4px",
            fontFamily: "inherit",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="q"
          style={{
            fontWeight: "600",
            color: "#1f2937",
            fontSize: "1em",
          }}
        >
          Search Term:
        </label>
        <input
          id="q"
          type="text"
          value={params.formObject.q}
          onChange={e =>
            params.setFormObject({ ...params.formObject, q: e.target.value })
          }
          style={{
            width: "100%",
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            fontSize: "0.95em",
            marginTop: "4px",
            fontFamily: "inherit",
          }}
        />
      </div>
      <button
        type="button"
        onClick={() => params.submitToParent(params.formObject)}
        style={{
          backgroundColor: "#059669",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "8px 16px",
          fontSize: "1em",
          fontWeight: "500",
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "background-color 0.2s ease",
        }}
        onMouseOver={e => (e.target.style.backgroundColor = "#047857")}
        onMouseOut={e => (e.target.style.backgroundColor = "#059669")}
      >
        Submit
      </button>
    </form>
  );
}
