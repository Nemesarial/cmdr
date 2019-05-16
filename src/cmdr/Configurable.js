class Configurable{
	constructor(...properties){
		properties.forEach(property=>{
			this[property]=[]
		})
	}
	
	add(...artifacts){
		artifacts.forEach(artifact=>{
			let type = artifact.constructor.name
			if(this.hasOwnProperty(type)){
				this[type].push(artifact)
			}
		})
		return this
	}
	
}

module.exports=Configurable
