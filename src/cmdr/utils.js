const makeOut = (preSpace=0)=>{
	const out=(msg)=>{console.log(Array(preSpace).join(' ') + (msg || '')); return out}
	return out
}

const renderTplFile=function(manifestFile,context,targetFolder){
	const dTpl = (str, context={}, manifest={}) => {let output; eval(`output = \`${str}\``); return output}
	 
	const fs=require('fs')
	const path = require('path')
	const manifest=require(manifestFile)
	const srcRoot = path.dirname(manifestFile)
	for(let fileName in manifest){

		if(manifest[fileName] instanceof Object){
			manifest[fileName].file = dTpl(manifest[fileName].file, context)
		}else{
			manifest[fileName]={
				file:dTpl(manifest[fileName], context),
				permissions: null
			}
		}
	}

	console.log({manifest})
	for(let fileName in manifest){

		let srcFile = path.resolve(srcRoot,fileName)
		let dstFile = path.resolve(targetFolder,dTpl(manifest[fileName].file, context, manifest))
		let content = fs.readFileSync(srcFile).toString()
		try{ fs.mkdirSync(path.dirname(dstFile,{recursive:true})) } catch(e){}
		fs.writeFileSync(dstFile,dTpl(content,context,manifest))
		if(manifest[fileName].permissions){
			fs.chmodSync(dstFile,manifest[fileName].permissions)
		}
		console.log(`${srcFile} => ${dstFile}`)
	}
}

module.exports={
	makeOut,
	renderTplFile
}
