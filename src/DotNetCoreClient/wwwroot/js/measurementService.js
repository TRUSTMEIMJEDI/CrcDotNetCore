﻿class MeasurementService {
    _serviceUrl = ''
    _listeners = []

    //Adres do serwisu w konstruktorze
    constructor(serviceUrl) {
        this._serviceUrl = serviceUrl + 'api/measurement'
    }

    addEventListener(listener) {
        this._listeners.push(listener)
    }

    get() {
        let req = new XMLHttpRequest()
        req.onreadystatechange = e => {
            if (req.readyState == 4 && req.status == 200) {
                this._raiseGetResponseReady({
                    data: req.response
                })
            }
        }

        req.open('GET', this._serviceUrl)
        req.send()
    }

    post(data) {
        let req = new XMLHttpRequest()
        req.onreadystatechange = e => {
            if (req.readyState == 4 && req.status == 201) {
                this._raisePostResponseReady({
                    data: req.response
                })
            }
        }

        req.open('POST', this._serviceUrl)
        req.setRequestHeader("Content-Type", "application/json")
        req.send(JSON.stringify(data))
    }

    _raiseGetResponseReady(e) {
        this._listeners.forEach(l => {
            l.getResponseReady(e)
        })
    }

    _raisePostResponseReady(e) {
        this._listeners.forEach(l => {
            l.postResponseReady(e)
        })
    }
}