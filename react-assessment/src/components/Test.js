import React from "react";
import ReactDOM from "react-dom";

import './TestStyle.css';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            list: []
        };
        this.refsDiv = [];
        for (let i = 0; i < 20; i++) {
            this.state.list.push(i);
            this.refsDiv.push(React.createRef());
        }
    }
    handleClick = event => {
        var index = parseInt(this.state.value);
        if (0 <= index && index < this.state.list.length) {
            var x = ReactDOM.findDOMNode(
                this.refsDiv[index].current
            );
            x.scrollIntoView();
        } else {
            alert("Error: Input should between 0 and " + this.state.list.length);
        }
    }
    handleChange = event => {
        this.setState({ value: event.target.value });
    }
    componentWillUnmount() {
        localStorage.setItem('asd', 'sdf');
    }
    render() {
        return (
            <div className="App">
                <div className="inputDiv">
                    <input
                        type="input"
                        className="input"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <button
                        className='inputBtn'
                        onClick={this.handleClick}
                    >Go</button>
                </div>
                {this.state.list.map((item, index) => {
                    return (
                        <div key={index} ref={this.refsDiv[index]} className="listDiv">
                            {item}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Test;