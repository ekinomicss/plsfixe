import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Layout from '../components/Layout';

const NYC_MAP_URL = 'https://data.cityofnewyork.us/resource/7t3b-ywvw.geojson'; // Use more detailed GeoJSON if available

// Example of specific locations to tag (latitude, longitude, and name)
const locations = [
  { name: 'Central Park', coordinates: [-73.968285, 40.785091] },
  { name: 'Brooklyn Bridge', coordinates: [-73.996864, 40.706086] },
  { name: 'Times Square', coordinates: [-73.985130, 40.758896] },
  { name: 'DUMBO', coordinates: [-73.98937, 40.703316] },
];

const Map = () => {
  const svgRef = useRef(null);
  const zoomRef = useRef(null);  // Reference for the zoom behavior

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Initial projection centered over Manhattan and Brooklyn with adjusted scale
    const projection = d3
      .geoMercator()
      .scale(280000)  // Zoomed in more
      .center([-73.89, 40.72])  // Centered over Manhattan and Brooklyn
      .translate([width / 2, height / 2]);

    // Path generator using the new projection
    const path = d3.geoPath().projection(projection);

    // Zoom behavior with pan/zoom limits
    const zoom = d3.zoom()
      .scaleExtent([1, 10])  // Allow further zooming
      .on('zoom', (event) => {
        svg.selectAll('path').attr('transform', event.transform);
        svg.selectAll('circle')
          .attr('transform', event.transform)  // Scale the marker positions
          .attr('r', 5 / event.transform.k);  // Scale the marker size inversely to zoom level
        svg.selectAll('text').attr('transform', event.transform);  // Ensure markers/labels zoom with the map
      });

    // Save zoom behavior reference
    zoomRef.current = zoom;

    svg.call(zoom);

    // Fetch and render GeoJSON data (map details)
    d3.json(NYC_MAP_URL).then((geoData) => {
      svg
        .selectAll('path')
        .data(geoData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#cce5ff')
        .attr('stroke', '#003366')
        .attr('stroke-width', 1);

      // Add markers for specific locations
      svg
        .selectAll('circle')
        .data(locations)
        .enter()
        .append('circle')
        .attr('cx', (d) => projection(d.coordinates)[0])
        .attr('cy', (d) => projection(d.coordinates)[1])
        .attr('r', 5)  // Set default radius
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

      // Add text labels for the locations
      svg
        .selectAll('text')
        .data(locations)
        .enter()
        .append('text')
        .attr('x', (d) => projection(d.coordinates)[0] + 7)  // Offset text slightly from marker
        .attr('y', (d) => projection(d.coordinates)[1])
        .text((d) => d.name)
        .attr('font-size', '12px')
        .attr('fill', 'black')
        .attr('stroke', 'white')
        .attr('stroke-width', 0.5);  // Add slight stroke to make text readable
    });

    // Resize map on window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      svg.attr('width', newWidth).attr('height', newHeight);
      projection.translate([newWidth / 2, newHeight / 2]);
      svg.selectAll('path').attr('d', path); // Recalculate paths on resize
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset zoom function
  const handleResetZoom = () => {
    const svg = d3.select(svgRef.current);

    // Reset the zoom to the initial state (zoom level 1 and centered)
    svg.transition().duration(750).call(zoomRef.current.transform, d3.zoomIdentity);
  };

  // Zoom in function
  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(zoomRef.current.scaleBy, 1.2);  // Zoom in by 20%
  };

  // Zoom out function
  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(zoomRef.current.scaleBy, 0.8);  // Zoom out by 20%
  };

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6 font-serif">Interactive Map of NYC</h1>
        <div className="w-full h-screen relative border border-black rounded-lg">
          <div className="absolute top-4 left-4 flex space-x-2 z-20">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleZoomIn}
            >
              +
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleZoomOut}
            >
              -
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleResetZoom}
            >
              Reset Map
            </button>
          </div>
          <svg ref={svgRef} width="100%" height="100%"></svg>
        </div>
      </div>
    </Layout>
  );
};

export default Map;
