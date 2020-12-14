let map = null
let marker = null

export function getMap(position, tooltip) {
  // if (map === null) {
  //   map = L.map('map').setView(position, 15)
  // } else return

  if (map === null) {
    map = L.map('map').setView(position, 15)
  } else {
    map.flyTo(position)
  }

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  if (marker) {
    map.removeLayer(marker)
  }
  marker = new L.Marker(position).addTo(map).bindPopup(tooltip).openPopup()
}
