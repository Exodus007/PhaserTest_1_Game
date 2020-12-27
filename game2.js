var GameScene1 = new Phaser.Class({


    Extends: Phaser.Scene,

    initialize:

    function GameScene1 ()
    {
        
        Phaser.Scene.call(this, { key: 'GameScene1' });
    },

    preload: function ()

    {
        this.load.image('Sky', 'Assets/title.png');
        this.load.image('Messi', 'Assets/Squirrel.png');
        this.load.spritesheet('ch', 'Assets/Animsprite-Mod.png', {frameWidth: 64, frameHeight: 64, endFrame: 7});
    },

    create: function ()
    {
        txt1 = this.add.text(325,275,'CONTROLS: MOUSE');

        txt2= this.add.text(350,250, 'PLAY');
        txt2.setInteractive({ useHandCursor: true });
        txt2.setInteractive().on('pointerdown', function() {
            this.scene.scene.start('GameScene2');
        });
    }
});


var GameScene2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'GameScene2' });
    },
    
    create: function ()
    {
        this.add.text(200,100,'Help Mr.Squeaks find the fresh fruit in the bunch before time runs out');
        var go = this.add.text(500,400,'PROCEED');
        go.setInteractive({ useHandCursor: true });
        go.setInteractive().on('pointerdown', function(){
            this.scene.scene.start('GameScene3');
        })
    },

    update: function()
    {

    }
});

var hunter;
var prey;
var cursors;
let score = 0;
var target = new Phaser.Math.Vector2();
let hit = false;



var GameScene3 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'GameScene3' });
    },
    
    create: function ()
    {
        var j = 10;
        for(i=0;i<j;i++)
        {
            prey = this.physics.add.sprite(Math.random()*680 + 30 ,Math.random()*380 + 30, 'ch');
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('ch', { start: 0, end: 17 }),
                frameRate: 15,
                repeat: -1
            });
            prey.anims.play('left', true);
        }

        hunter = this.physics.add.image(Math.random()*200 + 10, Math.random()*100 + 10, 'Messi');
        hunter.setScale(0.5);
       
       var back = this.add.text(700,20,'BACK');

       back.setInteractive({ useHandCursor: true });

       back.setInteractive().on('pointerdown', function() {
        this.scene.scene.start('GameScene1');
        this.scene.scene.pause('GameScene3');
    });
    },

    update:function()
    {  
        //Mouse Controls
        var distance = Phaser.Math.Distance.Between(hunter.x, hunter.y, target.x, target.y);
        if (hunter.body.speed > 0)
        {
            if (distance < 4)
            {
                hunter.body.reset(target.x, target.y);
            }
        }

        this.input.on('pointerdown', function (pointer) {
            target.x = pointer.x;
            target.y = pointer.y;
            this.physics.moveToObject(hunter, target, 150);
        }, this);

        this.physics.world.collide(hunter, prey, function () {
            hunter.setVelocity(0); 
            prey.destroy(); 
            console.log('Yummy');
            hit = true;
        });

        if(hit == true)
        {
            this.scene.start('GameScene4');
            this.scene.pause('GameScene3');
        }
    }

});

var GameScene4 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'GameScene4' });
    },
    
    create: function ()
    {
       var end = this.add.text(375,250,'YUMMY! YOU FOUND IT');
       var main = this.add.text(400,300, 'HOME');      
       hit = false;

       main.setInteractive({ useHandCursor: true });

        main.setInteractive().on('pointerdown', function() {
        this.scene.scene.start('GameScene1');
        this.scene.scene.pause('GameScene4');
        });
    },

    update:function()
    {    
    }

});


var config = {
    type: Phaser.AUTO,   
    width: 800,
    height:  600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 10,
            maxVelocity: 10
        },


    },
    scale: {
        //we place it in the middle of the page.
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#59BE00',
    //set scenes
    width: 800, // game width
    height: 500,
    scene:[GameScene1, GameScene2, GameScene3, GameScene4]

};

var game = new Phaser.Game(config);