module.exports = function(git){

    var types = {
        'SHA': function(value)
        {

        },
        'Tag': function(value)
        {

        },
        'Treeish': function(value)
        {

        },
        'Remote': function(value)
        {

        }
    };

    /**
     * Return values:
     *  - 1: OK
     *  - 2: Invalid value for type
     *  - 3: type does not exist
     * @param value
     * @param type
     * @returns {number}
     */
    return function(value, type)
    {
        if (!types.hasOwnProperty(type))
            return 3;
        if (!types[type](value))
            return 2;
        return 1;
    }
};
