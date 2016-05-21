
console.log('Testing T.Path');




//======================================================================================================================Errors



describe('Testing path that could not be created because of', function () {

    beforeAll(function () {

        this.now = new Date()/1;
        this.future = this.now + 10000;
        this.past = this.now - 10000;
        this.invalid_date = new Date('xxx');

    });


    it('empty path', function () {

        var self=this;

        expect(function(){new T.Path()})
            .toThrow();

    });


    it('params are not T.Position', function () {

        var self=this;

        expect(function(){new T.Path(123, 345)})
            .toThrow();
        expect(function(){new T.Path(123, new T.PositionDate(1, 2, self.now))})
            .toThrow();

    });


    it('tahre is only one position', function () {

        var self=this;

        expect(function(){new T.Path(new T.PositionDate(1, 2, self.now))})
            .toThrow();

    });


    it('invalid date', function () {

        var self=this;

        expect(function(){new T.Path(
            new T.PositionDate(1, 2, self.now),
            new T.PositionDate(1, 2, self.invalid_date)
        )})
            .toThrow();

    });


    it('same date', function () {

        var self=this;

        expect(function(){new T.Path(
            new T.PositionDate(1, 2, self.now),
            new T.PositionDate(1, 2, self.now)
        )})
            .toThrow();


        expect(function(){new T.Path(
            new T.PositionDate(1, 2, self.now),
            new T.PositionDate(1, 2, self.future),
            new T.PositionDate(1, 2, self.future)
        )})
            .toThrow();

    });


    it('wrong date order', function () {

        var self=this;

        expect(function(){new T.Path(
            new T.PositionDate(1, 2, self.now),
            new T.PositionDate(1, 2, self.future),
            new T.PositionDate(1, 2, self.past)
        )})
            .toThrow();


        expect(function(){new T.Path(
            new T.PositionDate(1, 2, self.now),
            new T.PositionDate(1, 2, self.past),
            new T.PositionDate(1, 2, self.future)
        )})
            .toThrow();

    });

});


//======================================================================================================================Success


describe('Testing path that could be created because of', function () {

    beforeAll(function () {

        this.now = new Date()/1;
        this.future = this.now + 600000;
        this.past = this.now - 600000;
        this.invalid_date = new Date('xxx');

    });

    it('correct date order', function () {

        var self=this;

        expect(function(){new T.Path(
            new T.PositionDate(1, 2, self.past),
            new T.PositionDate(1, 2, self.now),
            new T.PositionDate(1, 2, self.future)
        )})
            .not.toThrow();

    });


});

//======================================================================================================================Path from now


[
    new Date()/1,
    new Date()/1+6,
    new Date()/1+60000,
    new Date()/1+600000000,
    new Date()/1-6,
    new Date()/1-60000,
    new Date()/1-600000000,
    new Date()/1-6666666666

].forEach(function(date) {


    describe('Testing path that begins ' + (new Date(date)), function () {


        beforeAll(function () {

            this.date = date;

            this.path = new T.Path(
                new T.PositionDate(10, 10, new Date(this.date + 0 * 1000)),
                new T.PositionDate(10, 20, new Date(this.date + 1 * 1000)),
                new T.PositionDate(10, 40, new Date(this.date + 2 * 1000)),
                new T.PositionDate(20, 40, new Date(this.date + 3 * 1000)),
                new T.PositionDate(40, 40, new Date(this.date + 4 * 1000)),
                new T.PositionDate(0, 0, new Date(this.date + 5 * 1000))
            );


        });



        it('countSegment', function () {

            expect(this.path.countSegment(this.date - 999999)).toEqual(0);
            expect(this.path.countSegment(this.date)).toEqual(0);
            expect(this.path.countSegment(this.date + 1)).toEqual(0);
            expect(this.path.countSegment(this.date + 1000)).toEqual(1);
            expect(this.path.countSegment(this.date + 1500)).toEqual(1);
            expect(this.path.countSegment(this.date + 2000)).toEqual(2);
            expect(this.path.countSegment(this.date + 2001)).toEqual(2);
            expect(this.path.countSegment(this.date + 3000)).toEqual(3);
            expect(this.path.countSegment(this.date + 4000)).toEqual(4);
            expect(this.path.countSegment(this.date + 4010)).toEqual(4);
            expect(this.path.countSegment(this.date + 5000)).toEqual(4);
            expect(this.path.countSegment(this.date + 6000)).toEqual(4);
            expect(this.path.countSegment(this.date + 999999999)).toEqual(4);

        });



        it('countPosition', function () {

            expect(this.path.countPosition(this.date)).toEqual(new T.Position(10, 10));
            expect(this.path.countPosition(this.date + 1).x).toBeCloseTo(10);
            expect(this.path.countPosition(this.date + 1000)).toEqual(new T.Position(10, 20));

        });


        it('countRotation', function () {

            expect(this.path.countRotation(this.date - 999999)).toEqual(90);
            expect(this.path.countRotation(this.date)).toEqual(90);
            expect(this.path.countRotation(this.date + 1)).toEqual(90);
            expect(this.path.countRotation(this.date + 1000)).toEqual(90);
            expect(this.path.countRotation(this.date + 1500)).toEqual(90);
            expect(this.path.countRotation(this.date + 2000)).toEqual(0);
            expect(this.path.countRotation(this.date + 2001)).toEqual(0);
            expect(this.path.countRotation(this.date + 3000)).toEqual(0);
            expect(this.path.countRotation(this.date + 4000)).toEqual(180 + 45);
            expect(this.path.countRotation(this.date + 4010)).toEqual(180 + 45);
            expect(this.path.countRotation(this.date + 5000)).toEqual(180 + 45);
            expect(this.path.countRotation(this.date + 6000)).toEqual(180 + 45);
            expect(this.path.countRotation(this.date + 999999999)).toEqual(180 + 45);

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
         new T.PositionDate(10,10),
         new T.PositionDate(10,20),
         new T.PositionDate(10,40),
         new T.PositionDate(20,40),
         new T.PositionDate(40,40),
         new T.PositionDate( 0, 0)
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
