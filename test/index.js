const {App} = require('../src/cmdr/index')

const app =  new App(
	{
		name : "Hello World Test",
		command: 'test',
		version: '1.0',
		description: "This app only exists as a proof of concept"
	},
	require('./hello'),
	require('./bye')
)

app.run()
