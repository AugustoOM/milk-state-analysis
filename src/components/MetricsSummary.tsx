
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Container {
  id: number;
  name: string;
  capacity: number;
  temperature: number;
  ph: number;
  fatContent: number;
  lastUpdated: Date;
}

interface MetricsSummaryProps {
  containers: Container[];
}

const MetricsSummary = ({ containers }: MetricsSummaryProps) => {
  const avgTemp = containers.reduce((sum, c) => sum + c.temperature, 0) / containers.length;
  const avgPH = containers.reduce((sum, c) => sum + c.ph, 0) / containers.length;
  const avgFat = containers.reduce((sum, c) => sum + c.fatContent, 0) / containers.length;
  
  const criticalContainers = containers.filter(c => 
    c.temperature < 3 || c.temperature > 4 || c.ph <= 6.5 || c.fatContent < 1 || c.fatContent > 3
  ).length;

  const warningContainers = containers.filter(c => 
    c.ph <= 6.6 && c.ph > 6.5 &&
    !(c.temperature < 3 || c.temperature > 4 || c.ph <= 6.5 || c.fatContent < 1 || c.fatContent > 3)
  ).length;

  const optimalContainers = containers.length - criticalContainers - warningContainers;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Temperatura Promedio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgTemp.toFixed(1)}°C</div>
          <p className="text-xs text-blue-100">Target: 3-4°C</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Nivel de pH Promedio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgPH.toFixed(2)}</div>
          <p className="text-xs text-green-100">Target: {'>'}6.6</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Tenor Graso Promedio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgFat.toFixed(1)}%</div>
          <p className="text-xs text-yellow-100">Target: 1-3%</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Optimal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{optimalContainers}</div>
          <p className="text-xs text-emerald-100">Containers in range</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{criticalContainers + warningContainers}</div>
          <p className="text-xs text-red-100">{criticalContainers} critical, {warningContainers} warning</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsSummary;
