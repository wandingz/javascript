import React, { Component } from 'react';

class OpeningCraw extends Component {

    render() {
        return <div className="component-OpeningCraw">
            <div className='title' >{this.props.film.title}</div>
            <div className='opening_crawl' >
                <div className="oc_text" >
                    {this.props.film.opening_crawl}
                </div>
            </div>
            <div className='director' >{this.props.film.director}</div>
            <div className='producer' >{this.props.film.producer}</div>
            <div className='release_date' >{this.props.film.release_date}</div>
        </div>
    }

}

export default OpeningCraw;