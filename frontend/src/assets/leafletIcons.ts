import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: './marker-icon.png',
  iconRetinaUrl: './marker-icon-2x.png',
  shadowUrl: './marker-shadow.png',
});

export default L;
