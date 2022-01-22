import React, { Component } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "../styles/style.css"
import PropTypes from 'prop-types'
import News from './newsItem'
import Spinner from './spinner'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
const NewsArea =()=> {
    const [news,setNews]=useState([]);
    const [pageNo,setPageNo]=useState(0);
    const [pageNoCount,setPageNoCount]=useState(0);
    const [pageLoading,setPageLoading]=useState(false);
    const [offset,setOffset]=useState(0);
    const [pageSize,setPageSize]=useState(0);
    let count = 1;
    const fetchData = async () => {
        let query = ''
        console.log(this.props.query)
        for (let item in this.props.query) {
            if (this.props.query.item !== null || this.props.item !== undefined)
                query += `&${item}=${this.props.query[item]}`
        }
        const apiKey = "e086bc34690a2ea1dc945ce24f17a6db"
        const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}${query}&offset=${offset}`
        console.log("This is the url : " + url)
        setPageLoading(true);
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        const data = response.data.data;
        console.log("This is the array");
        console.log(data);
        console.log("ComponentDidMount pageNo : " + pageNo)
        console.log("ComponentDidMount Offet : " + offset)
        setNews(data);
        setPageSize(response.data.pagination.total - (response.data.pagination.offset * 9));
        setPageLoading(false);
    }   
    useEffect(()=>{
        fetchData().then(() => { console.log("Data Fetched..")})   
    })
    const changePage = async (e) => {
        console.log("Hello Change Page")
        if (e.target.id === "back") {
            console.log("This is the Previous Button")
            console.log("this is state details : " + offset + " " + pageNo)
            //    await   this.setState(prev=>({
            //         offset: (prev.pageNo-1)*9,
            //         pageNo: (prev.pageNo-1),
            //         pageNoCount:prev.pageNoCount-1
            //     }))
            setPageNo((pageNo - 3));
            setOffset((pageNo - 3) * 9);
            setPageNoCount(pageNoCount - 3);
        }
        else if (e.target.id === "next") {
            console.log("This is the next button")
            console.log("Next button pg before update : ", pageNo)
            //     await  this.setState(prev=>({
            //     offset: (prev.pageNo+1)*9,
            //     pageNo: (prev.pageNo+1),
            //     pageNoCount:prev.pageNoCount+1
            // }))
            setPageNo(pageNo + 3);
            setOffset((pageNo + 3) * 9);
            setPageNoCount(pageNoCount + 3);

        }
        else {
            const pg = Number(e.target.innerText)
            console.log(pg)
            //     console.log((pg-1)*9)
            //    await this.setState(prev=>({
            //         offset:(pg-1)*9
            //     }))
            //     console.log("This is the Page No ID : "+pageNo,)
            setOffset((pg - 1) * 9);
        }
        console.log("Page No : " + pageNo);
        console.log("Offset No : " + offset)
        console.log("Page No Count : " + pageNoCount)
        this.fetchData().then(() => { console.log("Fetched after change page") })
    }

    
        return (
            <div className="container">
                <h3>General News</h3>

                <div className="row">
                    
                        {/* // below props only if you need pull down functionality
                        // refreshFunction={this.fetchData}
                        // pullDownToRefresh
                        // pullDownToRefreshThreshold={50}
                        // pullDownToRefreshContent={
                        //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                        // }
                        // releaseToRefreshContent={
                        //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                        // } */}
                        
                        {

                            pageLoading ? <Spinner /> : news.map((element) => {

                                return (<News author={element.author} title={element.title}
                                    description={element.description} url={element.url}
                                    source={element.source} image={element.image} category={element.category} language={element.language}
                                    country={element.country} publishedAt={element.published_at} key={count++} />)

                            })
                        }
                    


                </div>
                <div class="paginationBar">
                    <nav aria-label="Page navigation example" >
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                {
                                    pageNoCount > 2 && <button className="page-link" aria-label="Previous" onClick={this.changePage} id="back" >«
                                    </button>
                                }

                            </li>
                            <li className="page-item"><button className="page-link" onClick={this.changePage}>{pageNoCount + 1}</button></li>
                            <li className="page-item"><button className="page-link" onClick={this.changePage}>{pageNoCount + 2}</button></li>
                            <li className="page-item"><button className="page-link" onClick={this.changePage} id="lastPage">{pageNoCount + 3}</button></li>
                            <li className="page-item">
                                {
                                    pageSize > 0 && <button className="page-link" aria-label="Next" id="next" onClick={this.changePage} >
                                        »
                                    </button>
                                }

                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    
}
export default NewsArea;
