import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import './TravelLog.scss'

import { TravelMarker } from './types'
import { MarkerIcon } from './MarkerIcon/MarkerIcon'

export function TravelLog() {
  const markers = [
    { position: [39.11835811954996, 117.29483444876493], id: 'ancestral-home' },
    { position: [-36.872538418713596, 174.79471245577778], id: 'home-town' },
    { position: [-36.95290726314019, 174.46881031521264], id: 'piha' },
    { position: [-38.114928365363944, 176.21323194463707], id: 'rotorua' },
    { position: [-33.88284512758187, 151.20412331689397], id: 'sydney' },
    { position: [-37.81393299703771, 144.9640571714442], id: 'melbs' },
    { position: [-33.73493765590562, 150.31482920677658], id: 'three-sisters' },

    // 2019 US Graduation Trip
    { position: [29.42605111387977, -98.4861311866751], id: 'alamo' },
    {
      position: [29.954723941749613, -90.06915700665552],
      id: 'bourbon-street',
    },
    {
      position: [30.67055647210188, -88.10106485657597],
      id: 'mobile-incident',
    },
    { position: [28.377928926206394, -81.5707593598635], id: 'disney-world' },
    { position: [25.80006278061019, -80.1247776326263], id: 'miami' },
    { position: [24.546418816886828, -81.79568635532314], id: 'key-west' },

    // Alteryx Induction
    {
      position: [33.649678690204865, -117.74219539041681],
      id: 'irvine-spectrum',
    },
    {
      position: [34.11854954149735, -118.30041495995846],
      id: 'griffith-observatory',
    },
    {
      position: [34.10166096455854, -118.34024587345077],
      id: 'hollywood-blvd',
    },
    { position: [34.07246694210803, -118.40351901531245], id: 'beverly-hills' },
    { position: [34.00829456363146, -118.49876017254353], id: 'santa-monica' },
    { position: [33.98624751902776, -118.47350035942175], id: 'venice-beach' },

    // Contiki European Encounter
    {
      position: [51.52348047419821, -0.1272936063105607],
      id: 'royal-national',
    },
    { position: [51.12505369147974, 1.3301559138065557], id: 'dover-port' },
    { position: [50.966241111599764, 1.8525690843304368], id: 'calais-port' },
    {
      position: [52.3718562875324, 4.895854751097363],
      id: 'amsterdam-show-incident',
    },
    { position: [52.36804389158072, 4.8916260999934105], id: 'stroopwafels' },
    { position: [52.36883205501186, 4.884067256948405], id: 'fabel-fries' },
    {
      position: [52.372845287335814, 4.893701437046876],
      id: 'amsterdam-square',
    },
    {
      position: [52.21492208010704, 11.08280885789475],
      id: 'checkpoint-alpha',
    },
    {
      position: [52.51626101320107, 13.377706514379602],
      id: 'brandenburg-gate',
    },
    { position: [52.518654245105125, 13.376195815422875], id: 'reichstag ' },
    { position: [52.51397544522927, 13.378718726853908], id: 'memorial' },
    {
      position: [52.507493986194646, 13.39038058985937],
      id: 'checkpoint-charlie',
    },
    {
      position: [52.49295499073268, 13.491231290635188],
      id: 'sisyphos-incident',
    },
    { position: [51.05190149459102, 13.741517761054153], id: 'dresden' },
    { position: [50.086537054286886, 14.411431936395815], id: 'prague' },
    { position: [50.09090253556212, 14.400514088563432], id: 'prague-castle' },
    {
      position: [47.79506209838063, 13.047667665683257],
      id: 'salzburg-castle',
    },
    { position: [47.80459650998256, 13.04231298220736], id: 'salzburg-garden' },
    {
      position: [45.43366806619821, 12.341019966647094],
      id: 'venice-gondola-bridge',
    },
    {
      position: [45.437986221524945, 12.335894473463442],
      id: 'venice-main-bridge',
    },
    { position: [41.90299522203254, 12.454479347757513], id: 'vatican-city' },
    { position: [41.8903257572317, 12.492228714377841], id: 'colosseum' },
    { position: [41.898580888167885, 12.476854411267594], id: 'pantheon' },
    { position: [41.900932448739354, 12.48331114502335], id: 'trevi-fountain' },
    { position: [41.89916811538073, 12.473067848146268], id: 'rome-square' },
    {
      position: [41.898006225581746, 12.471560712636217],
      id: 'two-sizes-tiramisu',
    },
    { position: [41.90133277774446, 12.463266634169798], id: 'pier-21' },
    { position: [43.76932622028467, 11.255910593401191], id: 'fake-david' },
    { position: [43.76806901517005, 11.253212312078878], id: 'dimond-bridge' },
    {
      position: [43.76826524845598, 11.259795893425117],
      id: 'florence-bar-incident',
    },
    { position: [43.77313129715716, 11.256940691974775], id: 'florence-dome' },
    { position: [43.72321533960281, 10.396550062426785], id: 'tower-of-piza' },
    { position: [44.1113451485647, 9.813430181903273], id: 'la-spezia' },
    { position: [44.1007248774389, 9.736242394244478], id: 'riomaggiore' },
    { position: [44.10760445902508, 9.726574607582902], id: 'manarola' },
    { position: [44.1201472911354, 9.710997460327341], id: 'corniglia' },
    { position: [44.1348082429464, 9.682751451602362], id: 'vernazza' },
    { position: [44.14718318544947, 9.654207196928398], id: 'monterosso' },
    { position: [46.93028358453925, 8.34032294585907], id: 'lucerne-view' },
    { position: [47.05184342405741, 8.307519582194203], id: 'lucerne-bridge' },
    { position: [48.85840536503996, 2.294470569272108], id: 'eiffel-tower' },
    { position: [48.86104497458563, 2.335861703914043], id: 'louvre' },
    { position: [48.84900008352656, 2.2826254190383555], id: 'laduree' },
    { position: [48.84900008352656, 2.2826254190383555], id: 'nouvelle-eve' },
    {
      position: [48.8842087882951, 2.331993699415775],
      id: 'penetration-incident',
    },

    // Contiki Japan Unrivalled
    { position: [35.69976660380298, 139.77137501106827], id: 'eletric-town' },
    {
      position: [35.659518465741776, 139.70055770218056],
      id: 'shibuya-crossing',
    },
    { position: [35.635575692879414, 139.87974735369613], id: 'disney-tokyo' },
    { position: [35.25210203806059, 139.02820678718282], id: 'hakone' },
    { position: [36.141889978383716, 137.2594747327098], id: 'takayama' },
    { position: [34.39583402252079, 132.4535917448598], id: 'hiroshima' },
    { position: [34.29280849299235, 132.31846355460988], id: 'miyajima' },
    {
      position: [34.70334094570013, 135.49766721149146],
      id: 'osaka-umade-station',
    },
    { position: [34.6690991098973, 135.50130393836065], id: 'osaka-bridge' },
    { position: [35.0399426554203, 135.72913327275475], id: 'kinkaku-ji' },
    { position: [34.685103329509566, 135.84301993010988], id: 'nara-park' },
    { position: [34.96740671727446, 135.78601505020657], id: 'fushimi-inari' },
    {
      position: [34.668088237270275, 135.43030185354235],
      id: 'universal-studio',
    },

    // Contiki Island Hopper
    {
      position: [37.96865745894927, 23.7305152408333],
      id: 'athens-backpackers',
    },
    {
      position: [37.079195477930504, 22.428423970111957],
      id: 'statue-of-leonidas',
    },
    {
      position: [37.08229003131928, 22.423613197781442],
      id: 'acropolis-of-sparta',
    },
    { position: [37.971549095273666, 23.726726968395532], id: 'parthenon' },
    {
      position: [37.98147607753665, 23.724569782878447],
      id: 'the-actual-slums',
    },
    {
      position: [37.4445873290888, 25.325876740615822],
      id: 'mykonos-windmills',
    },
    {
      position: [37.410354350205395, 25.355980441620634],
      id: 'paradise-beach',
    },
    { position: [37.41009702608832, 25.35607238184585], id: 'loner-incident' },
    { position: [37.05627950228643, 25.210834576045077], id: 'lefkes-chruch' },
    {
      position: [37.055739335134014, 25.20900659447666],
      id: 'lefkes-granny-sweets',
    },
    {
      position: [37.084775700394154, 25.147665304642324],
      id: 'frankish-castle',
    },
    { position: [37.08193577423584, 25.14555980552839], id: 'paros-beach' },
    { position: [37.07874203624206, 25.14678814989473], id: 'open-air-cinema' },
    { position: [37.12582855371429, 25.23741087460721], id: 'naousa' },
    { position: [36.41855236911487, 25.43111328649102], id: 'santorini-view' },
    {
      position: [36.41724332322783, 25.43277449057597],
      id: 'rescue-operation',
    },
    {
      position: [36.461735544002394, 25.376275021885174],
      id: 'santorini-domes',
    },
    { position: [36.37466437832173, 25.48443961338267], id: 'got-cooked' },
    { position: [36.71140584929943, 25.296250471756963], id: 'farout' },
    {
      position: [36.71089833687516, 25.295384391274485],
      id: 'speed-boat-biscuit',
    },
    { position: [36.721678323060516, 25.28238007133296], id: 'pub-crwal' },

    { position: [37.94505593059925, 23.64045171513945], id: 'port-of-piraeus' },
    { position: [24.447322909333177, 54.645233372160696], id: '40c-at-night' },
  ] as TravelMarker[]

  console.log(JSON.stringify(markers))

  return (
    <div className="travel-log">
      <h2>My Global Adventures</h2>
      <span>
        Welcome to my travel diary, where I share the incredible journey I've
        embarked upon across the world. From the bustling streets of Tokyo to
        the serene beaches of Greece, I've explored diverse cultures, tasted
        exotic cuisines, and met amazing people along the way. Each destination
        has left a unique mark on my heart, and I'm excited to share where I've
        been with you. Join me as I recount the adventures, challenges, and
        unforgettable moments that have shaped my global exploration, one story
        at a time.
      </span>
      <MapContainer
        className="travel-map"
        center={[0, 0]}
        zoom={3}
        maxBounds={[
          [-90, -190],
          [90, 190],
        ]}
      >
        <TileLayer
          minZoom={3}
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker key={m.id} position={m.position} icon={MarkerIcon}>
            <Popup className="popup">London 2023</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
