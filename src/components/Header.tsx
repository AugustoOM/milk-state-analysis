
import { Milk } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/6773d9ae-1a45-41a5-802a-62a475e4f346.png" 
              alt="MilkMax Logo" 
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MILKMAX</h1>
              <p className="text-sm text-gray-600">Milk State Analysis System</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
