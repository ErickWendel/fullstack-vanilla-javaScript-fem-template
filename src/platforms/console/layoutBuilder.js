import blessed from 'blessed'
import contrib from 'blessed-contrib'

export default class LayoutBuilder {
    #screen
    #layout
    #form

    setScreen({ title }) {
        this.#screen = blessed.screen({
            smartCSR: true,
            title
        })
        this.#screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

        return this
    }

    setLayout() {
        this.#layout = blessed.layout({
            parent: this.#screen,
            width: '100%',
            height: '100%'
        })

        return this
    }

    #createInputField({ parent, name, top, label }) {
        const input = blessed.textbox({
            parent,
            name,
            top,
            label,
            inputOnFocus: true,
            left: 'center',
            width: '60%',
            height: '25%',
            border: { type: 'line' },
            style: {
                fg: 'white',
                bg: 'blue',
                focus: { bg: 'lightblue' }
            }
        })

        return input
    }

    setFormComponent({
        onSubmit,
        onClear
    }) {
        const form = blessed.form({
            parent: this.#layout,
            keys: true,
            vi: false,
            width: '100%',
            height: '40%',
            top: 0,
            left: 'center',
            label: 'Users Form',
            border: { type: 'line' },
            style: {
                fg: 'white',
                bg: 'black'
            }
        })

        const nameInput = this.#createInputField({
            parent: form,
            name: 'name',
            top: 1,
            label: 'Name:'
        })

        nameInput.focus()

        const ageInput = this.#createInputField({
            parent: form,
            name: 'age',
            top: 4,
            label: 'Age:'
        })

        const emailInput = this.#createInputField({
            parent: form,
            name: 'email',
            top: 7,
            label: 'Email:'
        })

        this.#form = form

        return this
    }

    build() {
        const components = {
            screen: this.#screen,
            layout: this.#layout,
            form: this.#form,
        }

        components.screen.render()

        return components
    }

}