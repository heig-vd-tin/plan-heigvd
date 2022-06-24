import {Feature} from "ol";



interface BuildingInfo {
 floors : string[],
 groundFloor : string,
 center : number[]
 rotation : number,
 zoom : number,
 minZoom : number,
 maxZoom : number,
}

export const buildingsInfo = new Map<string, BuildingInfo>()

/*
resources.set('bus', {
  img : 'bus.png',
  coordinates : [[741250.0, 5906010], [741270.0, 5905975]]
})
*/

 buildingsInfo.set('Cheseaux', {
  floors : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
  groundFloor : 'E',
  center : [741325.0, 5906150],
  rotation : 0.674,
  zoom : 18,
  minZoom : 16,
  maxZoom : 23,
 })


