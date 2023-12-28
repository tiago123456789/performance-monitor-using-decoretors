const isUiDisabled = process.env.UI_DISABLED
let ui
if (isUiDisabled) {
    ui = {
        updateGraph: () => { }
    }
} else {
    const Ui = require('./ui')
    ui = new Ui()
}

function JsonResponse(target, key) {
    return async function (request, response) {
        const data = await target.apply(this, [request, response])
        response.writeHead(data.status, { "Content-Type": "application/json" });
        response.end(JSON.stringify(data))
    }
}

function TrackResponseTime(target, key) {
    if (key.kind !== "method") return target;
    return async function (request, response) {
        const startAt = performance.now()
        await target.apply(this, [request, response])
        const endAt = performance.now()
        let timeDiff = endAt - startAt
        let seconds = Math.round(timeDiff)
        
        ui.updateGraph(
            request.method,
            seconds
        )
    }
}


module.exports = {
    TrackResponseTime,
    JsonResponse
}