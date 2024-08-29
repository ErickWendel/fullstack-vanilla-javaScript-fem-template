import {
    readFile,
    writeFile
} from 'node:fs/promises'

export default class UserRepository {
    #file
    constructor({ file }) {
        this.#file = file
    }

    async #currentFileContent() {
        return JSON.parse(await readFile(this.#file))
    }

    async find() {
        return this.#currentFileContent()
    }

    async create(data) {
        const currentData = await this.#currentFileContent()
        currentData.push(data)

        return writeFile(
            this.#file,
            JSON.stringify(currentData)
        )
    }
}