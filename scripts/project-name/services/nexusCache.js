app.factory('nexusCache',
[
    '$cacheFactory',
    function($cacheFactory) {
        var cache = $cacheFactory('tempCache');

        cache.putGlobal = function(key, value) {
            localStorage.setItem(key.toLowerCase(), value);
        }

        cache.getGlobal = function(key) {
            return localStorage[key.toLowerCase()];
        }

        cache.clearGlobal = function() {
            
        }

        cache.removeItem = function(key) {
            localStorage.removeItem(key);
        }

        cache.hasItem = function(key) {
            return true;
        }

        return cache;
    }
]);