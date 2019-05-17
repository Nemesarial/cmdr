const makeOut = (preSpace=0)=>{
	const out=(msg)=>{console.log(Array(preSpace).join(' ') + (msg || '')); return out}
	return out
}

module.exports={
	makeOut
}
