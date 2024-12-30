// icon imports
import markerIcon from "./marker-icon.png" 
import markerShadow from "./marker-shadow.png"
import markerIcon2x from "./marker-icon-2x.png"

import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerShadow,
  shadowUrl: markerIcon2x
});

export default L;
