const chalk = require('chalk')

class Flag {
	constructor(config={}){
		this.config=Object.assign({
			name:'undefined-argument',
			short: null,
			description : '',
			validation: ()=>true
		}, config || {})
		
		this.value = false
	}

	test(arg){
		let aShort = `-${this.config.short}`
		let aLong = `--${this.config.name}`
		if(arg.value===aShort || arg.value === aLong){
			this.value=true
			return true
		}
		return false
	}

	help(indent=4){
		const out=require('./utils').makeOut(indent)
		out
			(`${chalk.green(`${this.config.short?`-${this.config.short}, `:''}--${this.config.name}`)}`)
			(`    ${this.config.description}`)
			()
	}
}

module.exports=Flag
