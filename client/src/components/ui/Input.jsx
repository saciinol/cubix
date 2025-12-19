const Input = ({ type, name, value, onChange, className = '', ...props }) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base placeholder:text-gray-500 focus:placeholder:text-gray-400 focus:outline-none focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
			{...props}
		/>
	);
};

export default Input;
