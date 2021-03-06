
/**
 * @author ©Towns.cz
 * @fileOverview Creates instance TOWNS.World.terrains
 */
//======================================================================================================================
namespace TOWNS.World{


    export var terrains = [
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 0 ,color: '#000000', size: 1}}, name: 'temnota'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 1 ,color: '#337EFA', size: 1}}, name: 'moře'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 2 ,color: '#545454', size: 1}}, name: 'dlažba'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 3 ,color: '#EFF7FB', size: 1}}, name: 'sníh/led'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 4 ,color: '#F9F98D', size: 1}}, name: 'písek'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 5 ,color: '#878787', size: 1}}, name: 'kamení'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 6 ,color: '#5A2F00', size: 1}}, name: 'hlína'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 7 ,color: '#EFF7FB', size: 1}}, name: 'sníh/led'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 8 ,color: '#2A7302', size: 1}}, name: 'tráva(normal)'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 9 ,color: '#51F311', size: 1}}, name: 'tráva(toxic)'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 10,color: '#535805', size: 1}}, name: 'les'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 11,color: '#6aa2ff', size: 1}}, name: 'řeka'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 12,color: '#8ABC02', size: 1}}, name: 'tráva(jaro)'}),
        new TOWNS.Objects.Terrain({type:'terrain', design: {type:'terrain', data:{image: 13,color: '#8A9002', size: 1}}, name: 'tráva(pozim)'})
    ];


}


