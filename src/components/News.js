// import PropTypes from 'prop-types'
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
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
  //   {
  //     source: { id: null, name: "GamesRadar+" },
  //     author: "Dustin Bailey",
  //     title:
  //       "Hugh Jackman returning as Wolverine in Deadpool 3 as release date confirmed - Gamesradar",
  //     description: "Wolverine is coming to the MCU",
  //     url: "https://www.gamesradar.com/deadpool-3-release-date/",
  //     urlToImage:
  //       "https://cdn.mos.cms.futurecdn.net/qQGkgyAEHXGXrWGpxQB2DD-1200-80.jpg",
  //     publishedAt: "2022-09-28T08:53:01Z",
  //     content:
  //       "Deadpool 3 has been officially announced and Hugh Jackman is back as Wolverine. The actor last appeared as the X-Man in Logan, which was thought to be his last appearance as the clawed hero. Now, Wol… [+1688 chars]",
  //   },
  // ];

  //proptypes

  static defaultProps={
    country:'us',
    pagesize:6,
    category:'general'
  }
  static propTypes={
    country: PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string
  }

  //capitalize function
  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      //articles: this.articles,
      articles: [],
      loading: false,
      page: 1,
       
    }
    document.title = this.capitalizeFirstLetter(this.props.category)+"-by UpdateWithMe";
  }

  async componentDidMount() {
    // console.log("mount render");
    {this.setState({loading:true})};
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6e7f5f6fedb44570938a9c131812f94e&page=1&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
   // console.log(parsedData);

    //here parseddata have json format data of url then we are setting state of articles and we are getting totalresults 
    this.setState({loading:false, articles: parsedData.articles,totalResults:parsedData.totalResults });
  }

  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6e7f5f6fedb44570938a9c131812f94e&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
    {this.setState({loading:true})};
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);  
    this.setState({
      loading:false,
        page: this.state.page - 1,
        articles: parsedData.articles
    })
    
  };
  handleNextclick = async () => {
    
    //handling if articles are over
    if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)){

   }
      else{

       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6e7f5f6fedb44570938a9c131812f94e&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
       {this.setState({loading:true})};
       let data = await fetch(url);
       let parsedData = await data.json()
      //  console.log(parsedData);  

       this.setState({
        loading:false,
           page: this.state.page + 1,
           articles: parsedData.articles
       })
      }

    
  };

  render() {
    //console.log("render");
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center">Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>

          {/* if loading is ture then show spinner  */}
         {this.state.loading&& <Spinner/>}
          <div className="row mx-auto m-auto">
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title?element.title.slice(0,30):""}
                    //below code not working because some places description is null so, not able to slice
                    // description={element.description.length()}
                    description={
                      element.description?element.description.slice(0,50):""
                    }
                    imgURL={element.urlToImage}
                    newsURL={element.url}
                    author = {element.author}
                    publishedAt={element.publishedAt}
                    source = {element.source.name}
                  />
                </div>
              );
            })}
          </div>
        <div className="container my-3 mx-auto">
          <div className="d-flex justify-content-between">
            <button
            disabled={this.state.page<=1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevious}
            >
            &larr;  Previous Page
            </button>
            <button
            //next btn disable is not working
            disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)}
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextclick}
            >
              Next Page &rarr;
            </button>
          </div>
        </div>
        </div>
      </>
    );
  }
}
