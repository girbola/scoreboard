import React, { useState, useEffect, useReducer } from 'react';
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
		console.log('Updating: ' + playerName);
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
	 * Adding new name with points into scoreBoardTableData list {id: int, playerNamer: string, playerPoints: int}
	 */
	function addNewName() {
		setIdCounter(idCounter + 1);
		// const player = playerName.trim();
		console.log('Player name:' + playerName + ':');
		const list = { id: idCounter, playerName: playerName, playerPoints: playerPoints };
		scoreBoardTableData.push(list);
	}

	/*
	 *	Add name and points to table using scoreBoardTableData array
	 */
	function addToTable() {
		const points = parseInt(playerPoints);
		console.log('UPDATING addToTable: ' + playerName + ' points: ' + points);
		if (playerName.length >= 1 && points >= 1) {
			addNewName();
		}
	}

	/*
	 * Validating points from string to integer
	 */
	function validateNumber(e) {
		console.log('Validating number' + typeof e.target.value);
		const number = parseInt(e.target.value);
		setPlayerPoints(number);
	}

	return (
		<Container fluid>
			<div className="ScoreBoard">
				<h2>Scoreboard</h2>
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

				<Form className="FormContainer">
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
							onChange={e => validateNumber(e)}
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
		</Container>
	);
};

export default Scoreboard;
