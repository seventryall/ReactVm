define("css", function() {
    'use strict';
    return {
        load: function(name, require, load, config) {

            function inject(filename) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.href = filename;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                head.appendChild(link);
            }

            inject(requirejs.toUrl(name));
            load(true);
        },
        pluginBuilder: './css-build'
    };
});