console.log('Testing path.class.js');


//======================================================================================================================Path from now


[
    new Date(),
    new Date()+1,
    new Date()+10000,
    new Date()+100000000,
    new Date()-1,
    new Date()-10000,
    new Date()-100000000

].forEach(function(date) {


    describe('Testing path that begins ' + date, function () {


        beforeAll(function () {

            this.date = date;

            this.path = new T.Path(
                new T.PositionTime(10, 10, new Date(this.date + 0 * 1000)),
                new T.PositionTime(10, 20, new Date(this.date + 1 * 1000)),
                new T.PositionTime(10, 40, new Date(this.date + 2 * 1000)),
                new T.PositionTime(20, 40, new Date(this.date + 3 * 1000)),
                new T.PositionTime(40, 40, new Date(this.date + 4 * 1000)),
                new T.PositionTime(0, 0, new Date(this.date + 5 * 1000))
            );


        });


        it('countPosition', function () {

            expect(this.path.countPosition(this.date)).toEqual(new Position(10, 10));
            expect(this.path.countPosition(this.date + 1)).x.toBeCloseTo(10);
            expect(this.path.countPosition(this.date + 1000)).toEqual(new Position(10, 20));

        });


        it('countRotation', function () {

            expect(this.path.countPosition(this.date - 999999)).toEqual(90);
            expect(this.path.countPosition(this.date)).toEqual(90);
            expect(this.path.countPosition(this.date + 1)).toEqual(90);
            expect(this.path.countPosition(this.date + 1000)).toEqual(90);
            expect(this.path.countPosition(this.date + 1500)).toEqual(90);
            expect(this.path.countPosition(this.date + 2000)).toEqual(90);
            expect(this.path.countPosition(this.date + 2001)).toEqual(0);
            expect(this.path.countPosition(this.date + 3000)).toEqual(0);
            expect(this.path.countPosition(this.date + 4000)).toEqual(0);
            expect(this.path.countPosition(this.date + 4010)).toEqual(180 + 45);
            expect(this.path.countPosition(this.date + 5000)).toEqual(180 + 45);
            expect(this.path.countPosition(this.date + 6000)).toEqual(180 + 45);
            expect(this.path.countPosition(this.date + 999999999)).toEqual(180 + 45);

        });


        it('countSpeed', function () {

            expect(this.path.countSpeed(this.date - 999999)).toEqual(0);
            expect(this.path.countSpeed(this.date)).toEqual(10);
            expect(this.path.countSpeed(this.date + 1)).toEqual(10);
            expect(this.path.countSpeed(this.date + 1000)).toEqual(10);
            expect(this.path.countSpeed(this.date + 1001)).toEqual(20);
            expect(this.path.countSpeed(this.date + 4500)).toBeCloseTo(Math.sqrt(2) * 40);
            expect(this.path.countSpeed(this.date + 5000)).toBeCloseTo(Math.sqrt(2) * 40);
            expect(this.path.countSpeed(this.date + 999999)).toEqual(0);

        });


        it('inProgress', function () {

            expect(this.path.countSpeed(this.date - 999999)).toBe(false);
            expect(this.path.countSpeed(this.date)).toBe(true);
            expect(this.path.countSpeed(this.date + 1)).toBe(true);
            expect(this.path.countSpeed(this.date + 1000)).toBe(true);
            expect(this.path.countSpeed(this.date + 2000)).toBe(true);
            expect(this.path.countSpeed(this.date + 3000)).toBe(true);
            expect(this.path.countSpeed(this.date + 4000)).toBe(true);
            expect(this.path.countSpeed(this.date + 5000)).toBe(false);
            expect(this.path.countSpeed(this.date + 999999)).toBe(false);

        });


    });


});


//======================================================================================================================Path constant



describe('Testing path that begins now and it is constant', function() {


    beforeAll(function(){


         this.path = T.Path.newConstantSpeed([
         new T.PositionTime(10,10),
         new T.PositionTime(10,20),
         new T.PositionTime(10,40),
         new T.PositionTime(20,40),
         new T.PositionTime(40,40),
         new T.PositionTime( 0, 0)
         ],5);



    });




    it('countPosition', function () {

        expect(this.path.countPosition(this.date)).toEqual(new Position(10,10));
        expect(this.path.countPosition(this.date+1)).x.toBeCloseTo(10);
        expect(this.path.countPosition(this.date+9999999)).toEqual(new Position(0,0));

    });



    it('countRotation', function () {

        expect(this.path.countPosition(this.date-999999)).toEqual(90);
        expect(this.path.countPosition(this.date+999999999)).toEqual(180+45);

    });



    it('countSpeed', function () {

        for(var i=100;i>0;i--) {
            expect(this.path.countSpeed(this.date + Math.random() * 9999999)).toBeCloseTo(5);
        }

    });



    it('inProgress', function () {

        expect(this.path.countSpeed(this.date-999999)).toBe(false);
        expect(this.path.countSpeed(this.date)).toBe(true);
        expect(this.path.countSpeed(this.date+1)).toBe(true);
        expect(this.path.countSpeed(this.date+999999)).toBe(false);

    });



});
