#!/usr/bin/env node
const {App, Command, Param, Argument, Flag} = require('../src/cmdr/index')
const path = require('path')
const fs = require('fs')

const create_single=(options, command, app)=>{
	if(!options.app){
		console.log('<app> is required')
		command.help(0)
		process.exit(-1)
	}
	 let file=path.resolve(process.cwd(),`${options.app}.js`)
	 let libloc=options['lib-location']
	 console.log(`Creating ${file}`)
	

	 fs.writeFileSync(file,`
const {App, Command, Param, Argument, Flag} = require('${libloc}')

const callback=(options,command,app)=>{
	console.log(\`Calling command \${command.config.command} with these options\`,{ options })
}

const app = new App(
	{
		name: '${options.app}',
		command: '${options.app}',
		description: '',
		callback
	}
)

app.run()

`)
}

const create_multi=(options, command, app)=>{
	console.log({options})
	if(!options.app){
		console.log('<app> is required')
		command.help(0)
		process.exit(-1)
	}
	if(!options.command){
		console.log('<command> is required')
		command.help(0)
		process.exit(-1)
	}
	 let file=path.resolve(process.cwd(),`${options.app}.js`)
	 let libloc=options['lib-location']
	 console.log(`Creating ${file}`)
	

	 fs.writeFileSync(file,`
const {App, Command, Param, Argument, Flag} = require('${libloc}')

const ${options.command}=(options,command,app)=>{
	console.log(\`Calling command \${command.config.command} with these options\`,{ options })
}

const app = new App(
	{
		name: '${options.app}',
		command: '${options.app}',
		description: '',
	},
	new Command(
		{
			command: '${options.command}',
			callback: ${options.command}
		}
	)
)

app.run()

`)
}



const app =  new App(
	{
		name : "@cthru/cmdr scaffolding",
		command: 'cmdr',
		version: '1.0',
		description: "This app only exists as a proof of concept"
	},
	new Command(
		{
			command: 'create:single',
			description: 'Create a single-command app in the current folder',
			callback: create_single
		},
		new Param({
			name: 'app',
			description: 'Name of the app (and the file)'
		}),
		new Argument({
			name: 'lib-location',
			description: 'An alternate require location for the cmdr library',
			defaultValue: '@cthru/cmdr'
		})
	),
	new Command(
		{
			command: 'create:multi',
			description: 'Create a multi-command app in the current folder',
			callback: create_multi
		},
		new Param({
			name: 'app',
			description: 'Name of the app (and the file)'
		}),
		new Param({
			name: 'command',
			description: 'Name of the first command',
			defaultValue: 'testvalue'
		}),
		new Argument({
			name: 'lib-location',
			description: 'An alternate require location for the cmdr library',
			defaultValue: '@cthru/cmdr'
		})
	),
)

app.run()
