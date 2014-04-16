var data = data || {}
data.functions = data.functions || {}
data.variables = data.variables || {}
data.dragon = data.dragon || {}
data.enemies = data.enemies || {}

data.functions.home = function() {

	localStorage.setItem('currentlevel', 'home')

	$('#background').empty()
	$('#background').append('<audio id="music" loop><source src="./sound/adventure.mp3" type="audio/mpeg"></audio>')
	$('#music').hide()[0].play()

	$('.ingame').hide()
	$('.home').show()

}

data.functions.level1 = function() {
	
	localStorage.setItem('currentlevel', 'level1')

	$('#background').empty().css({
		  'margin-left': '-300px'
		, 'margin-top': '-300px'
	})

	$('#background').append('<img id="img" src="./img/levels/level1.png" />')
	$('#background').append('<audio id="music" loop><source src="./sound/overalls.mp3" type="audio/mpeg"></audio>')
	$('#music').hide()[0].play()

	$('#img').css({
		  width: '2000px'
		, height: '2000px'
		, left: '0px'
		, top: '0px'
		, position: 'absolute'
		, 'z-index': '0'
	})

	data.enemies = {}

	generateEnemy({
		  id: generateID()
		, name: 'Farmer 1'
		, img: './img/farmer.png'
		, width: 50
		, height: 50
		, x: -200
		, y: -170
		, power: 1
		, health: 10
		, maxhealth: 10
		, exp: 2
		, mingold: 1
		, maxgold: 5
	})
	generateEnemy({
		  id: generateID()
		, name: 'Farmer 2'
		, img: './img/farmer.png'
		, width: 50
		, height: 50
		, x: -600
		, y: -400
		, power: 1
		, health: 10
		, maxhealth: 10
		, exp: 2
		, mingold: 1
		, maxgold: 5
	})

	generateFinish({
		  img: './img/cave.png'
		, width: 100
		, height: 100
		, x: -1900
		, y: -1900
		, mingold: 5
		, maxgold: 10
	}, 2)

	$('.home').hide()
	$('.ingame').show()

}

data.functions.level2 = function() {

	console.log('level2')

	localStorage.setItem('currentlevel', 'level2')

	$('#background').empty().css({
		  'margin-left': '-300px'
		, 'margin-top': '-300px'
		, width: '4000px'
		, height: '4000px'
	})

	data.enemies = {}

	generateEnemy({
		  id: generateID()
		, name: 'Farmer 1'
		, img: './img/farmer.png'
		, width: 50
		, height: 50
		, x: -2000
		, y: -1700
		, power: 1
		, health: 10
		, maxhealth: 10
		, exp: 2
		, mingold: 1
		, maxgold: 5
	})
	generateEnemy({
		  id: generateID()
		, name: 'Farmer 2'
		, img: './img/farmer.png'
		, width: 50
		, height: 50
		, x: -600
		, y: -400
		, power: 1
		, health: 10
		, maxhealth: 10
		, exp: 2
		, mingold: 1
		, maxgold: 5
	})

	generateFinish({
		  img: './img/cave.png'
		, width: 100
		, height: 100
		, x: -1900
		, y: -1900
		, mingold: 5
		, maxgold: 10
	})

	$('.home').hide()
	$('.ingame').show()

}

function generateID() {
    var text = ""
      , possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for(var i=0; i<10; i++) text += possible.charAt(Math.random()*possible.length)

    return text
}

function generateEnemy(enemy) {

	$('#background').append('<div id="'+enemy.id+'" class="enemy"><div class="health" width="100%"></div><img id="'+enemy.id+'" class="enemy" src="'+enemy.img+'" /></div>')
	$('#'+enemy.id).css({
		  'margin-left': Math.abs(enemy.x) + 'px'
		, 'margin-top': Math.abs(enemy.y) + 'px'
		, 'width': enemy.width + 'px'
		, 'height': enemy.height + 'px'
	})

	data.enemies[enemy.id] = new Enemy(enemy)

}

function generateFinish(finish, level) {
	$('#background').append('<img id="finish" src="'+finish.img+'" />')
	$('#finish').css({
		  'margin-left': Math.abs(finish.x) + 'px'
		, 'margin-top': Math.abs(finish.y) + 'px'
		, 'width': finish.width + 'px'
		, 'height': finish.height + 'px'
	}).hide()

	Hammer($('#finish')[0]).on("tap", function(event) {
		var gold = Math.floor(Math.random()*(finish.maxgold - finish.mingold) + finish.mingold)
		data.functions.increaseGold(gold)
		if(level && parseInt(localStorage.getItem('levelunlocked')) < level) {
			localStorage.setItem('levelunlocked', level)
			$('.home .levels').append('<div class="level" data-func="level'+level+'">Level '+level+'</div>')
			Hammer($('[data-func="level'+level+'"]')[0]).on("tap", function(event) {
				data.functions['level'+level]()
			})
		}
		data.functions.home()
	})
}

for(var i=0; i < $('.level').length; i++) {
	Hammer($('[data-func="level'+(i+1)+'"]')[0]).on("tap", function(event) {
		data.functions['level'+i]()
	})
}

data.functions[localStorage.getItem('currentlevel')]()