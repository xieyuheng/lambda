import { Def } from "../def"
import { Exp } from "../exp"
import { ModLoader } from "../mod"
import { Value } from "../value"

export class Mod {
  loader: ModLoader
  defs: Map<string, Def> = new Map()

  constructor(public url: URL, options: { loader: ModLoader }) {
    this.loader = options.loader
  }

  async load(
    url: URL | string,
    options?: {
      text?: string
    }
  ): Promise<Mod> {
    if (typeof url === "string") {
      url = this.resolve(url)
    }

    return await this.loader.load(url, options)
  }

  resolve(href: string): URL {
    return new URL(href, this.url)
  }

  define(name: string, exp: Exp): void {
    this.defs.set(name, new Def(this, name, exp))
  }

  lookup(name: string): Value | undefined {
    const def = this.defs.get(name)
    if (def === undefined) return undefined
    return def.refer()
  }
}
