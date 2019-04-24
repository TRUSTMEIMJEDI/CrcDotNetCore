class MeasurementController {
    constructor() {
        this._newMeasurementSection = new NewMeasurementSection()
        this._newMeasurementSection.addEventListener(new class {
            newMeasurementAdded(e) {
                debugger
            }
        })
    }
}

(() => new MeasurementController())()

// new MeasurementController()