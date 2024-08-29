export default class Service {
    #url
    constructor({ url }) {
        this.#url = url
    }

    async getUsers() {
        const result = await fetch(`${this.#url}/users`)
        return result.json()
    }

}