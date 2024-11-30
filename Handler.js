class Handler {
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    async handle(input) {
        if (this.nextHandler) {
            return this.nextHandler.handle(input)
        }
        return null
    }

}

module.exports = Handler;