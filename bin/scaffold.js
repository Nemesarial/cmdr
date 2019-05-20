#!/usr/bin/env node
const {App, Command, Param, Argument, Flag} = require('../src/cmdr/index')
const path = require('path')
const fs = require('fs')
const child_process=require('child_process')
const {renderTplFile} = require('../src/cmdr/utils')


const init = ()=>{
	let file=path.resolve(process.cwd(),'package.json')
	fs.access(file, fs.constants.F_OK, (err) => {
		if(err){
			child_process.execSync('npm init -y')
		}
		child_process.execSync('npm install @cthru/cmdr --save',{cwd:process.cwd(), stio: 'inherit'})
	})	
}

const create_single=(options, command, app)=>{
	if(!options.app){
		console.log('<app> is required')
		command.help(0)
		process.exit(-1)
	}
	// let file=path.resolve(process.cwd(),`${options.app}.js`)
	// let libloc=options['lib-location']
	
	renderTplFile(path.resolve(__dirname,'./tpl/single/single.manifest.json'),{options,command,app},process.cwd())
	
	// fs.chmodSync(file,0o765)
	options.init && init()
}

const create_multi=(options, command, app)=>{
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

	renderTplFile(path.resolve(__dirname,'./tpl/multi/multi.manifest.json'),{options,command,app},process.cwd())
	
	options.init && init()
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
		new Flag({
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
