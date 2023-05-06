import React from "react";

export function fetchLogin(email, password) {
    return fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Unable to login");
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
  