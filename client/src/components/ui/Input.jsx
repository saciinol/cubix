const Input = ({ type, name, value, onChange, className = '', ...props }) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className={`flex w-full border-gray-300 bg-transparent px-3 pt-4 pb-2 text-base placeholder:text-gray-500 focus:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 peer focus:border-blue-600 rounded-md border focus:outline-none h-auto ${className}`}
			{...props}
		/>
	);
};

export default Input;
