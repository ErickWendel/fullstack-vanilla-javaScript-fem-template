/**
 * @typedef {Object} FormData
 * @property {string} name - The name of the person.
 * @property {number} age - The age of the person.
 * @property {string} email - The email address of the person.
 */

export default class ViewBase {
    /**
     * Configures the form submission behavior.
     * When the form is submitted, the provided callback function is executed with the form data.
     * @param {Function} fn - The callback function to execute on form submission.
     * @returns {void}
     */
    configureFormSubmit(fn) {
        throw new Error('not implemented!')
    }

    /**
     * Resets the form fields to their initial state.
     * @returns {void}
     */
    resetForm() {
        throw new Error('not implemented!')
    }

    /**
     * Displays a notification to the user.
     * This method can be overridden to change how notifications are presented.
     * @param {Object} notification - The notification to display.
     * @param {string} notification.msg - The message to display to the user.
     * @param {boolean} notification.isError - Whether the message is an error.
     * @returns {void}
     */
    notify({ msg, isError }) {
        throw new Error('not implemented!')
    }

    /**
     * Configures the clear action for the form.
     * When the clear button is clicked, the form fields are reset.
     * @param {Function} fn - The callback function to execute on form submission.
     * @returns {void}
     */
    configureFormClear(fn) {
        throw new Error('not implemented!')
    }

    /**
     * Adds a new row of data to the display.
     * This method can be adapted to render data in different ways.
     * @param {FormData} data - The data to add.
     * @returns {void}
     */
    addRow(data) {
        throw new Error('not implemented!')
    }

    /**
     * Adds a new row of data to the display.
     * This method can be adapted to render data in different ways.
     * @param {FormData[]} items - The data to add.
     * @returns {void}
     */
    render(items) {
        throw new Error('not implemented!')
    }
}
