import {Command} from 'commander'

const program = new Command()

program.option('-d', 'variable para debug', false)
.option('--persistence <persistence>', 'persistencia')
program.parse()

export const opts = program.opts()
