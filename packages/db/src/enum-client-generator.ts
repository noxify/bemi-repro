import fs from "node:fs/promises"
import path from "node:path"
import pkg from "@prisma/generator-helper"

const { generatorHandler } = pkg
const header = `// This file was generated by a custom prisma generator, do not edit manually.\n`

generatorHandler({
  onManifest() {
    return {
      defaultOutput: "../node_modules/.generated/enums-client.ts",
      prettyName: "Prisma Enum Generator for client usage",
    }
  },
  async onGenerate(options) {
    const enums = options.dmmf.datamodel.enums

    const output = enums.map((e) => {
      let enumString = `export const ${e.name} = {\n`
      e.values.forEach(({ name: value }) => {
        enumString += `  ${value}: "${value}",\n`
      })
      enumString += `}\n\n`

      return enumString
    })

    const outputFile = options.generator.output
    if (!outputFile?.value) {
      throw new Error("No output file specified")
    }

    const outputPath = path.resolve(outputFile.value)
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, header + output.join("\n"), "utf-8")
  },
})
