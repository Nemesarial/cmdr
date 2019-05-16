const {Command, Argument, Flag, Param} = require('../../src/cmdr/index')

const HelloWorld=(options)=>{
	padding=parseInt(options.padding)
	out = `${isNaN(padding)?'':Array(padding).join(' ')}Hello ${options.name}`
	options.capitalize && (out = out.toUpperCase())
	console.log(out)
}

const hello = new Command(
	{
		command: 'hello',
		description: 'A simple Hello world app',
		callback: HelloWorld
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

module.exports = hello
