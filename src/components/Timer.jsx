import { useState, useEffect } from "react";

export default function Timer({time}) {
    const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{"display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "maxheight":"70px"}}>
        <div style={{ "display": "inline-block",
                "textAlign": "center",
                "height":"0px" }}>
            <p style={{fontSize:"35px"}}>{formatTime(time)}</p>
        </div>
    </div>
  );
}
