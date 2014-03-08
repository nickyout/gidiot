(function()
{
    /**
     * Gift API: https://github.com/notatestuser/gift#api
     * Keypress API: https://github.com/TooTallNate/keypress
     */
    console.log('Initializing module');
    var git = require('gift'),
        prompt = require('prompt'),
        keypress = require('keypress'),
        Jetty = require("jetty"),
        asynchain = require('./lib/asynchain');

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


    asynchain([
        [this, function(callback)
        {
            // listen for the "keypress" event
            keypress(process.stdin);
            callback('keypress');
            process.stdin.setRawMode(true);
            process.stdin.resume();
        }],

        [process.stdin, process.stdin.on],

        [this, function (ch, key, callback)
        {
            //jetty.moveTo([0,0]);
            callback.index = callback.index;
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
        }]
    ]);


}).call(this);