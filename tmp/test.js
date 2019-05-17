
const {App, Command, Param, Argument, Flag} = require('../src/cmdr')

const callback=(options,command,app)=>{
	console.log(`Calling command ${command.config.command} with these options`,{ options })
}

const app = new App(
	{
		name: 'test',
		command: 'test',
		description: '',
		callback
	}
)

app.run()

