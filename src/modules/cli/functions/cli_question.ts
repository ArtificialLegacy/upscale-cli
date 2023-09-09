import { CliInterface } from '../types/cli_interface'

function cli_question(intf: CliInterface, question: string): Promise<string> {
  const promise = new Promise<string>((resolve, reject) => {
    intf.question(question, (answer: string) => {
      resolve(answer)
    })
  })

  return promise
}

export default cli_question
