var data = data || {}
data.functions = data.functions || {}
data.variables = data.variables || {}
data.dragon = data.dragon || {}
data.enemies = data.enemies || {}

function Enemy(data) {
	this.id = data.id
	this.img = data.img
	this.name = data.name
	this.width = data.width
	this.height = data.height
	this.x = data.x
	this.y = data.y
	this.power = data.power
	this.health = data.health
	this.maxhealth = data.maxhealth
	this.exp = data.exp
	this.mingold = data.mingold
	this.maxgold = data.maxgold
}