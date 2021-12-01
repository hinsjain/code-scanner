import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Tracker.css";
import baseURL from '../util'

function Tracker() {
	const [verifiedUser, setVerifiedUser] = useState([]);

	useEffect(() => {
		axios.get(`${baseURL}/verified_list`).then((response) => {
			const result = response.data.data;
			setVerifiedUser(result);
		});
	}, []);

	const generateTime = (time) => {
		let date = new Date(time);
		const newTime = date.toLocaleTimeString();
		return newTime;
	};

	return (
		<div className="tracker">
			<Table className="tracker__table">
				<TableHead>
					<TableRow>
						<TableCell className="tracker__cell">Name</TableCell>
						<TableCell className="tracker__cell">Arrival Time</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{verifiedUser.map((user, i) => (
						<TableRow key={i}>
							<TableCell className="tracker__bodyCell">
								{user.full_name}
							</TableCell>
							<TableCell>{generateTime(user.time_created)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default Tracker;
