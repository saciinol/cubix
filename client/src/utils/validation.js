export const validateRegister = (formData) => {
	const { username, email, password } = formData;
	const errors = {};

	const usernameRegex = /^[a-zA-Z0-9_]+$/;
	if (!username || !username.trim()) {
		errors.username = ['Username is required'];
	} else if (username.trim().length < 3 || username.trim().length > 30) {
		errors.username = ['Username must be 3-30 characters long'];
	} else if (!usernameRegex.test(username.trim())) {
		errors.username = ['Username can only contain letters, numbers, and underscores'];
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email || !email.trim()) {
		errors.email = ['Email is required'];
	} else if (!emailRegex.test(email.trim())) {
		errors.email = ['Please enter a valid email address'];
	}

	if (!password) {
		errors.password = ['Password is required'];
	} else if (password.length < 6) {
		errors.password = ['Password must be at least 6 characters long'];
	}

   return {
      isValid: Object.keys(errors).length === 0,
      errors,
   }
};

export const sanitizeInput = (input) => {
	if (typeof input !== "string") return input;

	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#x27;",
		"/": "&#x2F;",
		"`": "&#x60;",
		"=": "&#x3D;",
	};

	return input.trim().replace(/[&<>"'/`=]/g, (char) => map[char]);
};
