
import React, { Component } from 'react'
import Navbar from './Components/navbar'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NewsArea from './Components/newsArea'

const App=()=>{ 
    return (
      <div>
        <Router>
        <Navbar />
        <h2 className="text-center m-2">Welcome to News App</h2>
        <Routes>
        <Route exact path="/" element={<NewsArea key="general" query={{categories:"general",countries:"in",languages:"en"}} />}></Route>
        <Route exact path="/business" element={<NewsArea key="business" query={{categories:"business",countries:"in",languages:"en"}} />}></Route>
        <Route exact path="/entertainment" element={<NewsArea key="entertainment" query={{categories:"entertainment",countries:"in",languages:"en"}} />}></Route>
        <Route exact path="/health" element={<NewsArea key="health" query={{categories:"health",countries:"in",languages:"en"}} />}></Route>
        <Route exact path="/science" element={<NewsArea key="science" query={{categories:"science",countries:"in",languages:"en"}} />}></Route>
        <Route exact path="/sports" element={<NewsArea key="sports" query={{categories:"sports",countries:"in",languages:"en"}} />}></Route>
        <Route exact path="/technology" element={<NewsArea key="technology" query={{categories:"technology",countries:"in",languages:"en"}} />}></Route>
        <Route exact path="/hello" element={<div>Helloo</div>}/>
        </Routes>
        </Router>
        
      </div>
    )
  
}
export default App;


