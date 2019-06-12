import React, { useContext } from 'react';
import AlertContext from './../../context/alert/alertContext';

const Alert = () => {
	const alertContext = useContext(AlertContext);
	const { state: alert } = alertContext;
	return (
		alert && (
			<div className={`alert alert-${alert.type}`}>
				<i className="fas fa-info-circle" />
				<span style={{ marginLeft: '5px' }}>{alert.msg}</span>
			</div>
		)
	);
};

export default Alert;
