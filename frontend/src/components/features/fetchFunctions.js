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

export function fetchSendMessage(channelId, messageData) {
  return fetch(`/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(messageData)
  })
  .then((r) => {
    if (r.ok) {
      return console.log("sent succesfully");
    } else {
      throw new Error("Unable to send a message");
    }
  })
  .catch((error) => {
    throw error;
  });
}

export function fetchChannelSearch(name) {
  return fetch(`/find_channel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name[0] === "#" ? {"invitekey": name} : {"name": name})
  })
  .then((r) => {
    if (r.ok) {
      return r.json();
    } else {
      throw new Error("Unable to search channels");
    }
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });
}
  