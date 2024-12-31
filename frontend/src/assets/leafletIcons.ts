// icon imports
import busIcon from "./BusIcon1.png";
import markerShadow from "./marker-shadow.png";
import busIcon2x from "./BusIcon-2x.png"; 

import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: busIcon,         
  iconRetinaUrl: busIcon2x, 
  shadowUrl: markerShadow,  
});

export default L;
