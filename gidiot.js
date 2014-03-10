(function()
{
    /**
     * Gift API: https://github.com/notatestuser/gift#api
     *
     * Keypress API: https://github.com/TooTallNate/keypress
     *  - {String} char: contains keyboard character. Shift works as well.
     *  - {String} key.name: identifier for special buttons (up, down, left, right)
     *  - {Boolean} key.shift: does not trigger by itself
     *  - {Boolean} key.ctrl: does not trigger by itself. Does not trigger for all combinations...
     */
    var path = process.argv[2] || '.';
    console.log('Initializing module on ' + path);

    var createMenu = require("terminal-menu"),
        keypress = require('keypress'),
        prompt = require('prompt'),
        asymple = require('./lib/asymple'),
        menu = require("./lib/menu")(createMenu, {
            config: {
                width: 29, x: 4, y: 2,
                fg: 'blue', bg: 'white',
                padding: { left: 2, right: 2, top: 1, bottom: 1 }
            },
            sep: '-'.grey
        });

    var gift = require('gift'),
        gitmacro = require('./lib/gitmacro')(gift(path), asymple);

    var menus = {
        start: function(name, callback)
        {
            var ng = parseInt(Math.random() * 10000).toString(16);
            menu({
                header: "WELCOME!",
                story: "Welcome, " + name + "!",
                options: [
                    { label: 'HELP!' },
                    { label: 'My NAME is ' + ng, args: [ng], next: callback.index },
                    { label: 'EXIT', next: callback.last }
                ]
            }, callback);
        },

        help: function(result, callback)
        {
            console.log('Status result is:'.yellow, result.clean, result.files);
            callback.next = callback.last;
            callback({ success: true, index: callback.index });
        },

        end: function(report)
        {
            if (!report)
                console.log('Success');
            else
                console.log('Failure:', report.error);

        }
    };

    asymple(
        function(callback) {
            callback('gidiot');
        },
        menus.start,
        gitmacro.status,
        menus.help,
        menus.end
    );



}).call(this);