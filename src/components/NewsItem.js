// import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

export default class NewsItem extends PureComponent {
  static propTypes = {}

  render() {
    //this is use to get title and description dynamically
    let {title,description,imgURL, newsURL ,author,publishedAt,source} = this.props;
 
    return (
      <div className='m-4  ' >
        {/* <div className="card">
  <img src={imgURL} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
    <div className="container my-3 mx-auto">
          <div className="d-flex justify-content-between">
           <h5>Author: </h5> <p>{author}</p> 
           <h5>Published At: </h5> <p>{publishedAt}</p>  
            
          </div>
        </div>
  </div>
</div> */}
<div className="card h-100">
      <img src={imgURL} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title} <span className ="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>
  {source}
  </span>
</h5>
        <p className="card-text">{description}</p>
        <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
      </div>
      <div className="card-footer">
        <small className="text-muted">By {!author?"Unknown" : author} on {new Date(publishedAt).toUTCString()}</small>
      </div>
    </div>

      </div>
    )
  }
}
