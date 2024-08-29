export default class UserService {
    #userRepository
    constructor({ userRepository }) {
        this.#userRepository = userRepository
    }
    async find() {
        return this.#userRepository.find()
    }
    async create(data) {
        return this.#userRepository.create(data)
    }

}