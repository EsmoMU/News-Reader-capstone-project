import { QueryForm } from "./QueryForm";
import { LoginForm } from "./LoginForm";
import { SavedQueries } from "./SavedQueries";
import { Articles } from "./Articles";
import { useState, useEffect } from "react";
import { exampleQuery, exampleData } from "./data";

export function NewsReader() {
  const [currentUser, setCurrentUser] = useState(null);
  const [credentials, setCredentials] = useState({ user: "", password: "" });
  const [savedQueries, setSavedQueries] = useState([{ ...exampleQuery }]);
  const [query, setQuery] = useState(exampleQuery); // latest query send to newsapi
  const [data, setData] = useState(exampleData); // current data returned from newsapi
  const [queryFormObject, setQueryFormObject] = useState({ ...exampleQuery });

  const urlNews = "/news";
  const urlQueries = "/queries";
  const urlUsersAuth = "/users/authenticate";
  const cannedQueries = [
    {
      queryName: "Top Headlines",
      q: "headlines",
      language: "en",
      pageSize: 10,
    },
    { queryName: "Tech News", q: "technology", language: "en", pageSize: 10 },
    // Add more canned queries as needed
  ];

  useEffect(() => {
    getNews(query);
  }, [query]);

  useEffect(() => {
    getQueryList();
  }, []);

  async function getQueryList() {
    try {
      const response = await fetch(urlQueries);
      if (response.ok) {
        const data = await response.json();
        console.log("savedQueries has been retrieved: ");
        setSavedQueries(data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  async function login() {
    if (currentUser !== null) {
      // logout
      setCurrentUser(null);
    } else {
      // login
      try {
        const response = await fetch(urlUsersAuth, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (response.status === 200) {
          setCurrentUser({ ...credentials });
          setCredentials({ user: "", password: "" });
        } else {
          alert("Error during authentication! ");
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        setCurrentUser(null);
      }
    }
  }

  async function saveQueryList(savedQueries) {
    try {
      const response = await fetch(urlQueries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedQueries),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("savedQueries array has been persisted:");
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  function onSavedQuerySelect(selectedQuery) {
    setQueryFormObject(selectedQuery);
    setQuery(selectedQuery);
  }

  function resetSavedQueries() {
    const confirmReset = window.confirm(
      "Are you sure you want to erase the list?"
    );
    if (confirmReset) {
      const resetList = [{ ...exampleQuery }];
      saveQueryList(resetList);
      setSavedQueries(resetList);
    }
  }

  function currentUserMatches(user) {
    if (currentUser) {
      if (currentUser.user) {
        if (currentUser.user === user) {
          return true;
        }
      }
    }
    return false;
  }

  function onFormSubmit(queryObject) {
    if (currentUser === null) {
      alert("Log in if you want to create new queries!");
      return;
    }
    if (savedQueries.length >= 3 && currentUserMatches("guest")) {
      alert(
        "guest users cannot submit new queries once saved query count is 3 or greater!"
      );
      return;
    }

    let newSavedQueries = [];
    newSavedQueries.push(queryObject);
    for (let query of savedQueries) {
      if (query.queryName !== queryObject.queryName) {
        newSavedQueries.push(query);
      }
    }
    console.log(JSON.stringify(newSavedQueries));
    saveQueryList(newSavedQueries);
    setSavedQueries(newSavedQueries);
    setQuery(queryObject);
  }

  async function getNews(queryObject) {
    if (queryObject.q) {
      try {
        const response = await fetch(urlNews, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(queryObject),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    } else {
      setData({});
    }
  }

  // Choose which query list to show
  const queryList = currentUser ? savedQueries : cannedQueries;

  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <div>
        <LoginForm
          login={login}
          credentials={credentials}
          currentUser={currentUser}
          setCredentials={setCredentials}
        />
      </div>
      <div>
        <section
          className="parent"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            justifyContent: "center",
            marginTop: "18px",
          }}
        >
          <div
            className="box"
            style={{
              backgroundColor: "#fafafa",
              borderRadius: "10px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              padding: "16px",
              minWidth: "340px",
            }}
          >
            <span
              className="title"
              style={{
                fontSize: "1.15em",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "8px",
                display: "block",
                fontFamily: "inherit",
              }}
            >
              Query Form
            </span>
            {/* Only show QueryForm if user is logged in */}
            {currentUser && (
              <QueryForm
                currentUser={currentUser}
                setFormObject={setQueryFormObject}
                formObject={queryFormObject}
                submitToParent={onFormSubmit}
              />
            )}
          </div>
          <div
            className="box"
            style={{
              backgroundColor: "#fafafa",
              borderRadius: "10px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              padding: "16px",
              minWidth: "340px",
            }}
          >
            <span
              className="title"
              style={{
                fontSize: "1.15em",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "8px",
                display: "block",
                fontFamily: "inherit",
              }}
            >
              Saved Queries
            </span>
            <SavedQueries
              savedQueries={queryList}
              selectedQueryName={query.queryName}
              onQuerySelect={onSavedQuerySelect}
              onReset={resetSavedQueries}
              currentUser={currentUser}
            />
          </div>
          <div
            className="box"
            style={{
              backgroundColor: "#fafafa",
              borderRadius: "10px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              padding: "16px",
              minWidth: "340px",
            }}
          >
            <span
              className="title"
              style={{
                fontSize: "1.15em",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "8px",
                display: "block",
                fontFamily: "inherit",
              }}
            >
              Articles List
            </span>
            <Articles query={query} data={data} />
          </div>
        </section>
      </div>
    </div>
  );
}
