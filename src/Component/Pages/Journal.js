import React, { useState } from "react";

function Journal() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="home"> 
      <div className="header">
        <div className="logo1"></div>
      </div>
      <div className="about">
        <h2>Write a Review</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent form submission just for now
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <textarea
                value={inputValue}
                onChange={handleChange}
                placeholder="Write your review here ..."
                style={{
                  flexGrow: 1,
                  padding: "10px", 
                  fontSize: "large",
                  fontFamily: "Alike",
                  borderRadius: "10px", 
                  border: "1px solid black", 
                  backgroundColor: "#D9D9D9", 
                  color: "black", 
                  marginRight: "0px", 
                  minHeight: "15rem", 
                  minWidth: "20rem",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#D9D9D9",
                  border: "1px solid black",
                  cursor: "pointer",
                  justifyContent: "right",
                  width: "fit-content",
                  padding: "5px 10px", 
                  marginTop: "5px",
                  height: "fit-content",
                  fontSize: "large",
                }}
              >
                submit
              </button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Journal;
