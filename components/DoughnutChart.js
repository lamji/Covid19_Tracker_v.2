import { Line } from 'react-chartjs-2';

export default function DoughnutChart({cases, criticals, deaths, recoveries, updated, active}){
	return (
		<Line data={{
			datasets: [{
				label: `Updated as ${updated}`,
				data: [cases, criticals, deaths, recoveries, active],
				backgroundColor: ["blue", "orange", "red", "green", "yellow"]
			}],
			labels: ["Cases", "Criticals", "Deaths", "Recoveries", "Active"]
		}} redraw={false}/>
	)
}

