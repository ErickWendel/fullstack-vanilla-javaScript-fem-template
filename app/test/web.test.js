import { describe, it, before } from 'node:test'
import Controller from '../src/shared/controller.js';
import View from './../src/platforms/web/view.js'
import assert from 'node:assert'

function getDocument(mock, inputs = { name: 'test', age: 'test', email: 'test' }) {
    globalThis.alert = mock.fn()

    globalThis.document = {
        createElement: mock.fn((name) => ({
            classList: {
                add: mock.fn((name) => { })
            }
        })),
        querySelector: mock.fn((id) => {
            const key = id.replace('#', '')
            const value = inputs[key] ?? 'test'

            return {
                value,
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
        const view = new View()

        const addRow = context.mock.method(view, view.addRow.name)

        _controller = await Controller.init({
            view,
            service: {
                getUsers: context.mock.fn(async () => []),
                createUser: context.mock.fn(async () => ({}))
            }
        })

        const [
            name,
            age,
            email,
            tableBody,
            form,
            btnFormClear
        ] = document.querySelector.mock.calls

        assert.strictEqual(name.arguments[0], '#name')
        assert.strictEqual(age.arguments[0], '#age')
        assert.strictEqual(email.arguments[0], '#email')
        assert.strictEqual(tableBody.arguments[0], '.flex-table')
        assert.strictEqual(form.arguments[0], '#form')
        assert.strictEqual(btnFormClear.arguments[0], '#btnFormClear')

        const onSubmit = form.result.addEventListener.mock.calls[0].arguments[1]
        const preventDefaultSpy = context.mock.fn()
        assert.strictEqual(addRow.mock.callCount(), 4)

        onSubmit({
            preventDefault: preventDefaultSpy
        })

        assert.strictEqual(addRow.mock.callCount(), 5)

        assert.deepStrictEqual(
            addRow.mock.calls.at(4).arguments.at(0),
            { name: 'test', age: 'test', email: 'test' }
        )

    })

    it('given invalid data, should call alert with message', async (context) => {
        const document = getDocument(context.mock, {
            age: '',
            name: '',
            email: ''
        })

        const view = new View()

        const addRow = context.mock.method(view, view.addRow.name)
        const notify = context.mock.method(view, view.notify.name)

        _controller = await Controller.init({
            view,
            service: {
                getUsers: context.mock.fn(async () => []),
                createUser: context.mock.fn(async () => ({}))
            }
        })

        const [
            name,
            age,
            email,
            tableBody,
            form,
            btnFormClear
        ] = document.querySelector.mock.calls

        const onSubmit = form.result.addEventListener.mock.calls[0].arguments[1]
        const preventDefaultSpy = context.mock.fn()
        assert.strictEqual(addRow.mock.callCount(), 3)

        onSubmit({
            preventDefault: preventDefaultSpy
        })
        assert.deepStrictEqual(
            notify.mock.calls[0].arguments[0],
            { msg: 'Please, fill out all the fields.' }
        )

    })

})