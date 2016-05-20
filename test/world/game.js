console.log('Testing T.World.game');



describe('Building price should', function() {


    beforeAll(function(){

        var data = require(__dirname+'/building-01.json');
        var building = new T.Objects.Building(data);
        //console.log(building);
        this.price = T.World.game.getObjectPrice(building);

    });



    it('be instance of T.Resources', function () {
        expect(this.price instanceof T.Resources).toEqual(true);
    });





});

