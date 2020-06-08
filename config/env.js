/* global process */
module.exports = {
	name: 'andresspblog',
	version: '1.0.0',
	env: process.env.NODE_ENV || 'DEV',
	port: process.env.PORT || 3000,
	base_url: process.env.BASE_URL || 'http://localhost:3000',
};