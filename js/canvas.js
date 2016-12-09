(function () {

    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame     ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            window.oRequestAnimationFrame       ||
            window.msRequestAnimationFrame      ||

        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    function log(msg) {
	   
       console.log(msg);
    }

    function Util () {
        
        this.now = new Date;
    }

    // all about type

    Util.prototype.paytha = function (a, b) {
        
        var c = Math.sqrt((a * a) + (b * b));

        return c;
    };

    Util.prototype.isC = function (v1, v2) {

        var xDistance = (v1.x - v2.x);
        var yDistance = (v1.y - v2.y);
        var distanceBetween = Math.sqrt((xDistance * xDistance) + (yDistance *yDistance));

        var sumOfRadius = 25;

        if (Math.round(distanceBetween) < sumOfRadius) {
            return true;
        } else {
            return false;
        }
    };

    // all about type

    Util.prototype.type = function (datatype) {
        
        return Object.prototype.toString.call(datatype).match(/\[object (\w+)\]/)[1];
    };

    // maths

    Util.prototype.rand = function (min, max) {

        if (arguments.length == 2) {
            return Math.round(Math.random() * (max - min + 1) + min);
        } else {
            return Math.floor(Math.random() * min  + 1);
        }
    };

    // date

    Util.prototype.date = function () {
        var date = this.now;

        return ( date.getMonth() + 1 ) +
                ":" + 
                (date.getDate()) + 
                ":" +
                (date.getFullYear());
    };

    Util.prototype.time = function () {
        var now = this.now;

        return now.getHours() + 
                ':' +
                ((now.getMinutes() < 10) 
                ? ("0" + now.getMinutes()) 
                : (now.getMinutes())) + 
                ':' + 
                ((now.getSeconds() < 10) 
                ? ("0" + now.getSeconds()) 
                : (now.getSeconds()));
    };

    Util.prototype.extend = function (obj1, obj2) {

        for(var key in obj2)

            if(obj2.hasOwnProperty(key))
                obj1[key] = obj2[key];

        return obj1;
    };

    Util.prototype.logEach = function (array) {

        for (var i = 0, length = array.length; i < length; i++)
            log(array[i]);
    };

    Util.prototype.range = function (x, y, arr, action) {

        if(action)
            for (var i = x, len = y; i < len; i++)
                action(arr[i]);
    };

    Util.prototype.rC = function (len, action) {

        if(action)
            for (var i = 0; i < len; i++)
                action(i);
    };

    Util.prototype.each = function (array, action) {

        for (var i = 0, len = array.length; i < len; i++)
            action(array[i], i);
    };

    Util.prototype.reduce = function (action, base, array) {

        this.each(array, function (element) {
            base = action(base, element);
        });

        return base;
    };

    Util.prototype.map = function (func, array) {
        var results = [];

        this.each(array, function (element) {
           results.push(func(element));
        });

        return results;
    };

    Util.prototype.group = function (start, msg) {
        console.group(start);
        console.log(msg);
        console.groupEnd(start);
    };

    Util.prototype.addEvent = function(elem, type, handler) {
    
        if (document.addEventListener) {
            elem.addEventListener(type, handler, false)
        } else {
            elem.attachEvent("on" + type, handler)
        }
    };

    Util.prototype.removeEvent = function(elem, type, handler) {
        if (document.addEventListener) {
            elem.removeEventListener(type, handler, false)
        } else {
            elem.detachEvent("on" + type, handler)
        }
    };

    function Progress () {

        this.temp = "temp";
    }

    Progress.prototype.linear = function (progress) {
        
        return progress;
    };

    Progress.prototype.quad = function (progress) {
        
        return Math.pow(progress, 2);
    };

    Progress.prototype.circ = function (progress) {
        
        return 1 - Math.sin(Math.acos(progress));
    };

    Progress.prototype.back = function (progress, x) {
        
        return Math.pow(progress, 2) * ((x + 1) * progress - x);
    };

    Progress.prototype.bounce = function (progress) {
        for(var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (progress >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
            }
        }
    };

    Progress.prototype.elastic = function (progress, x) {
        
        return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*x/3*progress);
    };


    function Canvas (els) {
        this.canvas = els;
        this.ctx = els.getContext('2d');
        // this.util = new Util();
        Util.call(this);
        Progress.call(this);
    }

    Canvas.prototype = Object.create(Util.prototype);
    Canvas.prototype.constructor = Canvas;

    //canvas property

    Canvas.prototype.mode = function(is) {
        
        if (is == "global") {
            var ctx = this;
            for (var key in ctx) {
                window[key] = ctx[key];
            }
        } else {
            if (is.length > 0) {
                throw "Please enter global as a parameter";
            } else {
                throw "Please enter global if you want to use all method globally";
            }
        }
    };

    Canvas.prototype.logs = function (clr) {

        var tmp =   '<span class="clr-chit">' + 
                        clr +
                        '<small class="removeclrchit close" style="cursor: pointer;margin: 0 16px;">✖</small>'+
                    '</span>';

        $(".logs").append(tmp);

    	$(".removeclrchit").on("click", function () {
    		$(this).parent().remove();
    	});
    };

    Canvas.prototype.background = function (clr) {

        this.canvas.style.backgroundColor = clr;
    };

    Canvas.prototype.height = function (arg) {

        if(arg) { this.canvas.height = arg; this.canvas.style.height = arg + "px"; }
        else return this.canvas.height;
    };

    Canvas.prototype.width = function (arg) {

        if(arg) this.canvas.height = arg;
        else return this.canvas.width;
    };

    Canvas.prototype.halfHeight = function () {

        return this.canvas.height/2;
    };

    Canvas.prototype.halfWidth = function () {

        return this.canvas.width/2;
    };

    //canvas path

    Canvas.prototype.pFill = function () {
        
        var ctx = this.ctx;

        return ctx.fill();
    };

    Canvas.prototype.pStroke = function () {
        
        var ctx = this.ctx;

        ctx.stroke();
        return this;
    };

    Canvas.prototype.path = function (arg) {
        
        var ctx = this.ctx;

        if(arg == "begin") return ctx.beginPath();
        else return ctx.closePath();
    };

    Canvas.prototype.arc = function (x,y,r,sAngle,eAngle,counterclockwise) {
        
        var ctx = this.ctx;

        return ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
    };

    Canvas.prototype.move = function (x, y) {
        
        var ctx = this.ctx;

        return ctx.moveTo(x, y);
    };

    Canvas.prototype.mLine = function (x, y) {
        
        var ctx = this.ctx;

        return ctx.lineTo(x, y);
    };

    Canvas.prototype.arcTo = function (x1,y1,x2,y2,r) {
        
        var ctx = this.ctx;

        return ctx.arcTo(x1,y1,x2,y2,r);
    };

    Canvas.prototype.bezier = function (cp1x,cp1y,cp2x,cp2y,x,y) {
        
        var ctx = this.ctx;

        return ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
    };

    Canvas.prototype.quadratic = function (cpx,cpy,x,y) {
        
        var ctx = this.ctx;

        return ctx.quadraticCurveTo(cpx,cpy,x,y);
    };

    Canvas.prototype.inPath = function (x, y) {
        
        var ctx = this.ctx;

        return ctx.isPointInPath(x, y);
    };

    //line property

    Canvas.prototype.line = function (x, y, x1, y1) {
        var ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x1,y1);
        ctx.stroke();
        ctx.closePath();
    };

    Canvas.prototype.lineCap = function (lineCap) {

        var ctx = this.ctx;
        
        return this;
    };

    Canvas.prototype.lineJoin = function (lineJoin) {

        var ctx = this.ctx;
        
        ctx.lineJoin = lineJoin;
        return this;
    };

    Canvas.prototype.lineWidth = function (lineWidth) {

        var ctx = this.ctx;
        
        ctx.lineWidth = lineWidth;

        return this;
    };

    Canvas.prototype.miterLimit = function (miterLimit) {

        var ctx = this.ctx;
        ctx.miterLimit = miterLimit;

        return this;
    };

    // text

    Canvas.prototype.text = function (style, msg, x, y) {

        var ctx = this.ctx, len = arguments.length;

        if(style) ctx.font = style;
        if(msg && x && y ) ctx.fillText(msg, x, y);
    };

    Canvas.prototype.fill = function (clr) {

        this.ctx.fillStyle = clr;
        this.ctx.fill();

        return this;
    };

    Canvas.prototype.scale = function (x, y) {

        this.ctx.scale(x,y);

        return this;
    };

    Canvas.prototype.flipH = function (x) {
        var ctx = this.ctx;

        ctx.translate(x, 0);
        ctx.scale(-1, 1);
        ctx.translate(x, 0);

        return this;
    };

    Canvas.prototype.rotate = function (angle) {

        this.ctx.rotate(angle);

        return this;
    };

    Canvas.prototype.on = function (el, event, callback) {

        el.addEventListener(event, callback, false);
    };

    Canvas.prototype.translate = function (x, y) {

        this.ctx.translate(x, y);

        return this;
    };

    Canvas.prototype.transform = function (a,b,c,d,e,f) {

        this.ctx.transform(a,b,c,d,e,f);

        return this;
    };

    Canvas.prototype.setTransform = function (a,b,c,d,e,f) {

        this.ctx.setTransform(a,b,c,d,e,f);

        return this;
    };

    Canvas.prototype.save = function () {

        this.ctx.save();

        return this;
    };

    Canvas.prototype.restore = function () {

        this.ctx.restore();

        return this;
    };

    Canvas.prototype.clear = function () {
        
        this.ctx.clearRect(0, 0, this.width(), this.height());
        
        return this;
    };

    Canvas.prototype.shadow = function (clr, width) {
    
        var ctx = this.ctx, len = arguments.length;

        if (len == 2 ) {
            ctx.shadowBlur = width;
            ctx.shadowColor = clr;
        } else if (clr) {
            ctx.shadowColor = clr;
        } else {
            ctx.shadowBlur = width;
        }

        return this;
    };

    Canvas.prototype.img = function (img, x, y, width, height, destX, destY, destWidth, destHeight) {
    	var ctx = this.ctx;

    	if (arguments.length === 3) {
    		ctx.drawImage(img, x, y);
    	} else if (arguments.length === 5) {
    	   ctx.drawImage(img, x, y, width, height);
    	} else {
    	   ctx.drawImage(img, x, y, width, height, destX, destY, destWidth, destHeight);
    	}
    };

    Canvas.prototype.rect = function (x, y, width, height, radius) {
        var ctx = this.ctx, xwidth = x + width, yheight = y + height;

        function bRect (ctx) {
            ctx.moveTo(x + radius, y);
            ctx.lineTo(xwidth - radius, y);
            ctx.quadraticCurveTo(xwidth, y, xwidth, y + radius);
            ctx.lineTo(xwidth, y + height - radius);
            ctx.quadraticCurveTo(xwidth, yheight, xwidth - radius, yheight);
            ctx.lineTo(x + radius, yheight);
            ctx.quadraticCurveTo(x, yheight, x, yheight - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
        }

        ctx.beginPath();

        if( radius ) bRect(ctx);
        else ctx.rect(x, y, width, height);

        ctx.stroke();
        ctx.closePath();

        return this;
    };

    Canvas.prototype.ellipse = function (x, y, width, height) {
        var ctx = this.ctx;
        ctx.beginPath();

        x = x || 0;
        y = y || 0;

    	if (width == height) {

            ctx.arc(x, y, width/2, 0, Math.PI * 2, false);
    	} else {

       	    ctx.moveTo(x, y-height/2);

            ctx.bezierCurveTo(
        		x + width/2, y - height/2, // C1
        		x + width/2, y + height/2, // C2
        		x, y + height/2); // A2

      	 ctx.bezierCurveTo(
        		x - width/2, y + height/2, // C3
        		x - width/2, y - height/2, // C4
        		x, y - height/2); // A1
    	}

      ctx.stroke();
      ctx.closePath();

      return this;
    };

    Canvas.prototype.drawEllipse = function(centerX, centerY, width, height) {

        var context = this.ctx;

        context.beginPath();
        context.moveTo(centerX, centerY - height/2); // A1
        context.bezierCurveTo(
            centerX + width/2, centerY - height/2, // C1
            centerX + width/2, centerY + height/2, // C2
            centerX, centerY + height/2); // A2
        context.bezierCurveTo(
            centerX - width/2, centerY + height/2, // C3
            centerX - width/2, centerY - height/2, // C4
            centerX, centerY - height/2); // A1
        context.fillStyle = "red";
        context.fill();
        context.closePath();
    };

    Canvas.prototype.set = function (options) {
        var settings, util = this.util, ctx = this.ctx;

        settings = util.extend({
        }, options);

        for ( var key in settings) {
            if(ctx.hasOwnProperty(key))
                ctx[key] = settings[key];
        }

        return this;
    };

    function extend(Child, Parent) {

        Child.prototype = inherit(Parent.prototype)
        Child.prototype.constructor = Child
        Child.parent = Parent.prototype
    }

    function inherit(proto) {

        function F() {}
        F.prototype = proto
        
        return new F
    }

    window._ = function(selector) {
        var selectorType = 'querySelectorAll', els;

        if (selector.indexOf('#') === 0) {
            selectorType = 'getElementById';
            selector = selector.substr(1, selector.length);
        }
        
        els = document[selectorType](selector);

        return new Canvas(els);
    };

    window.anim = function (callback, options) {

        if(arguments.length > 0)
            requestID = requestAnimFrame(callback);
        else
            cancelAnimationFrame(requestID);
    };

}());

var PVector = function(x, y) {
    this.x = x;
    this.y = y;
};

PVector.prototype.add = function(v) {
  this.y = this.y + v.y;
  this.x = this.x + v.x;
};

PVector.prototype.sub = function(vector2) {
    this.x = this.x - vector2.x;
    this.y = this.y - vector2.y;
};

PVector.prototype.mult = function(n) {
   this.x = this.x * n;
   this.y = this.y * n;
}

PVector.prototype.div = function(n) {
   this.x = this.x / n;
   this.y = this.y / n;
}

PVector.prototype.mag = function() {
    
    return sqrt(this.x*this.x + this.y*this.y);
};

PVector.prototype.normalize = function() {
    var m = this.mag();

    if (m > 0) {
        this.div(m);
    }
};
