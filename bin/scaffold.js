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
	
	
	fs.writeFileSync(file,`#!/usr/bin/env node

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
	},
	new Flag({name:'verbose',short:'v'}),
	new Argument({name: 'title',short:'T', description: 'Example title', defaultValue: 'Untitled'}),
	new Param({name: 'targetFolder', defaultValue: process.cwd()})
)

app.run()

`)
	
	fs.chmodSync(file,0o765)

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
	

	 fs.writeFileSync(file,`#!/usr/bin/env node

const {App, Command, Param, Argument, Flag} = require('${libloc}')

const command_${options.command} = new Command(
	{
		command: '${options.command}',
		callback(options,command,app){
			console.log(\`Calling command \${command.config.command} with these options\`,{ options })
		}
	},
	new Flag({name:'verbose',short:'v'}),
	new Argument({name: 'title',short:'T', description: 'Example title', defaultValue: 'Untitled'}),
	new Param({name: 'targetFolder', defaultValue: process.cwd()})
)

const app = new App(
	{
		name: '${options.app}',
		command: '${options.app}',
		description: '',
	},
	command_${options.command}
)

app.run()
`)

	fs.chmodSync(file,0o765)
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
		new Argument({
			name: 'init',
			description: 'install @cthru/cmdr using npm'
		}),
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
