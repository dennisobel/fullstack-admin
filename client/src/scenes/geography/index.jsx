import React,{useEffect, useState} from "react";
import { Box, useTheme, Grid } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import { useSelector } from "react-redux";
import data from "./data"

import MapView from "components/Map";

const Geography = () => {
  const searchQuery = useSelector(state => state.global.searchQuery)
  const theme = useTheme();
  

  console.log(searchQuery)

  const markers = data.features;

  const [filteredMarkers,setFilteredMarkers] = useState([...markers])

  useEffect(()=>{
    if(searchQuery === ""){
      setFilteredMarkers(markers)
    }
    let filtered = markers.filter(marker => {
      return marker.properties.ward.toLowerCase().includes(searchQuery.toLowerCase())
    })
    setFilteredMarkers(filtered)
  },[searchQuery])
  
  
  return (
    
      <MapView markers={filteredMarkers} />
    
  );
};

export default Geography;
