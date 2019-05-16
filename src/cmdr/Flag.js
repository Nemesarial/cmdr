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
}

module.exports=Flag
