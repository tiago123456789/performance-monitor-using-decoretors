const http = require("http")
const { JsonResponse, TrackResponseTime } = require("./decorator")

function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), (second * 1000))
    })
}

class Server {

    @TrackResponseTime
    @JsonResponse
    static async handler(request, response) {
        await sleep(parseInt(Math.random() * 10))
        return {
            status: 200,
            message: "OK"
        }
    }
}

http.createServer(Server.handler).listen(3000)