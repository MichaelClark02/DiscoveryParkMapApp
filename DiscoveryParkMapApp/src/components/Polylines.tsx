import React from 'react'
import { View } from 'react-native'
import { LatLng, dWing, bWing, aWing, outline,hWing, kWing, gWing, perks, dWing_internal, guideA, emerg1, emerg2, emerg3, rest1, rest2, supp1, supp2, s, eWing, eWing1, eWing2, eWing3, eWing4, guide} from './Floor1';
import { Marker, Overlay,AnimatedRegion ,PROVIDER_GOOGLE, Polyline, Polygon} from "react-native-maps";


const Polylines = () => {
  return (
    <View>
      <Polyline
                    coordinates={outline.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="#FF0000"
                    strokeWidth={6}
                  />

                  <Polyline
                    coordinates={dWing.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />

                  <Polyline
                    coordinates={dWing_internal.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />

                  <Polygon
                    coordinates={dWing.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(0, 69, 255, 0.5)" // Specify the fill color (green with some transparency)
                  />

                  <Polygon
                    coordinates={bWing.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(32, 168, 13, 0.5)" // Specify the fill color (green with some transparency)
                  />

                  <Polyline
                    coordinates={bWing.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />

                  <Polyline
                    coordinates={aWing.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="yellow"
                    strokeWidth={6}
                  />

                  <Polyline
                    coordinates={hWing.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />

                  <Polygon
                    coordinates={hWing.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(255, 253, 248, 0.5)" // Specify the fill color (green with some transparency)
                  />

                  <Polyline
                    coordinates={gWing.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={gWing.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(32, 168, 13, 0.5)" // Specify the fill color (green with some transparency)
                  />

                  <Polyline
                    coordinates={perks.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={perks.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(216, 219, 18, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polygon
                    coordinates={emerg1.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 64, 52, 0.99)" // Specify the fill color (green with some transparency)
                  />

                  <Polygon
                    coordinates={emerg2.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 64, 52, 0.99)" // Specify the fill color (green with some transparency)
                  />

                  <Polygon
                    coordinates={emerg3.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 64, 52, 0.99)" // Specify the fill color (green with some transparency)
                  />

                  <Polygon
                    coordinates={rest1.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 255, 255, 0.99)" // Specify the fill color (green with some transparency)
                  />
                  <Polygon
                    coordinates={rest2.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 255, 255, 0.99)" // Specify the fill color (green with some transparency)
                  />
                  <Polygon
                    coordinates={supp1.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 255, 255, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polygon
                    coordinates={supp2.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(235, 255, 255, 0.5)" // Specify the fill color (green with some transparency)
                  />

                  <Polyline
                    coordinates={s.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={eWing.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(140, 40, 158, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={eWing1.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={eWing1.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(140, 40, 158, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={eWing2.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={eWing2.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(140, 40, 158, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={eWing3.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={eWing3.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(140, 40, 158, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={eWing4.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="green"
                    strokeWidth={4}
                  />
                  <Polygon
                    coordinates={eWing4.map((location: LatLng) => ({
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }))}
                      fillColor="rgba(140, 40, 158, 0.5)" // Specify the fill color (green with some transparency)
                  />
                  <Polyline
                    coordinates={guide.map((location: LatLng) => ({
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }))}
                    strokeColor="red"
                    strokeWidth={4}
                  />
    </View>
  )
}

export default Polylines