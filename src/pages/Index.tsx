import { useState, useEffect } from 'react';
import ContainerCard from '../components/ContainerCard';
import Header from '../components/Header';
import MetricsSummary from '../components/MetricsSummary';

// Mock data for demonstration
const generateMockData = (containerName: string) => {
  // Force containers A, B, C to be optimal but with random variations
  if (containerName === "Tanque A" || containerName === "Tanque B" || containerName === "Tanque C") {
    return {
      temperature: 3 + Math.random(), // Random between 3-4°C
      ph: 6.6 + Math.random() * 0.4, // Random between 6.6-7.0
      fatContent: 1 + Math.random() * 2, // Random between 1-3%
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
    { id: 1, name: "Tanque A", capacity: 1000, ...generateMockData("Tanque A") },
    { id: 2, name: "Tanque B", capacity: 800, ...generateMockData("Tanque B") },
    { id: 3, name: "Tanque C", capacity: 500, ...generateMockData("Tanque C") },
    { id: 4, name: "Tanque D", capacity: 1200, ...generateMockData("Tanque D") },
    { id: 5, name: "Tanque E", capacity: 1500, ...generateMockData("Tanque E") },
    { id: 6, name: "Tanque F", capacity: 1100, ...generateMockData("Tanque F") },
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
