(function(){

    var Jetty = require("jetty"),
        jetty = new Jetty(process.stdout);

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

        var verified = verify(macro.params, params);

        if (!verified.ok)
        {

        }
    }

    module.exports = gitExec;

}).call(this);

