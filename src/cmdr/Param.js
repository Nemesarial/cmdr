
const chalk = require('chalk')

class Param {
	constructor(config={}){
		this.config=Object.assign({
			name:'undefined-param',
			description : '',
			validation: ()=>true
		}, config || {})
		
		this.value = null
	}
	
	help(indent=4){
		const out=require('./utils').makeOut(indent)
		out
			(`${chalk.green(`<${this.config.name}>`)}`)
			(`    ${this.config.description}`)
			()
	}
}

module.exports=Param
