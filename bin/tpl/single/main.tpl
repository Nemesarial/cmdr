#!/usr/bin/env node

const {App, Command, Param, Argument, Flag} = require('${context.options["lib-location"]}')

const callback=(options,app)=>{
	if(!options.targetFolder){
		console.log("targetFolder is required")
		app.help()
		process.exit(-1)
	}
	console.log(\`Calling command \${app.config.name} with these options\`,{ options })
}

const app = new App(
	{
		name: '${context.options.app}',
		command: '${context.options.app}',
		description: '',
		callback
	},
	new Flag({name:'verbose',short:'v'}),
	new Argument({name: 'title',short:'T', description: 'Example title', defaultValue: 'Untitled'}),
	new Param({name: 'targetFolder', defaultValue: null})
)

app.run()


