export default function timeAgo(date) {
	const now = Date.now();
	const past = new Date(date).getTime();
	const diff = now - past;

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	// if more than 3 days, show date
	if (days > 3) {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
		});
	}

	// otherwise show relative time
	if (seconds < 60) return `${seconds}s`;
	if (minutes < 60) return `${minutes}m`;
	if (hours < 24) return `${hours}h`;
	return `${days}d`;
}
