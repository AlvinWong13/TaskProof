import React, {Component} from 'react';

import Calendar from "../Calendar/Calendar";

// import "/Home.css";

function Home() {
  return(
    <div className="Home">
    <header>
      <div id="logo">
        <span className="icon">date_range</span>
        <span>
          react<b>calendar</b>
        </span>
      </div>
    </header>
    <main>
      <Calendar />
    </main>
  </div>
  )
}

export default Home;