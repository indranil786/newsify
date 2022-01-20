import React, { Component } from 'react'

const News=(props)=> {

  const nullImage = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Y9Zotnj66rHpLMD-_0xvkOsEd9J5WpoqJw2Q6bu4fl4UDgG4e1ewNR7M5yGrv8ToQsY&usqp=CAU`

    return (
      <div className="news-area col-md-4 d-flex justify-content-center">
        <div className="card" style={{ width: '18rem' }}>
          <img src={props.image || nullImage} className="card-img-top img-fluid" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{(props.title.slice(0, 81) + "...") || "Title Not Available"}</h5>
            <p className="card-text">{(props.description.slice(0, 150) + "...") || "Description Not Available"}</p>
            <p className="card-text"><small className="text-muted">Sources : {props.source}</small></p>
            <p className="card-text"><small className="text-muted">Category : {props.category}</small></p>
            <p className="card-text"><small className="text-muted">Published at : {props.publishedAt}</small></p>
            <a href={props.url} className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  
}
export default News;