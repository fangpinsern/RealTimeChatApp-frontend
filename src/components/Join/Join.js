import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [hasInitialRoom, setHasInitialRoom] = useState(false);

  useEffect(() => {
    const { room } = queryString.parse(location.search);

    console.log(room);
    if (room) {
      setRoom(room);
      setHasInitialRoom(true);
    }
  }, [location.search]);

  const joinNewRoom = (event) => {
    setHasInitialRoom(false);
    setRoom("");
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
            disabled={hasInitialRoom}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
        {hasInitialRoom && (
          <Link onClick={joinNewRoom} to={`/`}>
            <button className="button mt-20" type="submit">
              Join Other Room
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Join;
