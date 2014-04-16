var data = data || {}
data.functions = data.functions || {}
data.variables = data.variables || {}
data.dragon = data.dragon || {}
data.enemies = data.enemies || {}

// document.getElementById('start').addEventListener('click', data.functions.startTimer)
localStorage.setItem('power', parseInt(localStorage.getItem('power')) || 2)
localStorage.setItem('health', parseInt(localStorage.getItem('health')) || 1)
localStorage.setItem('maxhealth', parseInt(localStorage.getItem('maxhealth')) || 15)
localStorage.setItem('experience', parseInt(localStorage.getItem('experience')) || 0)
localStorage.setItem('gold', parseInt(localStorage.getItem('gold')) || 0)
localStorage.setItem('currentlevel', localStorage.getItem('currentlevel') || 'home')
localStorage.setItem('levelunlocked', parseInt(localStorage.getItem('levelunlocked')) || 1)

var background = document.getElementById('background')

data.variables.background = {
	  element: background
	, x: background.style['margin-left'].replace('px', '')
	, y: background.style['margin-top'].replace('px', '')
	, width: background.style.width.replace('px', '')
	, height: background.style.height.replace('px', '')
}

data.dragon = {
	  width: 80
	, height: 40
	, power: parseInt(localStorage.getItem('power'))
	, health: parseInt(localStorage.getItem('health'))
	, maxhealth: parseInt(localStorage.getItem('maxhealth'))
}

var healthPercent = (data.dragon.health/data.dragon.maxhealth)*100
$('.controls .health .amount').css('width', healthPercent+'%')

for(var i=0; i<localStorage.getItem('levelunlocked'); i++) {
	$('.home .levels').append('<div class="level" data-func="level'+(i+1)+'">Level '+(i+1)+'</div>')
}

Hammer($('.exit')[0]).on("tap", function(event) {
	data.functions.home()
})

Hammer($('.mute')[0]).on("tap", function(event) {
	var $music = $('#music')
	if($music[0].paused) $music[0].play()
	else $music[0].pause()
})

setInterval(function() {
	if(data.dragon.health < data.dragon.maxhealth) {
		localStorage.setItem('health', ++data.dragon.health)
		$('.controls .health .amount').css('width', (data.dragon.health/data.dragon.maxhealth)*100+'%')
	}
}, 15000)

data.functions.updateLevel = function() {
	var level = Math.floor(Math.sqrt(parseInt(localStorage.getItem('experience'))))
	  , thisLevelExp = (level)*(level)
	if(thisLevelExp == 1) thisLevelExp = 0
	var nextLevelExp = (level+1)*(level+1)
	  , expPercent = 100-(((nextLevelExp-parseInt(localStorage.getItem('experience')))/(nextLevelExp-thisLevelExp))*100)

	if(expPercent >= 100) {
		expPercent = 0
		$('.controls .experience .amount').css('width', '100%')
	}
	
	
	$('.controls .experience .amount').css('width', expPercent+'%')
	if(!level) level = 1 
	$('.controls .dragonlevel').text(level)
}

data.functions.increaseExp = function(exp) {
	$('.exp_message').text('+'+exp+' exp!').show().css({ color: 'blue' }).animate({ top: '30%', opacity: '0' }, 1000, function() {
		$(this).css({ top: '45%', opacity: '1' }).hide()
	})
	localStorage.setItem('experience', parseInt(localStorage.getItem('experience'))+exp)
	data.functions.updateLevel()
}

data.functions.updateGold = function() {
	$('.controls .gold .amount').text(parseInt(localStorage.getItem('gold')))
}

data.functions.increaseGold = function(gold) {
	$('.gold_message').text('+'+gold+' gold!').delay(1000).fadeIn(100).css({ color: 'gold' }).animate({ top: '30%', opacity: '0' }, 1000, function() {
		$(this).css({ top: '45%', opacity: '1' }).hide()
	})
	localStorage.setItem('gold', parseInt(localStorage.getItem('gold'))+gold)
	data.functions.updateGold()

}

data.functions.updateLevel()
data.functions.updateGold()