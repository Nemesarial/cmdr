const chalk = require('chalk')

class Argument{
	constructor(config={}){
		this.config=Object.assign({
			name:'undefined-argument',
			short: null,
			defaultValue: '',
			description : '',
			validation: ()=>true
		}, config || {})
		
		this.value = this.config.defaultValue
	}

	test(arg,value){
		if(arg.value===`-${this.config.short}` || arg.value === `--${this.config.name}`){
			this.value=value
			return true
		}
		return false
	}

	help(indent=4){
		const out=require('./utils').makeOut(indent)
		out
			(`${chalk.green(`${this.config.short?`-${this.config.short}, `:''}--${this.config.name} [${this.config.defaultValue}]`)}`)
			(`    ${this.config.description}`)
			()
	}

}

module.exports=Argument
