class Arg{
	constructor(arg){
		this.value=arg
		this.used=false
	}

	use(){
		this.used=true
		return this.value
	}

	get isSwitch(){
		return this.value.length>0 && this.value[0]==='-'
	}
}

class Args{
	constructor(){
		this.args=[]
		this._pointer=2 // skip the runtime and the script
		process.argv.forEach(this.addArgument.bind(this))	
	}

	argParse(arg){
		let eqPos=arg.indexOf('=')
		if(eqPos<=0 ) return [arg]
		let sqPos=arg.indexOf('"')
		let dqPos=arg.indexOf('\'')
		if((sqPos>=0 && sqPos<eqPos)||(dqPos>=0 && dqPos<eqPos))return [arg]
    	return [arg.substr(0,eqPos),arg.substr(eqPos+1)]
	}
	addArgument(arg){
		let args=this.argParse(arg)
		args.forEach(arg=>{
			this.args.push(new Arg(arg))
		})
	}

	get pointer(){
		if(this._pointer >= this.args.length) return null
		while(this._pointer < this.args.length && this.args[this._pointer].used) {
			this._pointer++
		}
		return this._pointer < this.args.length ? this._pointer : null
	}

	getNextArgument(use=false){
		let pos=this.pointer
		if( !pos ) return null
		let arg=this.args[pos]
		if(use) arg.use()
		return arg
	}


	parse(commandList=[]){
		let app={
			arguments:[]
		}
		let command = null

		while(this.pointer){
			let varArg=this.getNextArgument(true)
			if(!command){
				if(commandList.indexOf(varArg.value)>=0){
					command={
						name:varArg.value,
						arguments:[]
					}
					app.command=command
				}else{
					app.arguments.push(varArg)
				}
			}else{
				command.arguments.push(varArg)
			}
		}
		return app
	}
	
}

let args=new Args()

module.exports=args //singleton
