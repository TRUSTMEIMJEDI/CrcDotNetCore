class MeasurementsController {
    _editedRowId = -1

    constructor() {
        this._newMeasurementSection = new NewMeasurementSection()
        this._measurementListSection = new MeasurementListSection()

        let _this = this

        this._newMeasurementSection.addEventListener(new class {
            newMeasurementAdded(e) {
                _this._newMeasurementSection_newMeasurementAdded(e)
            }

            measurementModified(e) {
                e.internalId = _this._editedRowId
                _this._measurementListSection.editMeasurement(e)
                _this._editedRowId = -1
            }

            editingCanceled(e) {
                _this._editedRowId = -1
            }
        })

        this._measurementListSection.addEventListener(new class {
            measurementEditing(e) {
                _this._editedRowId = e.internalId
                _this._newMeasurementSection.editMeasurement(e)
            }

            measurementRemoved(e) {

            }
        })
    }

    _newMeasurementSection_newMeasurementAdded(e) {
        this._measurementListSection.addNewMeasurement(e)
    }
}

(() => new MeasurementsController())()

// new MeasurementController()