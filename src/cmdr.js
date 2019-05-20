#!/usr/bin/env node

const {App, Command, Param, Argument, Flag} = require('--init')

const command_testMulti = new Command(
	{
		command: 'testMulti',
		callback(options,command,app){
			console.log(`Calling command ${command.config.command} with these options`,{ options })
		}
	},
	new Flag({name:'verbose',short:'v'}),
	new Argument({name: 'title',short:'T', description: 'Example title', defaultValue: 'Untitled'}),
	new Param({name: 'targetFolder', defaultValue: process.cwd()})
)

const app = new App(
	{
		name: '../src/cmdr',
		command: '../src/cmdr',
		description: '',
	},
	command_testMulti
)

app.run()
