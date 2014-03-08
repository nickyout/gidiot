
(function(){
    function asynchain(fnArray)
    {
        new scope(fnArray);
    }

    var scope = function(fnArray)
    {
        this.fn = fnArray;
        this.result = this.result.bind(this);
        this.index = 0;
        this.setIndex = false;
        Object.defineProperty(this.result, 'index', {
            get: (function(){
                return this.index;
            }).bind(this),
            set: (function(value){
                this.setIndex = true;
                this.index = value;
            }).bind(this)
        });
        this.exec([]);
    };

    scope.prototype.exec = function(args)
    {
        var index = this.index,
            fnDef = this.fn[index];

        console.log('executing ' + index + ' with [' + args.join(',') + ']');

        var ctx = fnDef[0],
            fn = fnDef[1],
            appendArgs = fnDef.slice(2);

        args = args.concat(appendArgs);

        // last arg is callback
        args.push(this.result);

        fn.apply(ctx, args);
    };

    scope.prototype.result = function()
    {
        console.log('fetching result (index = ' + this.index + ', ' + this.setIndex + ')');

        // For binding, later
        if (!this.setIndex)
            this.index += 1;

        this.setIndex = false;

        var args = Array.prototype.slice.call(arguments);
        this.exec(args);
    };

    module.exports = asynchain;
}).call(this);
