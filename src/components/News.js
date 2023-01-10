// import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
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
 //removing constructor
  //initial states
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
 

//capitalize function
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};




  //alternative of componentDidMount is use Effect

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pagesize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(10);
    let parsedData = await data.json();

    //here parseddata have json format data of url then we are setting state of articles and we are getting totalresults
    setarticles(parsedData.articles);
    
    settotalResults(parsedData.totalResults);
    setloading(false);
    props.setProgress(100);
  };

  useEffect(() => {
      // document.title =this.capitalizeFirstLetter(props.category) + "-by UpdateWithMe";
    updateNews();
  },[]);


  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    //  this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apikey}&page=${
      page + 1
    }&pageSize=${props.pagesize}`
    setpage(page+1) 
    let data = await fetch(url);
    let parsedData = await data.json()
    //here parseddata have json format data of url then we are setting state of articles and we are getting totalresults
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };

 

  


  //console.log("render");
  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">
          Top {capitalizeFirstLetter(props.category)} headlines
        </h1>

        {/* below spinner is for showing spinner in the starting */}
        {loading && <Spinner />}
        {/* WITH INFINITE SCROLL   */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          {/* below container-fluid is for horizontal bar is for scroll bar but still problem is not solved  */}
          <div className="container-fluid">
            <div className="row mx-auto m-auto">
              {articles.map((element, index) => {
                return (
                  <div className="col-md-4" key={index}>
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
};

//proptypes

News.defaultProps = {
  country: "us",
  pagesize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
