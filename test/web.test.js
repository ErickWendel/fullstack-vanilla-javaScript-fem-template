import { describe, it, before } from 'node:test'
import Controller from '../src/shared/controller.js';
import View from './../src/platforms/web/view.js'

function getDocument(mock) {
    globalThis.alert = mock.fn()

    globalThis.document = {
        createElement: mock.fn((name) => ({
            classList: {
                add: mock.fn((name) => { })
            }
        })),
        querySelector: mock.fn((id) => {
            return {
                addEventListener: mock.fn((event, fn) => {

                    return fn({
                        preventDefault: () => { }
                    })
                }),
                reset: mock.fn(() => {

                }),
                appendChild: mock.fn((child) => {
                    return {

                    }
                })
            }
        }),
    }

    return globalThis.document
}

describe('Web app test suite', () => {
    let _controller
    before(() => {

    })
    it('given valid input, should update the table data', async (context) => {
        const document = getDocument(context.mock)
        _controller = Controller.init({
            view: new View()
        })

        document.querySelector.mock
    })
})