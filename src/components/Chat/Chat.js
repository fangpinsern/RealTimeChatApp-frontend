import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    console.log(socket);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        setHasError(true);
      }
    });

    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setRoomUsers(users);
    });
  }, [messages]);

  // function for sending messages

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  console.log(message, messages);

  return hasError ? (
    <div className="outerContainer">
      <div className="container">
        <a href="/">
          <button>Back</button>
        </a>
      </div>
      <TextContainer users={roomUsers} />
    </div>
  ) : (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          sendMessage={sendMessage}
          message={message}
          setMessage={setMessage}
        />
      </div>
      <TextContainer users={roomUsers} room={room} />
    </div>
  );
};

export default Chat;
