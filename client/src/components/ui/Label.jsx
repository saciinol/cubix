const Label = ({ htmlFor, children, className = '', ...props }) => {
	return (
		<label
			htmlFor={htmlFor}
			className={`absolute select-none left-3 top-4 text-sm text-gray-400 transition-all
        peer-placeholder-shown:top-3
        peer-placeholder-shown:text-base
      peer-placeholder-shown:text-gray-400
        peer-focus:top-1
        peer-focus:text-xs
      peer-focus:text-blue-500
        peer-not-placeholder-shown:top-1
        peer-not-placeholder-shown:text-xs
      peer-not-placeholder-shown:text-gray-500
        pointer-events-none ${className}`}
			{...props}
		>
			{children}
		</label>
	);
};

export default Label;
