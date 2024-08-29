export default class UserService {
    #userRepository
    constructor({ userRepository }) {
        this.#userRepository = userRepository
    }
    find() {
        return this.#userRepository.find()
    }
}