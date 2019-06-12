import React from 'react';

const Alert = ({ alert }) => {
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
