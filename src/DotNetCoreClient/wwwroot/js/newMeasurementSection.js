class NewMeasurementSection {
    _listeners = []

    constructor() {
        let addButton = document.querySelector("#measurements_addBtn")
        addButton.addEventListener('click', e => {
            let nameInput = document.querySelector("#measurements_nameInput")
            let valueInput = document.querySelector("#measurements_valueInput")
            let obj = {
                name: nameInput.value,
                value: valueInput.value
            }

            this._raiseNewMeasurementAdded(obj)
        })
    }

    addEventListener(listener) {
        this._listeners.push(listener)
    }

    _raiseNewMeasurementAdded(e) {
        this._listeners.forEach(l => {
            l.newMeasurementAdded(e)
        })
    }
}