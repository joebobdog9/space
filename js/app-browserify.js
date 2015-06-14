"use strict";

// es5 polyfills, powered by es5-shim
require("es5-shim")
    // es6 polyfills, powered by babel
require("babel/register")

var Promise = require('es6-promise').Promise
    // just Node?
    // var fetch = require('node-fetch')
    // Browserify?
    // require('whatwg-fetch') //--> not a typo, don't store as a var

// other stuff that we don't really use in our own code
// var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
// var Router = require('./app.js')

// window.addEventListener('load', app)

// function app() {
// start app
// new Router()
// }


;(function() {
    var Game = function(canvasID) {
        var canvas = document.getElementById(canvasID);
        var screen = canvas.getContext('2d');
        var gameSize = {
            x: canvas.width,
            y: canvas.height
        };
        this.bodies = [new Player(this,gameSize)];
        var self = this;
        var tick = function() {
            self.update();
            self.draw(screen, gameSize);
            requestAnimationFrame(tick);
        };
        tick();
    };

    Game.prototype = {
        update: function() {
        	for (var i = 0; i < this.bodies.length; i++) {
        		this.bodies[i].update();
        	}

        },

        draw: function(screen, gameSize) {
        	screen.clearRect(0,0, gameSize.x, gameSize.y);
        	for (var i = 0; i < this.bodies.length; i++) {
        		drawRect(screen, this.bodies[i]);
        	}
        },

        addBody: function(body) {
      this.bodies.push(body);
    },
        }
    });

    var Player = function(game, gameSize){
    	this.game = game;
    	this.size = { x: 15, y: 15};
    	this.center = {x: gameSize.x / 2, y: gameSize.y - this.size.x};
    	this.keyboarder = new Keyboarder();
    };

    Player.prototype = {
    	update: function(){
    		if(this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)){
    			this.center.x -= 2;
    		} else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)){
    			this.center.x += 2;
    		}
    		if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
    			var bullet = new Bullet ({ x: this.center.x, y: this.center.y - this.size.x % 2},
    			{ x: 0, y: -6});

    			this.game.addBody(bullet)
    };

    var drawRect = function(screen, body){
    	screen.fillRect(body.center.x - body.size.x / 2,  
    					body.center.y - body.size.x / 2, 
    					body.size.x, body.size.y);
    };

    var Keyboarder = function(){
    	var keyState = {};

    	window.onkeydown = function(e){
    		keyState[e.keyCode] = true;
    	};

    	window.onkeyup = function(e){
    		keyState[e.keyCode] = false;
    	};


    	this.isDown = function(keyCode){
    		return keyState[keyCode] === true;
    	};

    	this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
    };

    window.onload = function() {
        new Game("screen");
    }

})();


var Bullet = function(center, velocity)
    	this.size = { x: 3, y: 3};
    	this.center = center;
    	this.velocity = velocity;
    };

    Player.prototype = {
    	update: function(){
    		this.center.x += this.velocity.x;
    		this.center.y += this.velocity.y;
    };

    var drawRect = function(screen, body){
    	screen.fillRect(body.center.x - body.size.x / 2,  
    					body.center.y - body.size.x / 2, 
    					body.size.x, body.size.y);
    };

    var Keyboarder = function(){
    	var keyState = {};

    	window.onkeydown = function(e){
    		keyState[e.keyCode] = true;
    	};

    	window.onkeyup = function(e){
    		keyState[e.keyCode] = false;
    	};


    	this.isDown = function(keyCode){
    		return keyState[keyCode] === true;
    	};

    	this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
    };

    window.onload = function() {
        new Game("screen");
    }

})
