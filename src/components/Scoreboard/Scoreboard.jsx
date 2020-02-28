import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Form, Button, Container } from 'react-bootstrap';
import './Scoreboard.css';

const Scoreboard = props => {
	const [idCounter, setIdCounter] = useState(0);
	const [scoreBoardTableData, setScoreBoardTableData] = useState([]);
	const [playerName, setPlayerName] = useState('');
	const [playerPoints, setPlayerPoints] = useState();

	useEffect(() => {
		console.log('Updating! ' + playerName);
	}, [idCounter]);

	/*
	* Data columns for Bootstrap Table - react-bootstrap-table2
	*/
	const columns = [
		{
			dataField: 'id',
			text: 'ID',
			hidden: true,
		},
		{
			dataField: 'playerName',
			text: 'Name',
			sort: true,
		},
		{
			dataField: 'playerPoints',
			text: 'Points',
			sort: true,
		},
	];
	const defaultSorted = [
		{
			dataField: 'playerPoints',
			order: 'desc',
		},
	];
	/*
	 *	Add name and points to table
	 */
	function addToTable() {
		console.log('UPDATING addToTable');
		if (playerName.length >= 1 && playerPoints >= 1) {
			setIdCounter(idCounter + 1);
			const list = { id: idCounter, playerName: playerName, playerPoints: playerPoints };
			scoreBoardTableData.push(list);
		}
	}

	return (
		<Container fluid>
			<div className="ScoreBoard">
				<div className={'Table'}>
					<BootstrapTable
						keyField="id"
						isKey={true}
						data={scoreBoardTableData}
						columns={columns}
						striped
						hoves
						defaultSorted={defaultSorted}
					></BootstrapTable>
				</div>

				
				<div className="FormStyleContainer">
					<Form className="Form">
						<Form.Group className="Form" controlId="Points">
							<Form.Control
								className="InputPlayerName"
								type="text"
								onChange={e => setPlayerName(e.target.value)}
								placeholder="Enter name"
							/>
							<Form.Control
								className="InputPlayerPoints"
								type="number"
								onChange={e => setPlayerPoints(e.target.value)}
								placeholder="Enter points"
							/>
							<Container className="ButtonContainer">
								<Button onClick={e => addToTable()} className="AddButton" variant="primary">
									Add
								</Button>
							</Container>
						</Form.Group>
					</Form>
				</div>
				<br />
			</div>
		</Container>
	);
};

export default Scoreboard;
