import ViewBase from "../../shared/viewBase.js";
import LayoutBuilder from "./layoutBuilder.js";

export default class View extends ViewBase {
    #layoutBuilder
    #components
    #data = []
    #headers = []

    #onFormSubmit = () => { }
    #onFormClear = () => { }

    constructor(layoutBuilder = new LayoutBuilder()) {
        super()
        this.#layoutBuilder = layoutBuilder
    }

    #prepareData(items) {
        if (!items.length) {
            return {
                headers: this.#headers,
                data: []
            }
        }

        this.#headers = Object.keys(items[0])
        return {
            headers: this.#headers,
            data: items.map(item => Object.values(item))
        }

    }

    addRow(item) {
        this.#data.push(item)
        const items = this.#prepareData(this.#data)
        this.#components.table.setData(items)
        this.#components.screen.render()
    }

    notify({ msg, isError }) {
        this.#components?.alert.setMessage(msg)
    }

    configureFormSubmit(fn) {
        this.#onFormSubmit = (data) => {
            return fn(data)
        }

    }
    resetForm() {
        this.#components.form.reset()
        this.#components.screen.render()
    }

    configureFormClear(fn) {
        this.#onFormClear = () => {
            this.resetForm()
            return fn()
        }
    }


    // facade is the design pattern to execute many functions
    // and abstract the complexicity
    #initializeComponentsFacade() {
        this.#components = this.#layoutBuilder
            .setScreen({ title: 'Fullstack vanilla JS' })
            .setLayout()
            .setFormComponent({
                onClear: this.#onFormClear.bind(this),
                onSubmit: this.#onFormSubmit.bind(this)
            })
            .setAlertComponent()
            .setTable({
                numColumns: 3
            })
            .build()
    }

    render(items) {
        this.#initializeComponentsFacade()
        items.forEach(item => this.addRow(item))
    }
}