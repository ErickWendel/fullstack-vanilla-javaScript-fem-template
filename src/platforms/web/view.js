import ViewBase from './../../shared/viewBase.js'

export default class View extends ViewBase {
    #name = document.querySelector('#name')
    #age = document.querySelector('#age')
    #email = document.querySelector('#email')
    #tableBody = document.querySelector('.flex-table')

    /**
     * Adds a new row of data to the display.
     * This method can be adapted to render data in different ways.
     * @param {FormData} data - The data to add.
     * @returns {void}
     */
    addRow(data) {
        const row = document.createElement('div')
        row.classList.add('flex-table-row')

        row.innerHTML = `
            <div>${data.name}</div>
            <div>${data.age}</div>
            <div>${data.email}</div>
        `
        this.#tableBody.appendChild(row)
    }

    /**
     * Adds a new row of data to the display.
     * This method can be adapted to render data in different ways.
     * @param {FormData[]} items - The data to add.
     * @returns {void}
     */
    render(items) {
        items.forEach(item => this.addRow(item))
    }
}