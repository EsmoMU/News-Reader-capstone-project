import { NewsReader } from "./NewsReader";
import "./App.css";

function App() {
  return (
    <div>
      <header
        style={{
          textAlign: "center",
          backgroundColor: "#f3f4f6",
          padding: "18px 0",
          marginBottom: "18px",
          borderBottom: "1.5px solid #e0e0e0",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "1.3em",
            fontWeight: 600,
            color: "#1f2937",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          News Reader App
        </p>
      </header>
      <NewsReader />
    </div>
  );
}

export default App;
