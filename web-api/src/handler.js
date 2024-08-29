import { parse, fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { routes } from './routes/userRoutes.js'
import { DEFAULT_HEADERS } from './util/util.js'
import { generateInstance } from './factory/userFactory.js'

// import data from './../database/data.json' assert { type: 'json' }

const currentDir = dirname(fileURLToPath(import.meta.url))
const filePath = join(currentDir, '..', 'database', 'data.json')

const userFactory = generateInstance({
    filePath
})

const userRoutes = routes({
    userFactory
})

const allRoutes = {
    ...userRoutes,
    defaultRoute(request, response) {
        response.writeHead(404, DEFAULT_HEADERS)
        response.write(
            JSON.stringify({
                message: 'uhhhh not found!'
            })
        )

        response.end()
    }
}

function handler(request, response) {
    const {
        url,
        method
    } = request

    const { pathname } = parse(url, true)

    const key = `${pathname}:${method.toLowerCase()}`
    const chosen = allRoutes[key] ?? allRoutes.defaultRoute

    return Promise.resolve(chosen(request, response))
        .catch(handleError(response))
}

function handleError(response) {
    return error => {
        console.log('Something bad has happened', error.stack)
        response.writeHead(500, DEFAULT_HEADERS)
        response.write(
            JSON.stringify({
                error: 'internal server error'
            })
        )
        return response.end()
    }
}

export default handler