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
    console.log('Initializing module');
    var asymple = require('./lib/asymple'),
        git = require('gift'),
        prompt = require('prompt'),
        keypress = require('keypress'),
        Jetty = require("jetty"),
        createMenu = require("terminal-menu"),
        menu = require("./lib/menu")(createMenu, {
            config: {
                width: 29, x: 4, y: 2,
                fg: 'blue', bg: 'white',
                padding: { left: 2, right: 2, top: 1, bottom: 1 }
            },
            sep: '-'.grey
        });

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

        help: function(callback)
        {
            console.log('Sorry, can\'t help you.');
            callback.next = callback.last;
            callback();
        },

        end: function(callback)
        {
            console.log('Exit');
        }
    };

    asymple(
        function(callback) {
            callback('gidiot');
        },
        menus.start,
        menus.help,
        menus.end
    );


    /*
    var repo = git('.');

    prompt.get(['username'.white, 'email'.white], function (err, result) {
        //
        // Log the results.
        //
        console.log('Command-line input received:');
        console.log('  username: ' + result.username);
        console.log('  email: ' + result.email);


        repo.current_commit(function(error, returnVal)
        {
            console.log('Read repo:');
            console.log(returnVal);
        });
    });
    */

    //var jetty = new Jetty(process.stdout);
    //jetty.clear();
    //jetty.text("hello world");
    //jetty.moveTo([0,0]);
    //jetty.text("hello panda");

    // make `process.stdin` begin emitting "keypress" events

    /*
    asymple.call(this,

        function(callback)
        {
            // listen for the "keypress" event
            keypress(process.stdin);
            callback('keypress', callback);
            process.stdin.setRawMode(true);
            process.stdin.resume();
        },

        process.stdin.on.bind(process.stdin),

        function (ch, key, callback)
        {
            //jetty.moveTo([0,0]);
            callback.next = callback.index;
            if (!key)
                return;

            var i=0;
            for (var name in key)
            {
                var str = name + ': ';
                str += key[name] + '; ';
                //jetty.moveTo([i,0]);
                //jetty.text(str + '               \n');
                console.log(str);
                i++;
            }
            if (key && key.ctrl && key.name == 'c') {
                process.stdin.pause();
            }
        }
    );
    */


}).call(this);