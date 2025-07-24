export function LoginForm(params) {
  const handleChange = event => {
    let newCredentials = { ...params.credentials };
    newCredentials[event.target.name] = event.target.value;
    params.setCredentials(newCredentials);
  };

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
        maxWidth: "320px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <label
          htmlFor="user"
          style={{
            fontWeight: "600",
            color: "#1f2937",
            fontSize: "1em",
          }}
        >
          Username:
        </label>
        <input
          id="user"
          type="text"
          value={params.credentials.user}
          onChange={e =>
            params.setCredentials({
              ...params.credentials,
              user: e.target.value,
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
          htmlFor="password"
          style={{
            fontWeight: "600",
            color: "#1f2937",
            fontSize: "1em",
          }}
        >
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={params.credentials.password}
          onChange={e =>
            params.setCredentials({
              ...params.credentials,
              password: e.target.value,
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
      <button
        type="button"
        onClick={params.login}
        style={{
          backgroundColor: "#2563eb",
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
        onMouseOver={e => (e.target.style.backgroundColor = "#1d4ed8")}
        onMouseOut={e => (e.target.style.backgroundColor = "#2563eb")}
      >
        {params.currentUser ? "Logout" : "Login"}
      </button>
    </form>
  );
}
