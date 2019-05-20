#!/usr/bin/env node

const {App} = require('${context.options["lib-location"]}')

const command_${context.options.command} = require('./${manifest["commands/command.tpl"].file}')

const app = new App(
	{
		name: '${context.options.app}',
		command: '${context.options.app}',
		description: '',
	},
	command_${context.options.command}
)

app.run()
