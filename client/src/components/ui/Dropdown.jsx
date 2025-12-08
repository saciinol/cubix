import { useEffect, useRef, useState } from 'react';

const Dropdown = ({ trigger, children }) => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="relative inline-block" ref={menuRef}>
			<div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
				{trigger}
			</div>

			{open && <div className="absolute right-0 mt-1 min-w-32 rounded-md border-bg-white bg-muted shadow-md p-1">{children}</div>}
		</div>
	);
};

export const DropdownItem = ({ children, onClick }) => {
	return (
		<button className="w-full flex items-center gap-2 text-left px-2.5 py-1.5 rounded-md hover:bg-white duration-100 cursor-pointer" onClick={onClick}>
			{children}
		</button>
	);
};

export default Dropdown;
