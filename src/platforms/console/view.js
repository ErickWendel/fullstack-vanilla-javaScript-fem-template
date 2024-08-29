import ViewBase from "../../shared/viewBase.js";
import LayoutBuilder from "./layoutBuilder.js";

export default class View extends ViewBase {
    #layoutBuilder
    #components
    constructor(layoutBuilder = new LayoutBuilder()) {
        super()
        this.#layoutBuilder = layoutBuilder
    }

    configureFormSubmit() { }
    configureFormClear() { }

    // facade is the design pattern to execute many functions
    // and abstract the complexicity
    #initializeComponentsFacade() {
        this.#components = this.#layoutBuilder
            .setScreen({ title: 'Fullstack vanilla JS' })
            .setLayout()
            .setFormComponent({
                onClear: () => { },
                onSubmit: () => { }
            })
            .build()
    }

    render(items) {
        this.#initializeComponentsFacade()
    }
}