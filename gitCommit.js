import shell from "shelljs"
import inquirer from 'inquirer'

console.log('-----------start  auto  commit-------------')
// 问题
const stashOptions = [
    {
        type: 'input',
        name: 'name',
        message: "请输入stash content："
    }
]
inquirer.prompt(stashOptions).then(answers => {
    shell.exec(`git stash save ${answers['name']}`)
    shell.exec(`git pull`)

    shell.exec(`git stash apply`, function(code, stdout, stderr) {
        // console.log('Exit code:', code);
        // console.log('Program output:', stdout);
        // console.log('Program stderr:', stderr);
        if(!stdout.includes('Merge conflict')){
            getCommit()
        }else{
            console.log('----代码冲突-----')
        }
    })
})


function getCommit(){
    // 问题
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: "请输入commit content："
        }
    ]
    inquirer.prompt(questions).then(commitAnswer => {
        shell.exec(`git add .`)
        shell.exec(`git commit -m ${ String(commitAnswer['name']) }`)
        console.log('-----------commit suc--------')
        shell.exec(`git push`)
        console.log('----push   suc-----')
    })
}
