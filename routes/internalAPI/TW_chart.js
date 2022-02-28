const { Single } = require('rsocket-flowable');
const { Flowable } = require('rsocket-flowable');

const statuses = {
    PENDING: 'pending',
    CANCELLED: 'cancelled',
};

function handleFireAndForget() {
    console.log("11")
}

function handleRequestResponse(payload) {
    return new Single((subscriber) => {
    console.log(subscriber, 1)
    });
}

function handleRequestStream(payload) {
    const flowable = new Flowable((subscriber) => {
        // lambda is not executed until `subscribe()` is called
        let dataToSend = {test:"asdas"}; //get data from db if db has changes and send data to page
        subscriber.onSubscribe({
            cancel: () => {
                /* no-op */
            },
            request: (n) => {
                subscriber.onNext({
                    data: JSON.stringify(dataToSend),
                    metadata: null,
                });
                // subscriber.onComplete();
                let test = 1
                setInterval(function(){
                    dataToSend = {test:test};
                    subscriber.onNext({
                        data: JSON.stringify(dataToSend),
                        metadata: null,
                    });
                    test++;
                    // subscriber.onComplete();
                }, 1000);

            },
        });
    });

    flowable.subscribe({
        // onComplete: () => console.log('done'),
        // onError: (error) => console.error(error),
        // onNext: (value) => console.log(value),
        onSubscribe: (sub) => sub.request(Infinity),
    });
    return flowable;
}

function handleRequestChannel(payload) {
    return new Flowable((subscriber) => {
        console.log(subscriber, 3)
    });
}

function handleMetadataPush(payload) {
    return new Single((subscriber) => {
        console.log(subscriber, 4)
    });
}

function getRequestHandler(payload) {
    const single = new Single((subscriber) => {
        const id = setTimeout(() => subscriber.onComplete('hello!'), 250);
        // Cancellation callback is optional
        subscriber.onSubscribe(() => clearTimeout(id));
    });

    single.subscribe({
        onComplete: (data) => console.log(data),
        onError: (error) => console.error(error),
        onSubscribe: (cancel) => {
            // console.log(cancel)
            /* call cancel() to stop onComplete/onError */
        },
    });
    return single;
}

module.exports = {
    getRequestHandler,
    handleFireAndForget,
    handleRequestResponse,
    handleRequestStream,
    handleRequestChannel,
    handleMetadataPush,
};