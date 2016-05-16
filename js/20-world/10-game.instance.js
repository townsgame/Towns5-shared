/**
 * @author ©Towns.cz
 * @fileOverview Creates configuration of game conditions via instance T.World.game
 */
//======================================================================================================================


var K=0.05;


T.World.game = new T.Game(
    {
        //---------------------------------------------Defense
        'defense': new T.Game.Action(
            'PASSIVE',
            {
                'defense': 'number'
            },
            function(params){
                return((params.defense)*800*K);
            },
            T.Resources.newSingles({//todo in future should be resources and k in separate file.
                'wood':   2,
                'clay':   2,
                'stone':  1,
                'iron':   0
            })
        ),
        //---------------------------------------------Regenerate
        'regenerate': new T.Game.Action(
            'PASSIVE',
            {
                'regenerate': 'number'
            },
            function(params){
                return((1/params.regenerate)*3600*K);
            },
            T.Resources.newSingles({
                'wood':   4,
                'clay':   2,
                'stone':  2,
                'iron':   2
            })
        ),
        //---------------------------------------------Repair
        'repair': new T.Game.Action(
            'ACTIVE',
            {
                'repair': 'number'
            },
            function(params){
                return((1/(params.repair/100))*1000*K);
            },
            T.Resources.newSingles({
                'wood':   4,
                'clay':   2,
                'stone':  3,
                'iron':   4
            }),
            function(object,by){

            }
        ),
        //---------------------------------------------Mine
        'mine': new T.Game.Action(
            'PASSIVE',
            {
                'resource': 'string',
                'amount': 'number'
            },
            function(params){
                return((params.amount)*3600*K);
            },
            T.Resources.newSingles({
                'wood':   3,
                'clay':   2,
                'stone':  2,
                'iron':   4
            })
        ),
        //---------------------------------------------Attack
        'attack': new T.Game.Action(
            'ACTIVE',
            {
                'distance': 'number',
                'strength': 'number',
                'rounds': 'number',
                'cooldown': 'number'
            },
            function(params){
                return((Math.pow(params.distance,2)*params.strength*params.rounds*(1/params.cooldown))*100*K);
            },
            T.Resources.newSingles({
                'wood':   2,
                'clay':   0,
                'stone':  3,
                'iron':   2
            }),function(object_attacker,object_attacked,resources_attacker){

                var attacker_attack = object_attacker.getActionAbility('attack');
                var attacker_defence = object_attacker.getActionAbility('defense');
                var attacked_attack = object_attacked.getActionAbility('attack');
                var attacked_defence = object_attacked.getActionAbility('defense');

                
                //---------------------Conditions
                

                if(!attacker_attack instanceof T.Game.ActionAbility){
                    throw new Error('Attacker has not ability to attack');
                }


                //---------------------Empty params

                if(attacker_defence instanceof T.Game.ActionAbility){}else{
                    attacker_defence = new T.Game.ActionAbility({
                        type: 'defense',
                        params: {defense: 0}
                    });
                }
                if(attacked_attack instanceof T.Game.ActionAbility){}else{
                    attacked_attack = new T.Game.ActionAbility({
                        type: 'attack',
                        params: {
                            cooldown: 1,
                            distance: 1,
                            rounds: 0,
                            strength: 0
                        }
                    });
                }
                if(attacked_defence instanceof T.Game.ActionAbility){}else{
                    attacked_defence = new T.Game.ActionAbility({
                        type: 'defense',
                        params: {defense: 0}
                    });
                }


                attacker_attack=attacker_attack.clone();
                attacker_defence=attacker_defence.clone();
                attacked_attack=attacked_attack.clone();
                attacked_defence=attacked_defence.clone();
                //---------------------Defense

                attacker_attack.params.attack-=
                    attacked_defence.params.defense;
                if(attacker_attack.params.attack<0)attacker_attack.params.attack=0;


                
                attacked_attack.params.attack-=
                    attacker_defence.params.defense;
                if(attacked_attack.params.attack<0)attacked_attack.params.attack=0;


                //---------------------


                while(
                    attacker_attack.params.rounds || attacked_attack.params.rounds
                    && attacker.life>1
                    && attacked.life>1
                    ){

                    attacker.life-=attacker_attack.params.attack;
                    attacked.life-=attacker_attack.params.attack;


                    attacker_attack.params.rounds--;
                    attacked_attack.params.rounds--;
                }


                //---------------------


                if(attacker.life<1)attacker.life=1;
                if(attacked.life<1)attacked.life=1;


            }
        ),
        //---------------------------------------------Move
        'move': new T.Game.Action(
            'ACTIVE',
            {
                'speed': 'number'
            },
            function(params){
                return((Math.pow(params.speed,2))*10*K);
            },
            T.Resources.newSingles({
                'wood':   2,
                'clay':   0,
                'stone':  0,
                'iron':   1
            }),
            function(object,position,objects){

            }
        ),
        //---------------------------------------------Throughput
        'throughput': new T.Game.Action(
            'PASSIVE',
            {
                'throughput': 'number'
            },
            function(params){
                return((Math.pow(params.throughput/100,2))*10*K);//todo
            },
            T.Resources.newSingles({
                'wood':   2,
                'clay':   3,
                'stone':  1,
                'iron':   0
            })
        )/**/
        //---------------------------------------------


    },
    T.Math.prettyNumber,
    T.Math.prettyNumber

);