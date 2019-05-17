const {Command, Argument, Flag, Param} = require('../../src/cmdr/index')

const hello=(options)=>{
	padding=parseInt(options.padding)
	out = `${isNaN(padding)?'':Array(padding).join(' ')}Hello ${options.name}`
	options.capitalize && (out = out.toUpperCase())
	console.log(out)
}

const command = new Command(
	{
		command: 'hello',
		description: 'A simple Hello world app',
		callback: hello
	},
	new Param(
		{
			name:'name',
			description: 'Your first name'
		}
	),
	new Flag(
		{
			name: 'capitalize',
			short: 'C',
			description: 'Capitalize the output'
		}
	),
	new Argument(
		{
			name: 'padding',
			short: 'P',
			description: 'Make some padding before the output',
			defaultValue: '0'
		}
	)
)

module.exports = command
