
(function(){

    /**
     * Async chain.
     *
     * Chain an array of asynchronous functions, assuming the last argument is the callback.
     * Upon calling, the first function will be called immediately.
     *
     * Each asynchain has its own scope. Therefore, you can easily create an asynchain within another.
     *
     * The callback has two properties: index and next.
     *  - {int} index:  (read-only) returns the index of the function (within the chain) last called.
     *                  Set before the actual call, so a function can derive its index within the chain.
     *  - {int} last: (read-only) returns the index of the last function within the chain. Cannot change.
     *  - {int} next:   dictates which function (by its index) is called next. Can be changed before using callback. Default is index + 1.
     *
     * @author Nicky Out
     */

    /**
     * Create a new async chain.
     */
    function asynchain()
    {
        new scope(Array.prototype.slice.call(arguments), this);
    }

    var scope = function(fnArray, ctx)
    {
        this.ctx = ctx;
        this.fn = fnArray;
        this.result = this.result.bind(this);
        this.index = 0;
        this.next = 0;
        Object.defineProperties(this.result, {
            'next': {
                get: (function(){
                    return this.next;
                }).bind(this),
                set: (function(value){
                    this.next = value;
                }).bind(this)
            },
            'index': {
                get: (function(){
                    return this.index;
                }).bind(this)
            },
            'last': {
                get: (function(){
                    return this.fn.length - 1;
                }).bind(this)
            }
        });
        this.exec([]);
    };

    scope.prototype.exec = function(args)
    {
        //console.log('executing ' + this.next + ' with [' + args.join(',') + ']');

        var next = this.next,
            fn = this.fn[next];

        // Assume last arg is callback
        args.push(this.result);

        this.index = next;
        this.next = next + 1;
        fn.apply(this.ctx, args);
    };

    scope.prototype.result = function()
    {
        //console.log('fetching result (index = ' + this.index + ', ' + this.next + ')');
        var args = Array.prototype.slice.call(arguments);
        this.exec(args);
    };

    module.exports = asynchain;
}).call(this);
