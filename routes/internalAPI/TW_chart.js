const { Single } = require('rsocket-flowable');

const statuses = {
    PENDING: 'pending',
    CANCELLED: 'cancelled',
};

function getRequestHandler(payload) {
    let status = statuses.PENDING;

    console.log(`requestResponse request`, payload);

    return new Single((subscriber) => {
        function handleCancellation() {
            status = statuses.CANCELLED;
        }

        subscriber.onSubscribe(() => handleCancellation());

        /**
         * Leverage `setTimeout` to simulate a delay
         * in responding to the client.
         */
        setTimeout(() => {
            if (status === statuses.CANCELLED) {
                return;
            }

            const msg = `${new Date()}`;
            console.log(`requestResponse response`, msg);
            try {
                subscriber.onComplete({
                    data: msg,
                    metadata: null, // or new Buffer(...)
                });
            } catch (e) {
                subscriber.onError(e);
            }
        }, 100);
    });
}

module.exports = {
    getRequestHandler,
};