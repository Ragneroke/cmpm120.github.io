//Here is the play state, all the update function are implement in this state
//If player collect all the scores or touch the baddies, jump to Game Over state
Play.prototype = {
	init: function() {
		health = 3;
	},

	preload: function() {


	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//Set up bounds of world
		game.world.setBounds(0, 0, 1600, 1600);

		//Set up the total enemies numbers
		this.count = 1;


		//Set the tilemap of the game
		game.stage.setBackgroundColor('#87CEEB');
		this.map = game.add.tilemap('stage0');
		this.map.addTilesetImage('common', 'test');

		//New tilemaplayer object
		this.groundLayer = this.map.createLayer('BackGround');
		this.wallLayer = this.map.createLayer('Collision');
		this.groundLayer.resizeWorld();
		this.map.setCollisionByExclusion([], true, this.wallLayer);



		//Create the player
		this.player = new Players(game, game.world.centerX-300, 1900, 'slimeAll', 1,this.wallLayer);
		game.add.existing(this.player);
		game.camera.follow(this.player);


		//Create baddies in this stage

		this.baddie1 = new BaddiesA(game, game.world.centerX, 900, 'leafSprite', 1, this.player,this.wallLayer,this);
		game.add.existing(this.baddie1);

		//Set up collectable element in the map
		this.fire1 = new BonFire(game,game.world.centerX-300, 1600, 'bonfire', 1, this.player);
		game.add.existing(this.fire1);

		//Set up the portal of the level
		this.portal1 = new Portal(game,game.world.centerX-500, 875, 'portal', 1, this.player,1, this);
		game.add.existing(this.portal1);

		//Setup background music
		this.bgmMusic = game.add.audio('bgm');
		this.bgmMusic.volume = 0.2;
		this.bgmMusic.play();
		this.openMusic = game.add.audio('open');
		this.openMusic.volume = 0.2;


		//Setup the Hud here
		//Setup the text for health
		this.healthText = game.add.text(16, 16, 'HP:');
		this.healthText.fixedToCamera = true;
		this.healthText.cameraOffset.setTo(15,15);
		this.healthText.font = 'ZCOOL KuaiLe';
		this.healthText.fill = '#ffffff';
		this.healthText.setShadow(3, 3, 'rgba(1,1,0.8,0.3)', 5);

		this.health = game.add.group();
		this.setHealth(this.player.maxHealth);

		

		//Create the cursor of the game
		cursors = game.input.keyboard.createCursorKeys();
		fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		//Set up a level title to this stage
		this.level = game.add.sprite(0,0,'level1');
		this.level.fixedToCamera = true;
		this.level.cameraOffset.setTo(0,0);
		this.fade = game.add.tween(this.level).to( { alpha: 0 },2000, Phaser.Easing.Linear.None, true);

		//Set up instruction for first level

		this.insText1 = game.add.text(game.world.centerX - 500,1800, '←↑→↓ to move!');
		this.insText1.font = 'ZCOOL KuaiLe';
		this.insText1.fill = '#000000';

		this.insText2 = game.add.text(game.world.centerX - 500,1550, 'Absorb Element to get Bullets!');
		this.insText2.font = 'ZCOOL KuaiLe';
		this.insText2.fill = '#000000';

		this.insText3 = game.add.text(game.world.centerX - 300,900, 'Defeat all enemies to activate the portal!');
		this.insText3.font = 'ZCOOL KuaiLe';
		this.insText3.fill = '#000000';



	},

	update: function() {
		this.portal1.count = this.count;
	},

	setHealth:function(health){
		for(var i = 0; i < health; i++){
			var hp = game.add.sprite(0,0,'aid');
			hp.scale.setTo(0.1,0.1);
			hp.fixedToCamera = true;
			hp.cameraOffset.setTo(50 + i* 25,50);
			this.health.add(hp);

		}

	},
	//Debug the collision from tile map
	render:function(){
		// game.debug.body(this.baddie1);
	}


}

