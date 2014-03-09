module.exports = function(createMenu, defaultConfig){

    /**
     * Define a menu as such:
     *  {
     *      story: "String\nNew line",
     *      options: [
     *          { label: "String", args: ['passed to callback'] [, next: index ]}
      *     ]
     *  }
     *
     */
    return function(menuDef, callback)
    {
        var header = menuDef.header && menuDef.header.split('\n'),
            story = menuDef.story && menuDef.story.split('\n'),
            options = menuDef.options,
            config = menuDef.config || defaultConfig.config,
            sep = menuDef.sep || defaultConfig.sep;

        var output = [],
            sepLine = sep && separatorLine(sep, config.width);

        var menu = createMenu(config),
            i;

        if (header)
        {
            for (i=0; i<header.length; i++)
                output.push(header[i].bold);
            sepLine && output.push(sepLine);
        }

        if (story)
        {
            output = output.concat(story);
            sepLine && output.push(sepLine);
        }

        // Clear screen
        menu.reset();

        for (i=0; i<output.length; i++)
            menu.write(output[i] + '\n');

        for (i=0; i<options.length; i++)
            menu.add(options[i].label);

        menu.on('select', function(label)
        {
            menu.close();

            var args = [], next = callback.next, opt;
            for (i=0; i<options.length; i++)
            {
                opt = options[i];
                if (opt.label != label)
                    continue;

                // found...
                if (opt.hasOwnProperty('args'))
                    args = opt.args;
                if (opt.hasOwnProperty('next'))
                    next = opt.next;
                break;
            }

            callback.next = next;
            callback.apply(this, args);
        });

        menu.createStream().pipe(process.stdout);
  };

    function separatorLine(char, width)
    {
        var str = '';
        var i =0;
        while (i++ < width - 1)
            str += char;
        return str;
    }
};