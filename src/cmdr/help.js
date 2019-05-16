const chalk = require('chalk')

const rPad=(size=10,str='')=>`${str}${Array(Math.max(size-str.length,0)).join(' ')}`
const tab=(n=1)=>rPad(4*n)


const docCommand = (command)=>
`${chalk.blue(`${tab(1)}${command.config.command} ${(command.Argument.length + command.Flag.length) ? `[options]` :'' } ${command.Param.map(param=>`<${param.config.name}>`).join(` `)}`)}

${
    [
        (()=>{let out=command.Param.map(docCommandParam).join('\n'); return command.Param.length > 0 ? out : '' })(),      
        (()=>{let out=command.Argument.map(docCommandArg).join('\n'); return command.Argument.length > 0 ? out : '' })(),
        (()=>{let out=command.Flag.map(docCommandFlag).join('\n'); return command.Flag.length > 0 ? out : '' })()
    ].filter(s=>s!=='').join('\n')
}
`

const docCommandParam = (param)=>`${tab(2)}${chalk.green(`<${param.config.name}>`)}\n${tab(3)}${param.config.description}\n`
const docCommandArg = (arg)=>`${tab(2)}${chalk.green(`${arg.config.short?`-${arg.config.short}, `:''}--${arg.config.name} [${arg.config.defaultValue}]`)}\n${tab(3)}${arg.config.description}\n`
const docCommandFlag = (flag)=>`${tab(2)}${chalk.green(`${flag.config.short?`-${flag.config.short}, `:''}--${flag.config.name}`)}\n${tab(3)}${flag.config.description}\n`


module.exports = (app)=>
`${chalk.green(app.config.name)} ${app.config.version}\n${tab(1)}${app.config.description}

${chalk.yellow(`USAGE:`)}
    ${app.config.command} [OPTIONS] <COMMAND> [OPTIONS]
    ${app.config.command}
${
    [
        (()=>{let out=app.Param.map(docCommandParam).join('\n'); return app.Param.length > 0 ? out : '' })(),      
        (()=>{let out=app.Argument.map(docCommandArg).join('\n'); return app.Argument.length > 0 ? out : '' })(),
        (()=>{let out=app.Flag.map(docCommandFlag).join('\n'); return app.Flag.length > 0 ? out : '' })()
    ].filter(s=>s!=='').join('\n')
}    

${chalk.yellow(`COMMANDS:`)}
`+ app.Command.map(command=>docCommand(command)).join('\n\n')

