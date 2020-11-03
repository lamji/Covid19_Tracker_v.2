import { Line } from 'react-chartjs-2';

export default function linetChart({cases, criticals, deaths, recoveries, active}){
	return (
		<Line data={{
			datasets: [{
				label: `Data`,
				data: [cases, criticals, deaths, recoveries, active],
				backgroundColor: ["blue", "orange", "red", "green", "yellow"]
			}],
			labels: ["Cases", "Criticals", "Deaths", "Recoveries", "Active"]
		}} redraw={false}/>
	)
}

