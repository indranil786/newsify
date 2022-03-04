
import React, { Component } from 'react'
import Navbar from './Components/navbar'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NewsArea from './Components/newsArea'

const App=()=>{ 
    return (
      <div>
        <Router>
        <Navbar />
        <h2 className="text-center m-2">Welcome to Newsify</h2>
        <Routes>
        <Route exact path="/" element={<NewsArea key="general" query={{categories:"general",languages:"en"}} />}></Route>
        <Route exact path="/business" element={<NewsArea key="business" query={{categories:"business",languages:"en"}} />}></Route>
        <Route exact path="/entertainment" element={<NewsArea key="entertainment" query={{categories:"entertainment",languages:"en"}} />}></Route>
        <Route exact path="/health" element={<NewsArea key="health" query={{categories:"health",languages:"en"}} />}></Route>
        <Route exact path="/science" element={<NewsArea key="science" query={{categories:"science",languages:"en"}} />}></Route>
        <Route exact path="/sports" element={<NewsArea key="sports" query={{categories:"sports",languages:"en"}} />}></Route>
        <Route exact path="/technology" element={<NewsArea key="technology" query={{categories:"technology",languages:"en"}} />}></Route>
        </Routes>
        </Router>
        
      </div>
    )
  
}
export default App;


