const {Command, Param, Argument, Flag} = require('../${context.options["lib-location"]}')

const command_${context.options.command} = new Command(
	{
		command: '${context.options.command}',
		callback(options,command,app){
			console.log(\`Calling command \${context.command.config.command} with these options\`,{ options })
		}
	},
	new Flag({name:'verbose',short:'v'}),
	new Argument({name: 'title',short:'T', description: 'Example title', defaultValue: 'Untitled'}),
	new Param({name: 'targetFolder', defaultValue: process.cwd()})
)


module.exports = command_${context.options.command}
