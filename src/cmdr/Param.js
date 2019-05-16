
class Param {
	constructor(config={}){
		this.config=Object.assign({
			name:'undefined-param',
			description : '',
			validation: ()=>true
		}, config || {})
		
		this.value = null
	}
}

module.exports=Param
