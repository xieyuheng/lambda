import { Span } from "../span"
import { Stmt } from "../stmt"

export class DefStmt extends Stmt {
  constructor(public span: Span) {
    super()
  }

  async execute(): Promise<void> {
    // TODO
  }
}
