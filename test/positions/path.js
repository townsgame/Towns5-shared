
console.log('Testing TOWNS.Path');




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

        expect(function(){new TOWNS.Path()})
            .toThrow();

    });


    it('params are not TOWNS.Position', function () {

        var self=this;

        expect(function(){new TOWNS.Path(123, 345)})
            .toThrow();
        expect(function(){new TOWNS.Path(123, new TOWNS.PositionDate(1, 2, self.now))})
            .toThrow();

    });


    it('there is only one position', function () {

        var self=this;

        expect(function(){new TOWNS.Path(new TOWNS.PositionDate(1, 2, self.now))})
            .toThrow();

    });


    it('invalid date', function () {

        var self=this;

        expect(function(){new TOWNS.Path(
            new TOWNS.PositionDate(1, 2, self.now),
            new TOWNS.PositionDate(1, 2, self.invalid_date)
        )})
            .toThrow();

    });


    it('same date', function () {

        var self=this;

        expect(function(){new TOWNS.Path(
            new TOWNS.PositionDate(1, 2, self.now),
            new TOWNS.PositionDate(1, 2, self.now)
        )})
            .toThrow();


        expect(function(){new TOWNS.Path(
            new TOWNS.PositionDate(1, 2, self.now),
            new TOWNS.PositionDate(1, 2, self.future),
            new TOWNS.PositionDate(1, 2, self.future)
        )})
            .toThrow();

    });


    it('wrong date order', function () {

        var self=this;

        expect(function(){new TOWNS.Path(
            new TOWNS.PositionDate(1, 2, self.now),
            new TOWNS.PositionDate(1, 2, self.future),
            new TOWNS.PositionDate(1, 2, self.past)
        )})
            .toThrow();


        expect(function(){new TOWNS.Path(
            new TOWNS.PositionDate(1, 2, self.now),
            new TOWNS.PositionDate(1, 2, self.past),
            new TOWNS.PositionDate(1, 2, self.future)
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

        expect(function(){new TOWNS.Path(
            new TOWNS.PositionDate(1, 2, self.past),
            new TOWNS.PositionDate(1, 2, self.now),
            new TOWNS.PositionDate(1, 2, self.future)
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

            this.path = new TOWNS.Path(
                new TOWNS.PositionDate(10, 10, new Date(this.date + 0 * 1000)),
                new TOWNS.PositionDate(10, 20, new Date(this.date + 1 * 1000)),
                new TOWNS.PositionDate(10, 40, new Date(this.date + 2 * 1000)),
                new TOWNS.PositionDate(20, 40, new Date(this.date + 3 * 1000)),
                new TOWNS.PositionDate(40, 40, new Date(this.date + 4 * 1000)),
                new TOWNS.PositionDate(0, 0, new Date(this.date + 5 * 1000))
            );


        });


        it('getPositions', function () {

            var positions = this.path.getPositions();

            expect(positions[0]).toEqual(new TOWNS.Position(10,10));
            expect(positions[1]).toEqual(new TOWNS.Position(10,20));
            expect(positions[2]).toEqual(new TOWNS.Position(10,40));
            expect(positions[5]).toEqual(new TOWNS.Position(0,0));



        });


        it('inProgress', function () {

            expect(this.path.inProgress(this.date - 999999)).toBe(false);
            expect(this.path.inProgress(this.date)).toBe(true);
            expect(this.path.inProgress(this.date + 1)).toBe(true);
            expect(this.path.inProgress(this.date + 1000)).toBe(true);
            expect(this.path.inProgress(this.date + 2000)).toBe(true);
            expect(this.path.inProgress(this.date + 3000)).toBe(true);
            expect(this.path.inProgress(this.date + 4000)).toBe(true);
            expect(this.path.inProgress(this.date + 5000)).toBe(false);
            expect(this.path.inProgress(this.date + 999999)).toBe(false);

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

            expect(this.path.countPosition(this.date)).toEqual(new TOWNS.Position(10, 10));
            expect(this.path.countPosition(this.date + 1).x).toBeCloseTo(10);
            expect(this.path.countPosition(this.date + 1000)).toEqual(new TOWNS.Position(10, 20));

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
            expect(this.path.countSpeed(this.date + 1000)).toEqual(20);
            expect(this.path.countSpeed(this.date + 1001)).toEqual(20);
            expect(this.path.countSpeed(this.date + 4500)).toBeCloseTo(Math.sqrt(2) * 40);
            expect(this.path.countSpeed(this.date + 4999)).toBeCloseTo(Math.sqrt(2) * 40);
            expect(this.path.countSpeed(this.date + 4100)).toEqual(this.path.countSpeed(this.date + 4200));
            expect(this.path.countSpeed(this.date + 5000)).toBeCloseTo(0);
            expect(this.path.countSpeed(this.date + 999999)).toEqual(0);

        });





    });


});




//======================================================================================================================Path constant



describe('Testing path that begins now and it is constant', function() {


    beforeAll(function(){

        this.date = new Date()/1;

         this.path = TOWNS.Path.newConstantSpeed([
         new TOWNS.Position(10,10),
         new TOWNS.Position(10,20),
         new TOWNS.Position(10,40),
         new TOWNS.Position(20,40),
         new TOWNS.Position(40,40),
         new TOWNS.Position( 0, 0)
         ],5);

        //console.log('genereted path --->');
        //console.log(this.path.toString());


    });




    it('countPosition', function () {

        expect(this.path.countPosition(this.date)).toEqual(new TOWNS.Position(10,10));
        expect(this.path.countPosition(this.date+1).x).toBeCloseTo(10);
        expect(this.path.countPosition(this.date+9999999)).toEqual(new TOWNS.Position(0,0));

    });



    it('countRotation', function () {

        expect(this.path.countRotation(this.date-999999)).toEqual(90);
        expect(this.path.countRotation(this.date+999999999)).toEqual(180+45);

    });



    it('countSpeed', function () {


        expect(this.path.countSpeed(this.date+10)).toBe(5);


        for(var i=200;i>0;i--) {

            var testspeed = this.path.countSpeed(this.date + Math.random() * 999999);
            testspeed=Math.round(testspeed*100)/100;
            expect([0,5].indexOf(testspeed)).not.toBe(-1);//todo better solution ex: .toBe(0).or.toBe(5)?
        }

    });



    it('inProgress', function () {

        expect(this.path.inProgress(this.date-999999)).toBe(false);
        //expect(this.path.inProgress(this.date)).toBe(true);//todo
        expect(this.path.inProgress(this.date+1)).toBe(true);
        expect(this.path.inProgress(this.date+999999)).toBe(false);

    });



});




//======================================================================================================================Clonning and JSON



describe('Testing path can be', function() {

    beforeAll(function () {

        this.date = new Date() / 1 -1000;

        this.path = new TOWNS.Path(
            new TOWNS.PositionDate(10, 10, new Date(this.date + 0 * 60000)),
            new TOWNS.PositionDate(10, 20, new Date(this.date + 1 * 60000)),
            new TOWNS.PositionDate(10, 20, new Date(this.date + 2* 60000))
        );

    });



    it('converted and deconverted to and from JSON.', function () {

        this.path_clone1 = new TOWNS.Path(...JSON.parse(JSON.stringify(this.path)));
        this.path_clone2 = new TOWNS.Path(...JSON.parse(JSON.stringify(this.path_clone1)));

        //console.log(this.path.toString());
        //console.log(this.path_clone1.toString());
        //console.log(this.path_clone2);


        expect(this.path_clone1).not.toBe(this.path);
        expect(this.path_clone1).toEqual(this.path);


        expect(this.path_clone2).not.toBe(this.path);
        expect(this.path_clone2).toEqual(this.path);


        expect(this.path_clone1).not.toBe(this.path_clone2);
        expect(this.path_clone1).toEqual(this.path_clone2);

    });


});
