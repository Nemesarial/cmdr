const Configurable = require('./Configurable')
const chalk = require('chalk')
const Flag = require('./Flag')

const out=require('./utils').makeOut(0)




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
	
	appHeader(){
		out
			(`${chalk.green(this.config.name)} ${this.config.version}`)
			(`   ${this.config.description}`)
	}

	help(){
		this.appHeader()
		out
			()
			(`${chalk.yellow(`USAGE:`)}`)
			(`   ${this.config.command} ${[...this.Argument, ...this.Flag].length>0?`[OPTIONS] `:``}<COMMAND> [OPTIONS]`)
			(`   ${this.config.command}`)
			();
			
		if(this.Param.length>0){
			out(`${chalk.yellow(`PARAMS:`)}`)
			this.Param.forEach(command=>command.help())
			out()
		}
		
		if(this.Argument.length>0){
			out(`${chalk.yellow(`ARGS:`)}`)
			this.Argument.forEach(command=>command.help())
			out()
		}
		
		if(this.Flag.length>0){
			out(`${chalk.yellow(`FLAGS:`)}`)
			this.Flag.forEach(command=>command.help())
			out()
		}
		
		if(this.Command.length>0){
			out(`${chalk.yellow(`COMMANDS:`)}`)
			this.Command.forEach(command=>command.help())
			out()
		}

	}

	getCommand(name){
		return this.Command.find(command=>command.options.command===name)
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
				if(!myParam.__wasset){
					myParam.value = arg.value 
					myParam._wasset=true
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
				 	cmd,
					switches: [...cmd.Flag, ...cmd.Argument, ...cmd.Param].reduce((flags,flag,idx)=>{
						flags[flag.config.name]=flag.value
						return flags
					},{}),
						
				}
				// console.log(parsed.command.arguments)
			}
		}

		return spec
	}

	run(){
		let spec = this.parse()
		if(spec.command){
			spec.command.cmd.config.callback(spec.command.switches,spec.command.cmd, this)
		}else{
			if(spec.switches.help){
				this.help()
			}else{
				this.config.callback(spec.switches, this)
			}
		}
	}

}

module.exports=App
