var data = data || {}
data.functions = data.functions || {}
data.variables = data.variables || {}
data.dragon = data.dragon || {}
data.enemies = data.enemies || {}

var attackTimer
  , attacking = false

Hammer(data.variables.background.element).on("tap", function(event) {
	$('.enemy').removeAttr('data-attacking')
	if(event.srcElement.className == 'enemy') {
		data.functions.attackEnemy(event, data.enemies[event.srcElement.id])
	} else {
		data.functions.stopAttacking()
		data.functions.moveDragon(-event.gesture.touches[0].offsetX, -event.gesture.touches[0].offsetY)
	}
})

data.functions.moveDragon = function(x, y) {
	var background = document.getElementById('background')
	background.style['margin-left'] = x
	background.style['margin-top'] = y

	data.variables.background.x = parseInt(background.style['margin-left'].replace('px', ''))
	data.variables.background.y = parseInt(background.style['margin-top'].replace('px', ''))
}

data.functions.detectEnemies = function() {

	var dragon = {}
	dragon.x = data.variables.background.x
	dragon.y = data.variables.background.y
	dragon.width = data.dragon.width
	dragon.height = data.dragon.height

	var enemyAttacking = false

	for(var enemy in data.enemies) {
		detectEnemy(enemy)
		enemyAttacking = true
	}

	if(!enemyAttacking) data.functions.stopAttacking()

	function detectEnemy(enemy) {
		if(
			   (dragon.x - dragon.width/2) <= enemy.x
			&& (dragon.y + dragon.height/2) >= (enemy.y - enemy.height)
			&& (dragon.x + dragon.width/2) >= (enemy.x - enemy.width)
			&& (dragon.y - dragon.height/2) <= enemy.y
		) {
			console.log('detected')
			$('#'+enemy.id).attr('data-attacking', true)
			data.functions.attackEnemy(null, enemy)

		}
	}
}