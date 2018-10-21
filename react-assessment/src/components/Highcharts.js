import React, { Component } from 'react';

var Highcharts = require('highcharts');
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

class HighchartsComponent extends Component {

    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.JSX = <input type="text" ref={this.containerRef}></input>;
    }

    componentDidMount() {
        console.log(this.JSX);
        console.log(this.JSX.id);
        console.log(this.containerRef.current);
        console.log(this.containerRef.current.id);
    }

    setFocus = () => {
        this.containerRef.current.focus();
    }

    render() {
        return <div>
            <div onClick={this.setFocus}>Highcharts</div>
            {this.JSX}
        </div>
    }

}

export default HighchartsComponent;