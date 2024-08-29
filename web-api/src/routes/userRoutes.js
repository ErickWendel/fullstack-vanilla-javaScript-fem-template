import { DEFAULT_HEADERS } from "../util/util.js"



const routes = ({
    userFactory,
}) => ({
    '/users:get': async (request, response) => {
        const users = userFactory.find()
        response.writeHead(200, DEFAULT_HEADERS)

        return response.end(JSON.stringify(users))
    },
    '/users:post': async (request, response) => {

        response.writeHead(201, DEFAULT_HEADERS)
        return response.end('post')
    },
})

export { routes }