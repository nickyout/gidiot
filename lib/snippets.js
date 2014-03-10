/**
 * Created by nickyout on 3/9/14.
 */

var Jetty = require("jetty")

function verify(iParams, params)
{
    var returnVal = {
        missing: [],
        incorrect: [],
        ok: true
    };
    for (var prop in iParams)
    {
        if (!params)
        {
            returnVal.ok = false;
            returnVal.missing.push('{' + iParams[prop] + '} ' + prop);
        }
        if (what)
        {

        }
    }
    return returnVal;
}

function verifyGitType(property, expected)
{

}

function gitExec(macro, params)
{
    var commands = macro.commands,
        iParams = macro.params;

    /*var verified = verify(macro.params, params);
     if (!verified.ok) { }
     */


}


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

var jetty = new Jetty(process.stdout);
jetty.clear();
jetty.text("hello world");
jetty.moveTo([0,0]);
jetty.text("hello panda");

// make `process.stdin` begin emitting "keypress" events

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
