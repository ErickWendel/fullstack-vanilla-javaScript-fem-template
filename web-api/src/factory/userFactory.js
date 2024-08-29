import UserRepository from "../repository/userRepository.js"
import UserService from "../service/userService.js"

const generateInstance = ({ filePath }) => {
    const userRepository = new UserRepository({ file: filePath })
    const userService = new UserService({
        userRepository
    })

    return userService
}

export {
    generateInstance
}
