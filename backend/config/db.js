module.exports = {
	uri: "mongodb://localhost/event-calendar-app",
	opts: {
		server: { 
			auto_reconnect: true,
			poolSize: 40
		},
		user: "root"
	}
};