'use strict'

exports.ok = (values, res) => {
    const data = {
        'status': 200,
        "data": values
    }
    res.json(data)
    res.end()
}

exports.not_found = (res) => {
    res.status(404)
    res.send("<h1>404 CHART DATA NOT FOUND</h1>")
    res.end()
}

exports.error = (err, res) => {
    const data = {
        'status': 500,
        "error": err
    }
    res.json(data)
    res.end()
}