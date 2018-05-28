HTMLElement.prototype.onSwipe = HTMLElement.prototype.onSwipe || function(direction, callback) {

    var el = this,
        started = false,
        tx = {
            start: 0,
            end: 0
        },
        ty = {
            start: 0,
            end: 0
        },
        actions = {
            left: function() {},
            right: function() {},
            top: function() {},
            down: function() {}
        };

    var act = actions[direction];

    actions[direction] = function() {
        act();
        callback();
    };

    el.addEventListener('touchstart', function(e) {

        if (e.touches.length != 1 || started) {
            return;
        }
        started = true;
        var touch = e.changedTouches[0];
        tx.start = touch.pageX;
        ty.start = touch.pageY;


    }, false);

    el.addEventListener('touchend', function(e) {
        var touch = e.changedTouches[0];
        tx.end = touch.pageX;
        ty.end = touch.pageY;
        handleGesture();
    }, false);

    function handleGesture() {
        started = false;
        var a = '';

        if (tx.end + 20 <= tx.start) {
            a = 'left';
        } else

        if (tx.end >= tx.start + 20) {
            a = 'right';
        } else

        if (ty.end <= ty.start) {
            a = 'top';
        } else

        if (ty.end >= ty.start) {
            a = 'down';
        } else

        if (ty.end === ty.start) {
            console.log('Tap');
        }

        actions[a]();
    }
};
