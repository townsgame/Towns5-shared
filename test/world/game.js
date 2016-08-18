console.log('Testing TOWNS.World.game');



describe('Building price should', function() {


    beforeAll(function(){

        var data = require(__dirname+'/building-01.json');
        var building = new TOWNS.Objects.Building(data);
        //console.log(building);
        this.price = TOWNS.World.game.getObjectPrice(building);

    });



    it('be instance of TOWNS.Resources', function () {
        expect(this.price instanceof TOWNS.Resources).toEqual(true);
    });





});

