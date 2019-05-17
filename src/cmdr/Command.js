const Configurable = require('./Configurable')
const chalk = require('chalk')


class Command extends Configurable{
	constructor(config={},...artifacts){
		super('Argument','Flag','Param')
		const self=this
		this.config=Object.assign({
			command: 'untitled',
			description: '',
			selected: false,
			callback:function(switches){
				console.log(`Run Command ${this.config.command} with`, switches)
			}
		}, config || {})
		this.add(...artifacts)
	}

	parse(parsed){
		this.selected=true
		for(let idx=0; idx < parsed.arguments.length; idx++){
			let arg=parsed.arguments[idx]
			let argNext = idx < parsed.arguments.length -1 ? parsed.arguments[idx+1] : null

			let found=false

			!found && this.Flag.forEach(myFlag=>{
				myFlag.test(arg) && ( found = true )
			})

			if(!found && !!argNext){
				this.Argument.forEach(myArg=>{
					if(myArg.test(arg,argNext.value)){
						found = true
						idx++
					}
				})
			}

			!found && !arg.isSwitch && this.Param.forEach(myParam=>{
				if(myParam.value === null){
					myParam.value = arg.value 
					found=true
				}
			})

		}
	}

	getArgs(){
		let args={}
		for(let argument of this.Argument){
			args[argument.config.name] = argument.value
		}
		return args
	}

	help(indent=4){
		const out=require('./utils').makeOut(indent)
		out(`${chalk.blue(`${this.config.command} ${(this.Argument.length + this.Flag.length) ? `[OPTIONS]` :'' } ${this.Param.map(param=>`<${param.config.name}>`).join(` `)}`)}`)
		this.Param.forEach(param=>param.help(indent+4))
		this.Argument.forEach(arg=>arg.help(indent+4))
		this.Flag.forEach(flag=>flag.help(indent+4))
	}
}


module.exports = Command
