import React,{useEffect, useState} from "react";
import { Box, useTheme, Grid } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import { useSelector } from "react-redux";

import Map from "components/Map";

const Geography = () => {
  const searchQuery = useSelector(state => state.global.searchQuery)
  const theme = useTheme();
  const { data } = useGetGeographyQuery();

  console.log(searchQuery)

  const [markers,setMarkers] = useState([
    { lat: -1.2747, lng: 36.8219, label: 'Nairobi City Centre' },
    { lat: -1.2784, lng: 36.8169, label: 'Kenyatta International Convention Centre' },
    { lat: -1.2854, lng: 36.8211, label: 'University of Nairobi' },
    { lat: -1.2866, lng: 36.8266, label: 'Nairobi National Museum' },
    { lat: -1.3015, lng: 36.8282, label: 'Giraffe Centre' },
    { lat: -1.3157, lng: 36.7947, label: 'Nairobi National Park' },
    { lat: -1.2849, lng: 36.8282, label: 'David Sheldrick Wildlife Trust' },
    { lat: -1.2884, lng: 36.8214, label: 'Uhuru Park' },
    { lat: -1.2986, lng: 36.7749, label: 'Jomo Kenyatta International Airport' },
    { lat: -1.2761, lng: 36.8008, label: 'Nairobi Railway Station' },
    { lat: -1.2748, lng: 36.7922, label: 'Nairobi Bus Station' },
    { lat: -1.2835, lng: 36.8165, label: 'Nairobi Hospital' },
    { lat: -1.2945, lng: 36.8072, label: 'Yaya Centre' },
    { lat: -1.2899, lng: 36.8203, label: 'Central Park' },
    { lat: -1.2914, lng: 36.8206, label: 'August 7th Memorial Park' },
    { lat: -1.2864, lng: 36.8267, label: 'Snake Park' },
    { lat: -1.2745, lng: 36.8143, label: 'City Hall' },
    { lat: -1.2921, lng: 36.8268, label: 'Nairobi Gallery' },
    { lat: -1.3066, lng: 36.7572, label: 'Nairobi Safari Walk' },
    { lat: -1.2927, lng: 36.8189, label: 'Kenya National Theatre' },
    { lat: -1.2864, lng: 36.8129, label: 'State House Nairobi' },
    { lat: -1.2922, lng: 36.8132, label: 'Nairobi Arboretum' },
    { lat: -1.3027, lng: 36.7697, label: 'Wilson Airport' },
    { lat: -1.2753, lng: 36.8133, label: 'Kenya National Archives' }
  ]);

  const [filteredMarkers,setFilteredMarkers] = useState([...markers])

  useEffect(()=>{
    let filtered = markers.filter(marker => {
      return marker.label.includes(searchQuery)
    })
    setFilteredMarkers(filtered)
  },[searchQuery])
  
  
  return (
    <Box m="1.5rem 2.5rem">

      <Box
      >
      <Map markers={filteredMarkers} />

      </Box>
    </Box>
  );
};

export default Geography;
