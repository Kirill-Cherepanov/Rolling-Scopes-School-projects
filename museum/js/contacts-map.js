function initMapboxGLJS() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoia290LXBheWsiLCJhIjoiY2t1aDk5NGswMDU3eTMxcXRvMDhsMnFpNiJ9.SSgICHsGwJsRYTs0vJlqHg';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kot-payk/ckuhcxidv6qh818qj8d5os737',
    center: [2.3364, 48.86091],
    zoom: 15.78,
  });

  map.addControl(new mapboxgl.NavigationControl());
  const marker1 = new mapboxgl.Marker({
    color: "#000000",
  }).setLngLat([2.3364, 48.86091]).addTo(map);
  const marker2 = new mapboxgl.Marker({
    color: "#808080",
  }).setLngLat([2.3333, 48.8602]).addTo(map);
  const marker3 = new mapboxgl.Marker({
    color: "#808080",
  }).setLngLat([2.3397, 48.8607]).addTo(map);
  const marker4 = new mapboxgl.Marker({
    color: "#808080",
  }).setLngLat([2.3330, 48.8619]).addTo(map);
  const marker5 = new mapboxgl.Marker({
    color: "#808080",
  }).setLngLat([2.3365, 48.8625]).addTo(map);
}
initMapboxGLJS();