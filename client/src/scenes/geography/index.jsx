import React,{useEffect, useState} from "react";
import { Box, useTheme, Grid } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import { useSelector } from "react-redux";

import MapView from "components/Map";

const Geography = () => {
  const searchQuery = useSelector(state => state.global.searchQuery)
  const theme = useTheme();
  const { data } = useGetGeographyQuery();

  console.log(searchQuery)

  const [markers,setMarkers] = useState([
    { latitude: -1.2747, longitude: 36.8219, label: 'Nairobi City Centre' },
    { latitude: -1.2784, longitude: 36.8169, label: 'Kenyatta International Convention Centre' },
    { latitude: -1.2854, longitude: 36.8211, label: 'University of Nairobi' },
    { latitude: -1.2866, longitude: 36.8266, label: 'Nairobi National Museum' },
    { latitude: -1.3015, longitude: 36.8282, label: 'Giraffe Centre' },
    { latitude: -1.3157, longitude: 36.7947, label: 'Nairobi National Park' },
    { latitude: -1.2849, longitude: 36.8282, label: 'David Sheldrick Wildlife Trust' },
    { latitude: -1.2884, longitude: 36.8214, label: 'Uhuru Park' },
    { latitude: -1.2986, longitude: 36.7749, label: 'Jomo Kenyatta International Airport' },
    { latitude: -1.2761, longitude: 36.8008, label: 'Nairobi Railway Station' },
    { latitude: -1.2748, longitude: 36.7922, label: 'Nairobi Bus Station' },
    { latitude: -1.2835, longitude: 36.8165, label: 'Nairobi Hospital' },
    { latitude: -1.2945, longitude: 36.8072, label: 'Yaya Centre' },
    { latitude: -1.2899, longitude: 36.8203, label: 'Central Park' },
    { latitude: -1.2914, longitude: 36.8206, label: 'August 7th Memorial Park' },
    { latitude: -1.2864, longitude: 36.8267, label: 'Snake Park' },
    { latitude: -1.2792, longitude: 36.8454, label: 'City Hall' },
    { latitude: -1.2921, longitude: 36.8268, label: 'Nairobi Gallery' },
    { latitude: -1.3066, longitude: 36.7572, label: 'Nairobi Safari Walk' },
    { latitude: -1.2927, longitude: 36.8189, label: 'Kenya National Theatre' },
    { latitude: -1.2864, longitude: 36.8129, label: 'State House Nairobi' },
    { latitude: -1.2922, longitude: 36.8132, label: 'Nairobi Arboretum' },
    { latitude: -1.3027, longitude: 36.7697, label: 'Wilson Airport' },
    { latitude: -1.2753, longitude: 36.8133, label: 'Kenya National Archives' }
  ]);

  const [filteredMarkers,setFilteredMarkers] = useState([...markers])

  useEffect(()=>{
    let filtered = markers.filter(marker => {
      return marker.label.includes(searchQuery)
    })
    setFilteredMarkers(filtered)
  },[searchQuery])
  
  
  return (
    
      <MapView markers={filteredMarkers} />
    
  );
};

export default Geography;
