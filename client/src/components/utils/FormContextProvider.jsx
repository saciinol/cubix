import { useState } from 'react';
import FormContext from './FormContext';

const FormContextProvider = ({ children }) => {
	const [onSubmit, setOnSubmit] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<FormContext.Provider value={{ onSubmit, setOnSubmit, isSubmitting, setIsSubmitting }}>
			{children}
		</FormContext.Provider>
	);
};

export default FormContextProvider;
