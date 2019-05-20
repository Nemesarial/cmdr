
const {App, Command, Param, Argument, Flag} = require('../src/cmdr')

const someCommand=(options,command,app)=>{
	console.log(`Calling command ${command.config.command} with these options`,{ options })
}

const app = new App(
	{
		name: 'testMulti',
		command: 'testMulti',
		description: '',
	},
	new Command(
		{
			command: 'someCommand',
			callback: someCommand
		},
		new Argument({name:'argument'})
	)
)

app.run()

