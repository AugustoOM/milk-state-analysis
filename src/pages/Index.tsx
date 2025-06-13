
import { useState, useEffect } from 'react';
import ContainerCard from '../components/ContainerCard';
import Header from '../components/Header';
import MetricsSummary from '../components/MetricsSummary';

// Mock data for demonstration
const generateMockData = (containerName: string) => {
  // Force containers A, B, C to be optimal
  if (containerName === "Contenedor A" || containerName === "Contenedor B" || containerName === "Contenedor C") {
    return {
      temperature: 3.5, // Optimal range 3-4°C
      ph: 6.8, // Optimal > 6.6
      fatContent: 2.0, // Optimal range 1-3%
      lastUpdated: new Date(),
    };
  }
  
  return {
    temperature: 3 + Math.random() * 4, // 3-7°C
    ph: 6.5 + Math.random() * 0.8, // 6.5-7.3
    fatContent: 3.0 + Math.random() * 1.5, // 3.0-4.5%
    lastUpdated: new Date(),
  };
};

const Index = () => {
  const [containers, setContainers] = useState([
    { id: 1, name: "Contenedor A", capacity: 1000, ...generateMockData("Contenedor A") },
    { id: 2, name: "Contenedor B", capacity: 1500, ...generateMockData("Contenedor B") },
    { id: 3, name: "Contenedor C", capacity: 800, ...generateMockData("Contenedor C") },
    { id: 4, name: "Contenedor D", capacity: 1200, ...generateMockData("Contenedor D") },
    { id: 5, name: "Contenedor E", capacity: 900, ...generateMockData("Contenedor E") },
    { id: 6, name: "Contenedor F", capacity: 1100, ...generateMockData("Contenedor F") },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setContainers(prev => prev.map(container => ({
        ...container,
        ...generateMockData(container.name)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <MetricsSummary containers={containers} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {containers.map((container) => (
            <ContainerCard key={container.id} container={container} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
