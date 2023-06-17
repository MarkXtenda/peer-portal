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
    // headers: { 'content-type': 'multipart/form-data' },
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

export function fetchMessages(channelId) {
  return fetch("/channel_messages", {
    method: "POST",
    body: JSON.stringify({"channel_id": channelId}),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json()).then(data=>{return data})
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchSendMessage(channelId, messageData) {
  return fetch(`/channels/${channelId}/messages`, {
    method: "POST",
    body: messageData
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
  
export function fetchDeleteChannel(channelId) {
  const id = channelId
  return fetch(`/channels/${channelId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => {
      if (r.ok) {
        return id;
      } else {
        throw new Error("Unable to delete the channel");
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchUpdateChannel(channelId, channelData) {
  console.log(channelData)
  return fetch(`/channels/${channelId}`, {
    method: "PATCH",
    body: channelData
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Unable to update the channel");
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchCreateChannel(channelData) {
  return fetch("/channels", {
    method: "POST",
    body: channelData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Unable to create the channel");
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchRemoveUser(userId, channelId) {
  return fetch(`/members/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      channel_id: channelId
    })
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        throw new Error("Unable to remove the user");
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchJoinChannel(userId, channelId) {
  return fetch(`/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      channel_id: channelId
    })
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        throw new Error("Unable to add the user");
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchOneChannel(channelId) {
  return fetch(`/channels/${channelId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        throw new Error("Unable to load Channel");
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
