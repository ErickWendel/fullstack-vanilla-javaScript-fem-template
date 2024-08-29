import { describe, it, before, mock } from 'node:test'
import Controller from '../src/shared/controller.js';
import ViewBase from './../src/shared/viewBase.js'
import assert from 'node:assert'

function generateView() {
    class View extends ViewBase {
        render = mock.fn()
        addRow = mock.fn()
        configureFormClear = mock.fn()
        notify = mock.fn()
        resetForm = mock.fn()
        configureFormSubmit = mock.fn()
    }

    return new View()
}

describe('Controller unit test', () => {
    it('#init', async () => {
        const view = generateView()
        const controller = await Controller.init({
            view,
            service: {
                getUsers: mock.fn(async () => []),
                createUser: mock.fn(async () => ({}))
            }
        })

        assert.strictEqual(view.configureFormSubmit.mock.callCount(), 1)
        assert.strictEqual(view.configureFormClear.mock.callCount(), 1)
        const renderMock = view.render.mock
        assert.strictEqual(renderMock.callCount(), 1)
        const initialData = [
            { name: 'Erick Wendel', age: 28, email: 'erick@erick.com' },
            { name: 'Ana Neri', age: 24, email: 'ana@ana.com' },
            { name: 'Marc Berg', age: 24, email: 'marc@marc.com' },
        ]

        assert.deepStrictEqual(
            renderMock.calls[0].arguments[0],
            initialData
        )

    })
})