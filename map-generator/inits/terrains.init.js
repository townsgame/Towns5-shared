
/**
 * @author ©Towns.cz
 * @fileOverview ...
 */
//======================================================================================================================
//-----------------------Creating namespace Towns.MapGenerator
var Towns = Towns || {};
Towns.MapGenerator = Towns.MapGenerator || {};
var A/*Actual Namespace*/ = Towns.MapGenerator;
//-----------------------

//-----------------------Loading modules if running under node js
if(typeof window=='undefined'){

    A.Terrain = require(__dirname+'/../classes/terrain.class.js');

}
//-----------------------
//======================================================================================================================



A.terrains = module.exports = [
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 0 ,color: '#000000', size: 1}}, name: 'temnota'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 1 ,color: '#337EFA', size: 1}}, name: 'moře'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 2 ,color: '#545454', size: 1}}, name: 'dlažba'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 3 ,color: '#EFF7FB', size: 1}}, name: 'sníh/led'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 4 ,color: '#F9F98D', size: 1}}, name: 'písek'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 5 ,color: '#878787', size: 1}}, name: 'kamení'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 6 ,color: '#5A2F00', size: 1}}, name: 'hlína'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 7 ,color: '#EFF7FB', size: 1}}, name: 'sníh/led'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 8 ,color: '#2A7302', size: 1}}, name: 'tráva(normal)'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 9 ,color: '#51F311', size: 1}}, name: 'tráva(toxic)'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 10,color: '#535805', size: 1}}, name: 'les'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 11,color: '#337EFA', size: 1}}, name: 'řeka'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 12,color: '#8ABC02', size: 1}}, name: 'tráva(jaro)'}),
    new A.Terrain({type:'terrain', design: {type:'terrain', data:{image: 13,color: '#8A9002', size: 1}}, name: 'tráva(pozim)'})
];


A.terrains[5].bindVirtualObject({
    type: 'natural',
    design: {
        type: 'natural',
        data:{
            image:'rock'
        }
    }

});

A.terrains[10].bindVirtualObject({
    type: 'natural',
    design: {
        type: 'natural',
        data:{
            image:'tree'
        }
    }

});

