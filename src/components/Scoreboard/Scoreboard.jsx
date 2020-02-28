import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Form, FormGroup, Button, Container } from 'react-bootstrap';
import "./Scoreboard.css";

const Scoreboard = props => {

	const [station, setStation] = useState([]);

	const columns = [
		{
			dataField: 'name',
			text: 'Name',
		},
		{
			dataField: 'score',
			text: 'Score',
			sort: true,
		},
	];
	function addToTable(str) {}
	const data = [];
	return (
        
        <Container>
		<div className="ScoreBoard">
			<div className={'TextBox'}>
				<BootstrapTable keyField="scoreboard" data={data} columns={columns} striped hoves></BootstrapTable>

				<Form className="Form">
					<Form.Group controlId="Score">
						{/* <Form.Label>Score</Form.Label> */}
						<Form.Control type="text" placeholder="Enter name" />

						<Form.Control type="text" placeholder="Enter score" />
						<Button variant="primary" className="Button">
							Add
						</Button>
					</Form.Group>
				</Form>
			</div>
			<br />
            </div>
        </Container>
        
	);
};

export default Scoreboard;
