class MeasurementsController {
    _serivce = null
    _editedRowId = -1

    constructor() {
        this._serivce = new MeasurementService('http://localhost:54530/')
        this._newMeasurementSection = new NewMeasurementSection()
        this._measurementListSection = new MeasurementListSection()

        let _this = this

        this._newMeasurementSection.addEventListener(new class {
            newMeasurementAdded(e) {
                let data = e
                data.name = e.name
                data.value = e.value
                data.createdBy = 'Operator'
                data.createdAt = '2019-04-19T09:11:40.019'
                _this._serivce.post(data)
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

        this._serivce.addEventListener(new class {
            getResponseReady(e) {
                JSON.parse(e.data).forEach(i => {
                    _this._measurementListSection.addNewMeasurement({
                        id: i.id,
                        name: i.name,
                        value: i.value,
                        createdBy: i.createdBy
                    })
                })
            }

            postResponseReady(e) {
                _this._measurementListSection.addNewMeasurement(JSON.parse(e.data))
            }
        })

        this._serivce.get()
    }


    //_newMeasurementSection_newMeasurementAdded(e) {
    //    _this._measurementListSection.addNewMeasurement(e)
    //}
}

(() => new MeasurementsController())()

// new MeasurementController()