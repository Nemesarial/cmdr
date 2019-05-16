
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
}

module.exports=Argument
