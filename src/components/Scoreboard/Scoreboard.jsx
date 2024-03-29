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

	/*
	 * Renders table everytime when idCounter is changed
	 */
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
			headerStyle: {
				backgroundColor: '#c0d6cb',
			},
			/*
			 *  Styling table rows. Every second line will be lighter color
			 */
			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#81c784',
					};
				}
				return {
					backgroundColor: '#c8e6c9',
				};
			},
		},
		{
			dataField: 'playerPoints',
			text: 'Points',
			sort: true,
			headerStyle: {
				backgroundColor: '#c0d6cb',
			},
			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#81c784',
					};
				}
				return {
					backgroundColor: '#c8e6c9',
				};
			},
		},
	];
	// Sorts automatically playerPoints column by descending order
	const defaultSorted = [
		{
			dataField: 'playerPoints',
			order: 'desc',
		},
	];
	/*
	 * Adds new data row into table if playerName and playerPoints inputs are not empty and points are >= 1.
	 * Parses playerPoints to integer. For example if input value is 098 it will be formatted in nicer format 98.
	 * Sorting array according the player points. 
	 */
	function addToTable() {
		const points = parseInt(playerPoints);

		// Checks if playerName or playerPoints are not empty.
		if (playerName.length >= 1 && points >= 1) {
			let newList = [];
			/*
			 * Adding new player and comparing it againts scoreBoardTableData array. If newArray length is >= 8,
			 * it will remove a row from the bottom using pop function
			 */
			addNewPlayer();
			if (scoreBoardTableData.length > 0) {
				scoreBoardTableData.sort(sortByProperty('playerPoints'));
				for (let i = 0; i < scoreBoardTableData.length; i++) {
					const list = {
						id: i,
						playerName: scoreBoardTableData[i].playerName,
						playerPoints: scoreBoardTableData[i].playerPoints,
					};
					newList.push(list);
				}

				if (newList.length >= 11) {
					console.log('');
					newList.pop();
				}
				setScoreBoardTableData(newList);
			} else {
				addNewPlayer();
			}
		}
	}
	/**
	 * Generic array sorting
	 *
	 * @param property
	 * @returns {Function}
	 */
	var sortByProperty = function(property) {
		return function(x, y) {
			return x[property] === y[property] ? 0 : x[property] > y[property] ? -1 : 1;
		};
	};
	/*
	 * Adding new player into scoreBoardTableData array {id: int, playerNamer: string, playerPoints: int}
	 */
	function addNewPlayer() {
		setIdCounter(idCounter + 1);
		const list = { id: idCounter, playerName: playerName, playerPoints: playerPoints };
		scoreBoardTableData.push(list);
	}

	/*
	 * Parsing playerPoints from string  to integer
	 */
	function validateNumber(e) {
		console.log('Validating number' + typeof e.target.value);
		const number = parseInt(e.target.value);
		setPlayerPoints(number);
	}
	function validatePlayerPoints(event) {
		if (!Number(event.target.value)) {
			return;
		}
	}
	return (
		// Bootstrap Main container using fluid. Fluid will give even better abilities for responsiveness. #Container #Main #MainContainer #ScoreBoard
		<Container fluid>
			<div className="ScoreBoard">
				<h2 className="h2">Scoreboard</h2>
				<div className="TableContainer">
					<div className="Table">
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
				</div>
				{/* FormContainer for player name and player points. #playerName #playerPoints */}

				<Form className="FormContainer">
					<Form.Group className="Form" controlId="Points">
						{/* playerName input */}
						<Form.Control
							required
							className="InputPlayerName"
							type="text"
							onChange={e => setPlayerName(e.target.value)}
							// onChange={e => validatePlayerPoints(e)}
							placeholder="Enter name"
						/>
						{/* playerPoints input*/}
						<Form.Control
							required
							className="InputPlayerPoints"
							type="number"
							onChange={e => validateNumber(e)}
							placeholder="Enter points"
						/>
						{/* ButtonContainer #AddButton */}
						<Container className="AddButtonContainer">
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
