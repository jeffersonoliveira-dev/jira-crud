"use client";

import { ToastContainer } from "react-toastify";
import Edit from "./components/edit/edit";
import { useState } from "react";
import { Create } from "./components/create/create";

export default function Home() {
  const [nav, setNav] = useState("edit");

  const handleNav = (type: "edit" | "create") => () => {
    setNav(type);
  };

  return (
    <div>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <li style={{ listStyle: "none" }}>
          <button
            style={{
              backgroundColor: nav === "edit" ? "darkblue" : "blue",
              color: "white",
              border: "none",
              padding: "0.5rem",
            }}
            onClick={handleNav("edit")}
          >
            JIRA EDIT
          </button>
        </li>
        <li style={{ listStyle: "none" }}>
          <button
            style={{
              backgroundColor: nav === "create" ? "darkblue" : "blue",
              color: "white",
              border: "none",
              padding: "0.5rem",
            }}
            onClick={handleNav("create")}
          >
            JIRA CREATE
          </button>
        </li>
      </ul>
      {nav === "edit" ? <Edit /> : <Create />}
      <ToastContainer />
    </div>
  );
}
