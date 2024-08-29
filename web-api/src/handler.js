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
    default(request, response) {
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
    const chosen = allRoutes[key] ?? allRoutes.default

    return Promise.resolve(chosen(request, response))
        .catch((error) => {
            console.log('error', error)
        })
}

export default handler