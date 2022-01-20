import React, { Component } from 'react'
import { useState } from 'react'
import "../styles/style.css"
import PropTypes from 'prop-types'
import News from './newsItem'
import Spinner from './spinner'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
export default class NewsArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            offset: 0,
            pageSize: 0,
            pageNo: 0,
            pageNoCount: 0,
            pageLoading: false
        }
        this.count = 1;
    }
    fetchData = async () => {
        let query = ''
        console.log(this.props.query)
        for (let item in this.props.query) {
            if (this.props.query.item !== null || this.props.item !== undefined)
                query += `&${item}=${this.props.query[item]}`
        }
        const apiKey = "e086bc34690a2ea1dc945ce24f17a6db"
        const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}${query}&offset=${this.state.offset}`
        console.log("This is the url : " + url)
        this.setState({
            pageLoading: true
        })

        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        const data = response.data.data;
        console.log("This is the array");
        console.log(data);
        console.log("ComponentDidMount pageNo : " + this.state.pageNo)
        console.log("ComponentDidMount Offet : " + this.state.offset)

        this.setState({
            news:data,
            pageSize: response.data.pagination.total - (response.data.pagination.offset * 9),
            pageLoading: false
        })
    }
    componentDidMount() {
        this.fetchData().then(() => { console.log("Data Fetched..") })

    }
    changePage = async (e) => {
        console.log("Hello Change Page")
        if (e.target.id === "back") {
            console.log("This is the Previous Button")
            console.log("this is state details : " + this.state.offset + " " + this.state.pageNo)
            //    await   this.setState(prev=>({
            //         offset: (prev.pageNo-1)*9,
            //         pageNo: (prev.pageNo-1),
            //         pageNoCount:prev.pageNoCount-1
            //     }))
            await this.setState(prev => ({
                pageNo: (prev.pageNo - 3),
                offset: (prev.pageNo - 3) * 9,
                pageNoCount: prev.pageNoCount - 3
            }))
        }
        else if (e.target.id === "next") {
            console.log("This is the next button")
            console.log("Next button pg before update : ", this.state.pageNo)
            //     await  this.setState(prev=>({
            //     offset: (prev.pageNo+1)*9,
            //     pageNo: (prev.pageNo+1),
            //     pageNoCount:prev.pageNoCount+1
            // }))
            await this.setState(prev => ({
                pageNo: prev.pageNo + 3,
                offset: (prev.pageNo + 3) * 9,
                pageNoCount: prev.pageNoCount + 3
            }))


        }
        else {
            const pg = Number(e.target.innerText)
            console.log(pg)
            //     console.log((pg-1)*9)
            //    await this.setState(prev=>({
            //         offset:(pg-1)*9
            //     }))
            //     console.log("This is the Page No ID : "+this.state.pageNo,)
            await this.setState(prev => ({
                offset: (pg - 1) * 9
            }))
        }
        console.log("Page No : " + this.state.pageNo);
        console.log("Offset No : " + this.state.offset)
        console.log("Page No Count : " + this.state.pageNoCount)
        this.fetchData().then(() => { console.log("Fetched after change page") })
    }

    render() {
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

                            this.state.pageLoading ? <Spinner /> : this.state.news.map((element) => {

                                return (<News author={element.author} title={element.title}
                                    description={element.description} url={element.url}
                                    source={element.source} image={element.image} category={element.category} language={element.language}
                                    country={element.country} publishedAt={element.published_at} key={this.count++} />)

                            })
                        }
                    


                </div>
                <div class="paginationBar">
                    <nav aria-label="Page navigation example" >
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                {
                                    this.state.pageNoCount > 2 && <button className="page-link" aria-label="Previous" onClick={this.changePage} id="back" >«
                                    </button>
                                }

                            </li>
                            <li className="page-item"><button className="page-link" onClick={this.changePage}>{this.state.pageNoCount + 1}</button></li>
                            <li className="page-item"><button className="page-link" onClick={this.changePage}>{this.state.pageNoCount + 2}</button></li>
                            <li className="page-item"><button className="page-link" onClick={this.changePage} id="lastPage">{this.state.pageNoCount + 3}</button></li>
                            <li className="page-item">
                                {
                                    this.state.pageSize > 0 && <button className="page-link" aria-label="Next" id="next" onClick={this.changePage} >
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
}
