import React, { Fragment } from 'react';
import spinner from './spinner.gif';
const Spinner = () => (
	<Fragment>
		<img src={spinner} alt="loading.." style={{ width: '150px', height: '150px', margin: 'auto', display: 'block', marginTop: '20%'}} />
	</Fragment>
);


export default Spinner;
