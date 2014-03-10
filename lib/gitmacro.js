module.exports = function(repo, asymple){

    return {
        status: function(resultCallback)
        {
            gitCommand(repo, 'status', [], resultCallback);
        },

        add: function(files, resultCallback)
        {

        }
    };

    /**
     * Generic git command.
     * @param target
     * @param command
     * @param args
     * @param callback
     */
    function gitCommand(target, command, args, callback)
    {
        this.callback = callback;
        this.data = {
            error: null,
            index: callback.index
        };

        args.unshift(target);
        var f = target[command];

        if (!f)
        errorChecker.call(this, {
            msg: "No function " + command + " on target " + target
        }, null);

        asymple(
            f.bind.apply(f, args),
            errorChecker.bind(this)
        )
    }

    /**
     * Generic handle git command response
     * @param error
     * @param result
     */
    function errorChecker(error, result)
    {
        var callback = this.callback;

        if (error)
        {
            // Goto end, return failure
            this.data.error = error;

            callback.next = callback.last;
            callback(this.data);
        }
        else
            callback(result);
    }

};

