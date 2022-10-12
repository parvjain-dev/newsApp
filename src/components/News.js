// import PropTypes from 'prop-types'
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  // articles = [
  //   {
  //     source: { id: "cnn", name: "CNN" },
  //     author: "Rob Picheta",
  //     title:
  //       "Russian forces have staged illegal 'referendums' in Ukraine. What comes next? - CNN",
  //     description:
  //       'Pro-Russian authorities have held so-called referendums in four regions of Ukraine over recent days and, while the votes are illegal and have been universally dismissed as "a sham" by Ukraine and Western nations, there are fears that they could create a prete…',
  //     url: "https://www.cnn.com/2022/09/27/europe/ukraine-russia-referendum-explainer-intl/index.html",
  //     urlToImage:
  //       "https://media.cnn.com/api/v1/images/stellar/prod/220923082042-02-ukraine-referendum.jpg?q=w_800,c_fill",
  //     publishedAt: "2022-09-28T09:58:00Z",
  //     content:
  //       "Pro-Russian authorities have held so-called referendums in four regions of Ukraine over recent days and, while the votes are illegal and have been universally dismissed as a sham by Ukraine and Weste… [+10748 chars]",
  //   },
  //   {
  //     source: { id: "the-washington-post", name: "The Washington Post" },
  //     author: "Rachel Pannett, Sangam Prasai",
  //     title:
  //       "U.S. ski-climber Hilaree Nelson found dead after fall on Himalayan peak - The Washington Post",
  //     description:
  //       "The adventurer, who set records and climbed Mount Everest, fell near the summit of Manaslu, a peak in the Nepalese Himalayas.",
  //     url: "https://www.washingtonpost.com/world/2022/09/28/ski-mountaineer-missing-nepal-hilaree-nelson/",
  //     urlToImage:
  //       "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/SAFIS7B6FAI63DDOSODL27GYEY.jpg&w=1440",
  //     publishedAt: "2022-09-28T09:48:07Z",
  //     content:
  //       "Nepalese rescuers discovered the body of a well-known American ski-climber on Wednesday, two days after she went missing while skiing down the worlds eighth-highest peak in Nepal.\r\nHilaree Nelson, 49… [+3840 chars]",
  //   },
  // ];

  //proptypes

  static defaultProps = {
    country: "us",
    pagesize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
      this.setState({page:this.state.page+1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6e7f5f6fedb44570938a9c131812f94e&page=${ this.state.page + 1}&pageSize=${this.props.pagesize}`;
     let data = await fetch(url);
    let parsedData = await data.json();
    //here parseddata have json format data of url then we are setting state of articles and we are getting totalresults
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });

  };

   


  //capitalize function
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      //articles: this.articles,
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title =
      this.capitalizeFirstLetter(this.props.category) + "-by UpdateWithMe";
  }

  async componentDidMount() {
   this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6e7f5f6fedb44570938a9c131812f94e&page=1&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    this.props.setProgress(10);
    let parsedData = await data.json();
    

    //here parseddata have json format data of url then we are setting state of articles and we are getting totalresults
    this.setState({
      loading: false,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);

  }



  render() {
    //console.log("render");
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center">
            Top {this.capitalizeFirstLetter(this.props.category)} headlines
          </h1>


         {/* below spinner is for showing spinner in the starting */}
          {this.state.loading&& <Spinner/>}
          {/* WITH INFINITE SCROLL   */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!== this.state.totalResults}
            loader={<Spinner/>}
          >

          {/* below container-fluid is for horizontal bar is for scroll bar but still problem is not solved  */}
          <div className="container-fluid">
            <div className="row mx-auto m-auto">
            {this.state.articles.map((element,index) => {

return( 
         
 <div className="col-md-4" key = {index}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 30) : ""}
                      //below code not working because some places description is null so, not able to slice
                      // description={element.description.length()}
                      description={
                        element.description
                          ? element.description.slice(0, 50)
                          : ""
                      }
                      imgURL={element.urlToImage}
                      newsURL={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
              
                );
              })}
            </div>
            </div>
          </InfiniteScroll>


          
        </div>
      </>
    );
  }
}
