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

export function fetchChannels() {
  return fetch("/channels", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        throw new Error("Unable to load Channels");
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchLogout() {
  return fetch("/logout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        throw new Error("Unable to logout");
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchAvatar(formData) {
  return fetch("/avatars", {
    method: "POST",
    body: formData
  })
  .then((r) => {
    if (r.ok) {
      return r.json();
    } else {
      throw new Error("Unable to load avatar");
    }
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });
}
  