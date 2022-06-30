import {Feature} from "ol";



export interface BuildingInfo {
 floors : string[],
 groundFloor : string,
 center : number[]
 rotation : number,
 zoom : number,
 minZoom : number,
 maxZoom : number,
}

export const buildingsInfo = new Map<string, BuildingInfo>()

 buildingsInfo.set('Cheseaux', {
  floors : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
  groundFloor : 'E',
  center : [741335.0, 5906150],
  rotation : 0.674,
  zoom : 18,
  minZoom : 16,
  maxZoom : 23,
 })

buildingsInfo.set('St-Roch', {
 floors : ['0', '1', '2', '3', '4'],
 groundFloor : '0',
 center : [739955.0, 5906400],
 rotation : -0.495,
 zoom : 19,
 minZoom : 16,
 maxZoom : 23,
})

