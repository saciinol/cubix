import { useContext } from 'react';
import FormContext from './FormContext';

const useFormContext = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error('useFormContext must be used within FormContextProvider');
	}
	return context;
};

export default useFormContext;
