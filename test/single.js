// const cmdr=require('./src/cmdr')
const {App, Param, Flag, Argument} = require('../src/cmdr/index')

const HelloWorld=(options)=>{
	padding=parseInt(options.padding)
	out = `${isNaN(padding)?'':Array(padding).join(' ')}Hello ${options.name}`
	options.capitalize && (out = out.toUpperCase())
	console.log(out)
}


const app =  new App(
	{
		name : "Hello world test",
		command: 'test',
		version: '1.0',
		description: "This app only exists as a proof of concept",
		callback: HelloWorld.bind(this)
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

app.run()
