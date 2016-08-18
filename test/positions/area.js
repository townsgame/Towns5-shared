
console.log('Testing TOWNS.Area');




//======================================================================================================================Errors



describe('Testing TOWNS.Area that could not be created because of', function () {


    it('less than 2 params', function () {

        expect(function () {
            new TOWNS.Area()
        }).toThrow();
        expect(function () {
            new TOWNS.Area(new TOWNS.Position(10, 10))
        }).toThrow();
        expect(function () {
            new TOWNS.Area(
                new TOWNS.Position(10, 10),
                new TOWNS.Position(10, 15)
            )
        }).toThrow();


    });


    it('duplicite positions', function () {


        expect(function () {
            new TOWNS.Area(
                new TOWNS.Position(10, 10),
                new TOWNS.Position(10, 15),
                new TOWNS.Position(10, 15)
            )
        }).toThrow();


    });


    it('3 positions on same line', function () {


        expect(function () {
            new TOWNS.Area(
                new TOWNS.Position(10, 10),
                new TOWNS.Position(20, 20),
                new TOWNS.Position(30, 30)
            )
        }).toThrow();


        expect(function () {
            new TOWNS.Area(
                new TOWNS.Position(10, 10),
                new TOWNS.Position(-20, -20),
                new TOWNS.Position(30, 30)
            )
        }).toThrow();

    });


    it('all positions on same line', function () {


        expect(function () {
            new TOWNS.Area(
                new TOWNS.Position(10, 10),
                new TOWNS.Position(1, 1),
                new TOWNS.Position(5, 5),
                new TOWNS.Position(6, 6),
                new TOWNS.Position(1000000, 1000000),
                new TOWNS.Position(20, 20),
                new TOWNS.Position(-7777, -7777),
                new TOWNS.Position(30, 30)
            )
        }).toThrow();


    });

});


//======================================================================================================================



describe('Testing TOWNS.Area square', function () {


    beforeAll(function () {

        this.area = new TOWNS.Area(
            new TOWNS.Position(0, 0),
            new TOWNS.Position(10, 0),
            new TOWNS.Position(10, 10),
            new TOWNS.Position(0, 10)
        );

    });


    it('isContaining', function () {

        expect(this.area.isContaining(new TOWNS.Position(0, 0))).toBe(true);
        expect(this.area.isContaining(new TOWNS.Position(10, 0))).toBe(true);
        expect(this.area.isContaining(new TOWNS.Position(5, 5))).toBe(true);
        expect(this.area.isContaining(new TOWNS.Position(6, 6))).toBe(true);
        expect(this.area.isContaining(new TOWNS.Position(-5, 5))).toBe(false);
        expect(this.area.isContaining(new TOWNS.Position(-1, 0))).toBe(false);

    });

});



describe('Testing TOWNS.Area triangle', function () {


    beforeAll(function () {

        this.area = new TOWNS.Area(
            new TOWNS.Position(0, 0),
            new TOWNS.Position(10, 0),
            new TOWNS.Position(0, 10)
        );

    });


    it('isContaining', function () {

        expect(this.area.isContaining(new TOWNS.Position(0, 0))).toBe(true);
        expect(this.area.isContaining(new TOWNS.Position(10, 0))).toBe(true);
        expect(this.area.isContaining(new TOWNS.Position(5, 5))).toBe(true);
        expect(this.area.isContaining(new TOWNS.Position(6, 6))).toBe(false);
        expect(this.area.isContaining(new TOWNS.Position(-5, 5))).toBe(false);
        expect(this.area.isContaining(new TOWNS.Position(-1, 0))).toBe(false);

    });

});