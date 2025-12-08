const Button = ({ children, variant = 'default', className = '', ...props }) => {
	const base =
		'inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

	const styles = {
		default: `${base} bg-black text-white h-10 px-4 py-2 hover:bg-black/90 duration-100`,
		transparent: `${base} border bg-transparent text-black h-10 px-4 py-2 hover:bg-black hover:text-white duration-100`,
		icon: `${base} h-10 w-10`,
	};

	return (
		<button className={`${styles[variant]} ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
