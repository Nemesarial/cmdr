cmdr
=====

A simple solution for single or multi-command node cli scripts.

[![Version](https://img.shields.io/npm/v/@cthru/cmdr.svg)](https://npmjs.org/package/@cthru/cmdr)
[![Downloads/week](https://img.shields.io/npm/dw/@cthru/cmdr.svg)](https://npmjs.org/package/@cthru/cmdr)
[![License](https://img.shields.io/npm/l/@cthru/cmdr.svg)](https://github.com/nemesarial/cmdr/blob/master/package.json)

# Description
`cmdr` is a utility to make it easy to create cli apps with command line parsing

## Examples

### Single-command app
```{javasript}
const {App, Param, Flag, Argument} = require('@cthru/cmdr')

const hello=(options)=>{
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

app.run()
```

### Multi-command App
`cmdr` also allows for multiple commands in the same app. The following example
has two commands

`index.js` 
```const {App} = require('@cthru/cmdr')

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
```

`hello.js`
```
const {Command, Argument, Flag, Param} = require('@cthru/cmdr')

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

```

`bye.js`
```
const {Command, Argument, Flag, Param} = require('@cthru/cmdr')

const bye=(options)=>{
	padding=parseInt(options.padding)
	out = `${isNaN(padding)?'':Array(padding).join(' ')}Goodbye ${options.name}`
	options.capitalize && (out = out.toUpperCase())
	console.log(out)
}

const command = new Command(
	{
		command: 'bye',
		description: 'A simple Bye world app',
		callback: bye
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
```

## TODO
 - argument validation
 - `--argument=20` format support, currently only allows `--argument 20` format
 - interactive mode
 - ~~more flexible help generation~~
