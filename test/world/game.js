console.log('Testing T.World.game');



describe('Building price', function() {


    beforeAll(function(){

        this.building = require('building-01.json');
        this.price = T.World.game.getObjectPrice(building);

    });



    it('positive', function () {
        expect(typeof price.wood).toEqual('number');
        expect(typeof price.stone).toEqual('number');
        expect(typeof price.iron).toEqual('number');
        expect(typeof price.clay).toEqual('number');
    });





});

