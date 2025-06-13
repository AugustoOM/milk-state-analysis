
import { useState, useEffect } from 'react';
import ContainerCard from '../components/ContainerCard';
import Header from '../components/Header';
import MetricsSummary from '../components/MetricsSummary';

// Mock data for demonstration
const generateMockData = () => ({
  temperature: 3 + Math.random() * 4, // 3-7°C
  ph: 6.5 + Math.random() * 0.8, // 6.5-7.3
  fatContent: 3.0 + Math.random() * 1.5, // 3.0-4.5%
  lastUpdated: new Date(),
});

const Index = () => {
  const [containers, setContainers] = useState([
    { id: 1, name: "Container A", capacity: 1000, ...generateMockData() },
    { id: 2, name: "Container B", capacity: 1500, ...generateMockData() },
    { id: 3, name: "Container C", capacity: 800, ...generateMockData() },
    { id: 4, name: "Container D", capacity: 1200, ...generateMockData() },
    { id: 5, name: "Container E", capacity: 900, ...generateMockData() },
    { id: 6, name: "Container F", capacity: 1100, ...generateMockData() },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setContainers(prev => prev.map(container => ({
        ...container,
        ...generateMockData()
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
