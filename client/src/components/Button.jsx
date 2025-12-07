const Button = ({ children, variant = 'primary', className = '', ...props }) => {
	const base =
		'inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

	const styles = {
		primary: `${base} bg-black text-white hover:bg-black/90 h-10 px-4 py-2`,
	};

	return (
		<button className={`${styles[variant]} ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
