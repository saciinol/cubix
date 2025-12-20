import { useState } from 'react';
import FormContext from './FormContext';

const FormContextProvider = ({ children }) => {
	const [formState, setFormState] = useState({
		onSubmit: null,
		isSubmitting: false,
	});

	const setFormSubmit = (submitFn) => {
		setFormState((prev) => ({ ...prev, onSubmit: submitFn }));
	};

	const setIsSubmitting = (value) => {
		setFormState((prev) => ({ ...prev, isSubmitting: value }));
	};

	return (
		<FormContext.Provider value={{ ...formState, setFormSubmit, setIsSubmitting }}>{children}</FormContext.Provider>
	);
};

export default FormContextProvider;
