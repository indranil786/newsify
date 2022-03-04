import React, { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/style.css";
import PropTypes from "prop-types";
import News from "./newsItem";
import Spinner from "./spinner";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
const NewsArea = (props) => {
  let [news, setNews] = useState([]);
  let [newsLength,setNewsLength]= useState(news.length);
  let [offset, setOffset] = useState(1);
  let [totalPageSize, setTotalPageSize] = useState(0);
  let [loader,setLoader]=useState(false);
  let count = 1;
  let m=0;
  const fetchData = async () => {
    let query = "";
    for (let item in props.query) {
      if (props.query.item !== null || props.item !== undefined)
        query += `&${item}=${props.query[item]}`;
    }
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}${query}&offset=${offset}&limit=9`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = (response.data.data);
    setTotalPageSize(response.data.pagination.total);
    return data;
  };
  useEffect(() => {
    document.title = `Newsify-${props.query.categories}`;
    setLoader(true);
    fetchData().then((data) => {
      setNews(data);
      setNewsLength(news.length);
      setLoader(false)
    });
  }, []);
  const changePage = async () => {
    setOffset(offset + 9);
    // fetchData().then((data) => {
    //   setNews(news.concat(data));
    //   console.log("After sroll");
    //   console.log(news);
    //   setNewsLength(news.length);
    //   console.log("Data Fetched..");
    // });
    let query = "";
    for (let item in props.query) {
      if (props.query.item !== null || props.item !== undefined)
        query += `&${item}=${props.query[item]}`;
    }
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}${query}&offset=${offset+9}&limit=9`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = (response.data.data);
    setNews(news.concat(data));
     setNewsLength(news.length);
  };
  return (
    <div className="container" style={{overflow:"hidden",width:"100%"}}>
      
      <h3 className='text-center'>{props.query.categories.slice(0,1).toUpperCase()+props.query.categories.slice(1)} News</h3>
      <>
      { loader?<Spinner height={200} width={200}/> : <InfiniteScroll
          dataLength={news.length} //This is important field to render the next data
          next={changePage}
          hasMore={newsLength<totalPageSize}
          loader={<Spinner height={100} width={100}/>}
          endMessage={<h1>End of News</h1>}
          style={{overflow:"hidden",width:"100%"}}
        >
          <div className="row">
            {news.map((element) => {
              return (
                <News
                  author={element.author}
                  title={element.title}
                  description={element.description}
                  url={element.url}
                  source={element.source}
                  image={element.image}
                  category={element.category}
                  language={element.language}
                  country={element.country}
                  publishedAt={element.published_at}
                  key={count++}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      }
     </>
    </div>
  );
};
export default NewsArea;
