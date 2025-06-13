
import { Thermometer, Beaker, Droplets, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Container {
  id: number;
  name: string;
  capacity: number;
  temperature: number;
  ph: number;
  fatContent: number;
  lastUpdated: Date;
}

interface ContainerCardProps {
  container: Container;
}

const getTemperatureStatus = (temp: number) => {
  if (temp < 3 || temp > 4) return { status: 'crítico', color: 'destructive' as const };
  return { status: 'óptimo', color: 'default' as const };
};

const getPHStatus = (ph: number) => {
  if (ph <= 6.5) return { status: 'crítico', color: 'destructive' as const };
  if (ph <= 6.6) return { status: 'advertencia', color: 'secondary' as const };
  return { status: 'óptimo', color: 'default' as const };
};

const getFatStatus = (fat: number) => {
  if (fat < 1 || fat > 3) return { status: 'crítico', color: 'destructive' as const };
  return { status: 'óptimo', color: 'default' as const };
};

const ContainerCard = ({ container }: ContainerCardProps) => {
  const tempStatus = getTemperatureStatus(container.temperature);
  const phStatus = getPHStatus(container.ph);
  const fatStatus = getFatStatus(container.fatContent);

  const overallStatus = [tempStatus, phStatus, fatStatus].some(s => s.status === 'crítico') 
    ? 'crítico' 
    : [tempStatus, phStatus, fatStatus].some(s => s.status === 'advertencia') 
    ? 'advertencia' 
    : 'óptimo';

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{container.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{container.capacity}L Capacidad</p>
          </div>
          <Badge 
            variant={overallStatus === 'crítico' ? 'destructive' : overallStatus === 'advertencia' ? 'secondary' : 'default'}
            className="capitalize"
          >
            {overallStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Temperatura</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold">{container.temperature.toFixed(1)}°C</span>
              <Badge variant={tempStatus.color} className="ml-2 text-xs">
                {tempStatus.status}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Beaker className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Nivel de pH</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold">{container.ph.toFixed(2)}</span>
              <Badge variant={phStatus.color} className="ml-2 text-xs">
                {phStatus.status}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">Tenor Graso</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold">{container.fatContent.toFixed(1)}%</span>
              <Badge variant={fatStatus.color} className="ml-2 text-xs">
                {fatStatus.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-muted-foreground border-t pt-3">
          <Clock className="w-3 h-3" />
          <span>Última actualización: {container.lastUpdated.toLocaleTimeString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerCard;
