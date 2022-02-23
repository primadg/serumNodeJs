
function getSerumData(ws) {
    ws.onmessage = (message) => {
        console.log(JSON.parse(message.data))
    }

    ws.onopen = () => {
        // subscribe both to L2 and L3 real-time channels
        const subscribeL2 = {
            op: 'subscribe',
            channel: 'level2',
            markets: ['BTC/USDC']
        }

        const subscribeL3 = {
            op: 'subscribe',
            channel: 'level3',
            markets: ['BTC/USDC']
        }

        ws.send(JSON.stringify(subscribeL2))
        ws.send(JSON.stringify(subscribeL3))
    }
}

module.exports = {
    getSerumData,
};