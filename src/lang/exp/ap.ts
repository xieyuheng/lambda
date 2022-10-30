import { apply } from "../apply"
import { Env } from "../env"
import * as Exps from "../exp"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Value } from "../value"

export class Ap extends Exp {
  constructor(public target: Exp, public arg: Exp) {
    super()
  }

  freeNames(boundNames: Set<string>): Set<string> {
    return new Set([
      ...this.target.freeNames(boundNames),
      ...this.arg.freeNames(boundNames),
    ])
  }

  evaluate(mod: Mod, env: Env): Value {
    const target = this.target.evaluate(mod, env)
    const arg = new Exps.LazyValue(mod, env, this.arg)
    return apply(target, arg)
  }

  format(): string {
    const { target, args } = formatAp(this.target, [this.arg.format()])
    return `(${target} ${args.join(" ")})`
  }
}

function formatAp(
  target: Exp,
  args: Array<string>,
): { target: string; args: Array<string> } {
  if (target instanceof Ap) {
    return formatAp(target.target, [target.arg.format(), ...args])
  } else {
    return { target: target.format(), args }
  }
}