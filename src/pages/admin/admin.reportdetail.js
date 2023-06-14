import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default class ReportDetail extends Component {
    constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			title: {
				text: "Total Voucher"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: this.props.quanti
			}]
		}
        const optionsCustomer = {
			animationEnabled: true,
			title: {
				text: "Customer Total"
			},
			subtitles: [{
				text: `${this.props.customer} `,
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				dataPoints: [
					{ name: "Customer Total", y: this.props.customer }
					
				]
			}]
		}
        const optionThree = {
			animationEnabled: true,
			title:{
				text: "All Voucher"
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
					fontSize: 16,
					itemclick: this.toggleDataSeries
			},
			toolTip: {
				shared: true
			},
			data: [
					
			{
				type: "stackedColumn100",
				name: "Balance",
				showInLegend: true,
				color: "#CD7F32",
				dataPoints: this.props.balan
			},
			{
				type: "stackedColumn100",
				name: "Use",
				showInLegend: true,
				color: "green",
				dataPoints: this.props.use
			}
			
			]
		}
		return (
		<div>
            <Row>
                <Col>
                <CanvasJSChart options = {options}
				
			/>
                </Col>
                <Col>
                <CanvasJSChart options = {optionsCustomer}
				/* onRef={ref => this.chart = ref} */
			/>
                </Col>
            </Row>
            <Row>
                <Col>
                <CanvasJSChart options = {optionThree}
				
                />
                </Col>
            
            </Row>
			
            
           
			
		</div>
		);
	}
}
