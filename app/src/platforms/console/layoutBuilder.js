import blessed from 'blessed'
import contrib from 'blessed-contrib'

export default class LayoutBuilder {
    #screen
    #layout
    #form
    #inputs = {}
    #buttons = {}
    #alert
    #table

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

    #createButton({ parent, name, content, bg, fg, left, bottom }) {
        return blessed.button({
            parent,
            name,
            content,
            left,
            bottom,
            style: {
                bg,
                fg,
                focus: { bg: `light${bg}` },
                hover: { bg: `light${bg}` },
            },
            mouse: true,
            keys: true,
            shrink: true,
            padding: { left: 1, right: 1 },
            width: 'shrink'
        })
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

        const submitButton = this.#createButton({
            parent: form,
            name: 'submit',
            content: 'Submit',
            bg: 'green',
            fg: 'black',
            left: '35%',
            bottom: 1
        })

        const clearButton = this.#createButton({
            parent: form,
            name: 'clear',
            content: 'Clear',
            bg: 'red',
            fg: 'white',
            left: '55%',
            bottom: 1
        })

        submitButton.on('press', () => form.submit())
        form.on('submit', (data) => onSubmit(data))

        clearButton.on('press', () => onClear())

        this.#form = form
        this.#inputs.name = nameInput
        this.#inputs.age = ageInput
        this.#inputs.email = emailInput

        this.#buttons.submit = submitButton
        this.#buttons.clear = clearButton

        return this
    }

    setAlertComponent() {
        this.#alert = blessed.box({
            parent: this.#form,
            width: '40%',
            height: '25%',
            bottom: 0,
            border: {
                type: 'line'
            },
            style: {
                bg: 'red',
                fg: 'black'
            },
            content: '',
            tags: true,
            align: 'center',
            hidden: true,
        })

        this.#alert.setMessage = (msg) => {
            this.#alert.setContent(`{bold}${msg}{/bold}`)
            this.#alert.show()
            this.#screen.render()

            setTimeout(() => {
                this.#alert.hide()
                this.#screen.render()
            }, 3000);
        }

        return this
    }

    setTable({ numColumns }) {
        const columnWidth = Math.floor(this.#layout.width / numColumns)
        const minColumnWidth = 10
        const columnWidths = Array(numColumns)
            .fill(columnWidth)
            .map(width => Math.max(width, minColumnWidth))

        // [20 , 30, 40]

        this.#table = contrib.table({
            parent: this.#layout,
            mouse: true,
            scrollbar: {
                ch: ' ',
                inverse: true,
            },
            tags: true,
            keys: true,
            fg: 'white',
            selectedFg: 'white',
            selectedBg: 'blue',
            interactive: true,
            label: 'Users',
            width: '100%',
            height: '50%',
            top: 0,
            left: 0,
            border: { type: 'line', fg: 'cyan' },
            columnSpacing: 2,
            columnWidth: columnWidths
        })



        // headers: ['name', 'age', 'email'],
        return this
    }

    build() {
        const components = {
            screen: this.#screen,
            layout: this.#layout,
            form: this.#form,
            alert: this.#alert,
            table: this.#table,
        }

        // components.screen.render()

        return components
    }

}