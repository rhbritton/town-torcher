var data = data || {}
data.functions = data.functions || {}
data.variables = data.variables || {}
data.dragon = data.dragon || {}
data.enemies = data.enemies || {}



data.functions.attackEnemy = function(event, enemy) {
	$('#'+enemy.id).attr('data-attacking', true)
	$('#dragon').attr('data-attacking', true)
	
	if(event) data.functions.moveDragon(-event.gesture.touches[0].offsetX+enemy.x, -event.gesture.touches[0].offsetY+enemy.y)

	if(!attacking) {
		attackTimer = setInterval(data.functions.continueAttacking, 1000)
		attacking = true
	}

}

data.functions.continueAttacking = function() {

	$('.enemy[data-attacking]').each(function(i, enemy) {
		data.functions.performAttack(enemy)
	})

}

data.functions.stopAttacking = function() {
	attacking = false
	$('#dragon').removeAttr('data-attacking')
	$('#fire').hide()
	clearTimeout(attackTimer)
}

data.functions.performAttack = function(enemy) {

	$('#fire').show()
	data.enemies[enemy.id].health -= data.dragon.power
	if(data.enemies[enemy.id].health <= 0) {
		data.functions.detectEnemies()
		data.enemies[enemy.id].health = 0
		$('div#'+enemy.id+' .health').css('width', (data.enemies[enemy.id].health/data.enemies[enemy.id].maxhealth)*100 + '%')
		setTimeout(function() {
			data.functions.destroyEnemy(enemy)
			data.functions.stopAttacking()
		}, 1000)
	} else {
		$('div#'+enemy.id+' .health').css('width', (data.enemies[enemy.id].health/data.enemies[enemy.id].maxhealth)*100 + '%')
		data.dragon.health -= data.enemies[enemy.id].power
	}

	
	localStorage.setItem('health', data.dragon.health)
	if(data.dragon.health <= 0) {
		data.dragon.health = 0
		data.functions.dragonDies()
	}

	$('.controls .health .amount').css('width', (data.dragon.health/data.dragon.maxhealth)*100 + '%')
	
}

data.functions.destroyEnemy = function(enemy) {
	if(data.enemies[enemy.id]) {
		data.functions.increaseExp(data.enemies[enemy.id].exp)

		var gold = Math.floor(Math.random()*(data.enemies[enemy.id].maxgold - data.enemies[enemy.id].mingold) + data.enemies[enemy.id].mingold)
		data.functions.increaseGold(gold)

		$('div#'+enemy.id).remove()
		delete data.enemies[enemy.id]

		if(!Object.keys(data.enemies).length) $('#finish').show()
	}
}

data.functions.dragonDies = function() {
	data.functions.stopAttacking()
	var lost_gold = Math.floor(0.1*parseInt(localStorage.getItem('gold')))
	localStorage.setItem('gold', parseInt(localStorage.getItem('gold')) - lost_gold)
	$('.gold_message').text('-'+lost_gold+' gold!').delay(1000).fadeIn(100).css({ color: 'red' }).animate({ top: '30%', opacity: '0' }, 1000, function() {
		$(this).css({ top: '45%', opacity: '1' }).hide()
	})

	setTimeout(function() {
		data.functions.home()
		localStorage.setItem('health', 1)
		$('.controls .health .amount').css('width', (1/parseInt(localStorage.getItem('maxhealth')))*100 + '%')
	}, 1000)
}