
/**
 * @author ©Towns.cz
 * @fileOverview Creates class TOWNS.MapGenerator.Biotope
 */
//======================================================================================================================


namespace TOWNS.MapGenerator {

    interface BiotopeItemAmountObject{
        amount: number;
        terrain: TOWNS.Objects.Terrain;
    }

    interface BiotopeItemFromObject{
        from: number;
        terrain: TOWNS.Objects.Terrain;
    }


    export class Biotope{


        public terrains: Array<BiotopeItemFromObject>;

        /**
         *
         * @param {Array} terrains
         * @constructor
         */
        constructor(biotopeItemAmountObjects: Array<BiotopeItemAmountObject>) {

            var sum = 0;
            biotopeItemAmountObjects.forEach(function (biotopeItemAmountObject) {
                sum += biotopeItemAmountObject.amount;
            });



            var from = 0;
            this.terrains = biotopeItemAmountObjects.map(function (biotopeItemAmountObject: BiotopeItemAmountObject) {

                var biotopeItemFromObject: BiotopeItemFromObject =
                {
                    from: from / sum,
                    terrain: biotopeItemAmountObject.terrain
                };
                from += biotopeItemAmountObject.amount;

                return(biotopeItemFromObject);

            });



        }


        /**
         *
         * @param {number} z
         * @returns {TOWNS.Objects.Terrain}
         */
        getZTerrain(z: number):TOWNS.Objects.Terrain {


            for (var i = this.terrains.length - 1; i >= 0; i--) {

                if (z >= this.terrains[i].from) return (this.terrains[i].terrain);

            }


        }


    }


}