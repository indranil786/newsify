import React, { Component } from 'react'
import '../styles/newsItem.css'
const News=(props)=> {

  const nullImage = `https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png`

    return (
      <div className="news-area col-md-4 d-flex justify-content-center my-2">
        <div className="card cardItem">
        <span className="badge bg-danger rounded-pill sourcesBadge">Sources : {props.source.length<30?props.source:props.source.slice(0,30) + "..."}</span>
          <img src={props.image ?? nullImage} className="card-img-top img-fluid newsImage"  alt="..." />
          <div className="card-body">
            <h5 className="card-title">{(props.title.slice(0,45) + "...") || "Title Not Available"}</h5>
            <p className="card-text">{(props.description.slice(0, 150) + "...") || "Description Not Available"}</p>
            <p className="card-text"><span className="badge bg-secondary">Category : {props.category}</span> <span className="badge bg-warning text-dark">Published at : {props.publishedAt.slice(0,10).split("-").reverse().join('/')}</span></p>
          </div>
          <div className="card-footer"><div className="d-grid align-self-end"><a href={props.url} target="_blank" className="btn btn-success ">Read More</a></div></div> 

        </div>
      </div>
    )
  
}
export default News;