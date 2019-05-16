const Configurable = require('./Configurable')
const Flag = require('./Flag')
const makeHelp = require('./help')

class App extends Configurable{
	constructor(config,...artifacts){
		super('Command','Argument','Flag','Param')
		const self=this
		this.config = Object.assign({
			name: "Untitled Application",
			version: '1.0',
			description:"",
			callback:this.help.bind(this)
			
		}, config ||{})
		
		this.add(
			...artifacts,
			new Flag(
				{
					name:'help',
					description: 'View this help.'
				}
			)
		)
		this.rawArgs=process.argv.slice(2)
		return this
	}

	help(){
		console.log(makeHelp(this))
	}
	
	parse(){
		const args=require('./args')
		const commandList = this.Command.map(command=>command.config.command)
		let parsed=args.parse( commandList )

		for(let idx=0; idx < parsed.arguments.length; idx++){
			let arg=parsed.arguments[idx]
			let argNext = idx < parsed.arguments.length -1 ? parsed.arguments[idx+1] : null

			let found=false

			!found && this.Flag.forEach(myFlag=>{
				if(myFlag.test(arg)) found = true 
			})

			!found && argNext && this.Argument.forEach(myArg=>{
				  if(myArg.test(arg,argNext.value)) found=true
			})

			!found && !arg.isSwitch && this.Param.forEach(myParam=>{
				if(myParam.value === null){
					myParam.value = arg.value 
					found=true
				}
			})
		}

		
		let spec = {
			switches: [...this.Flag, ...this.Argument, ...this.Param].reduce((flags,flag,idx)=>{
				flags[flag.config.name]=flag.value
				return flags
			},{})
		}

		if( parsed.command ){
			let cmd = this.Command.find(command => command.config.command === parsed.command.name)
			if(cmd){
				cmd.parse(parsed.command)
				spec.command={
					callback: cmd.config.callback.bind(cmd),
					switches: [...cmd.Flag, ...cmd.Argument, ...cmd.Param].reduce((flags,flag,idx)=>{
						flags[flag.config.name]=flag.value
						return flags
					},{}),
						
				}
			}
		}

		return spec
	}

	run(){
		let spec = this.parse()
		if(spec.command){
			spec.command.callback(spec.command.switches)
		}else{
			if(spec.switches.help){
				this.help()
			}else{
				this.config.callback(spec.switches)
			}
		}
	}

}

module.exports=App
