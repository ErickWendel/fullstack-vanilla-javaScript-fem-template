#!/usr/bin/env node

import Controller from "../src/shared/controller.js"
import Service from "../src/shared/service.js"

const platform = globalThis.window ? "web" : "console"

const { default: View } = await import(`./../src/platforms/${platform}/view.js`)

const API_URL = 'http://localhost:3000'

await Controller.init({
    view: new View(),
    service: new Service({ url: API_URL })
})

