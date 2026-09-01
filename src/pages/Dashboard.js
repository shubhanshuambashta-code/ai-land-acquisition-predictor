import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import DashboardCard from '../components/DashboardCard';
import ChartComponent from '../components/ChartComponent';
import MapComponent from '../components/MapComponent';
import AlertPanel from '../components/AlertPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import Dropdown from '../components/Dropdown';
import Card from '../components/Card';
import useApi from '../hooks/useApi';
import riskService from '../services/riskService';
import projectService from '../services/projectService';
import alertService from '../services/alertService';
import { dummyProjects, dummyAlerts, dummyTimelineData, dummyDistrictTrends } from '../data/dummyData';

/**
 * Dashboard Page
 * Main dashboard with project metrics, charts, and analytics
 */
const Dashboard = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(dummyProjects);

  // Dummy data fetch (replace with actual API calls)
  const { data: projects, loading: projectsLoading } = useApi(
    () => Promise.resolve(dummyProjects),
    []
  );
  const { data: alerts, loading: alertsLoading } = useApi(
    () => Promise.resolve(dummyAlerts),
    []
  );
  const { data: timelineData, loading: timelineLoading } = useApi(
    () => Promise.resolve(dummyTimelineData),
    []
  );
  const { data: districtTrends, loading: districtLoading } = useApi(
    () => Promise.resolve(dummyDistrictTrends),
    []
  );

  // Filter projects
  useEffect(() => {
    let filtered = projects || [];
    if (selectedDistrict) {
      filtered = filtered.filter((p) => p.district === selectedDistrict);
    }
    if (selectedState) {
      filtered = filtered.filter((p) => p.state === selectedState);
    }
    setFilteredProjects(filtered);
  }, [selectedDistrict, selectedState, projects]);

  // Calculate statistics
  const stats = {
    totalProjects: filteredProjects.length,
    averageRiskScore: filteredProjects.length
      ? Math.round(
          filteredProjects.reduce((sum, p) => sum + p.riskScore, 0) /
            filteredProjects.length
        )
      : 0,
    highRiskProjects: filteredProjects.filter((p) => p.riskScore >= 70).length,
    delayProbability: filteredProjects.length
      ? Math.round(
          filteredProjects.reduce((sum, p) => sum + p.delayProbability, 0) /
            filteredProjects.length
        )
      : 0,
  };

  const districts = [...new Set(projects?.map((p) => p.district))];
  const states = [...new Set(projects?.map((p) => p.state))];

  const districtOptions = districts.map((d) => ({ label: d, value: d }));
  const stateOptions = states.map((s) => ({ label: s, value: s }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of land acquisition projects and delay predictions
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8" title="Filters">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown
              label="District"
              value={selectedDistrict}
              onChange={setSelectedDistrict}
              options={districtOptions}
              placeholder="All Districts"
            />
            <Dropdown
              label="State"
              value={selectedState}
              onChange={setSelectedState}
              options={stateOptions}
              placeholder="All States"
            />
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Projects"
            value={stats.totalProjects}
            subtitle="Active land acquisitions"
            icon={MapPin}
            loading={projectsLoading}
          />
          <DashboardCard
            title="Average Risk Score"
            value={`${stats.averageRiskScore}%`}
            riskScore={stats.averageRiskScore}
            loading={projectsLoading}
          />
          <DashboardCard
            title="High Risk Projects"
            value={stats.highRiskProjects}
            subtitle="Risk score ≥ 70%"
            icon={AlertTriangle}
            trend={{ value: 12, direction: 'up', label: 'from last month' }}
            loading={projectsLoading}
          />
          <DashboardCard
            title="Avg Delay Probability"
            value={`${stats.delayProbability}%`}
            subtitle="Likelihood of delays"
            icon={TrendingUp}
            loading={projectsLoading}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Timeline Analysis */}
          <ChartComponent
            type="line"
            title="Timeline Analysis"
            data={timelineData}
            xAxisKey="month"
            dataKey={['projectedDays', 'actualDays']}
            colors={['#0ea5e9', '#ef4444']}
            loading={timelineLoading}
            height={350}
          />

          {/* District-wise Trends */}
          <ChartComponent
            type="bar"
            title="District-wise Risk Trends"
            data={districtTrends}
            xAxisKey="district"
            dataKey="averageRisk"
            colors={['#f59e0b']}
            loading={districtLoading}
            height={350}
          />
        </div>

        {/* Map and Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card title="Project Locations">
              <MapComponent projects={filteredProjects} />
            </Card>
          </div>

          {/* Alerts Panel */}
          <div>
            <Card title="Recent Alerts">
              <AlertPanel
                alerts={alerts}
                loading={alertsLoading}
                onMarkAsRead={(id) => console.log('Mark as read:', id)}
                onDelete={(id) => console.log('Delete:', id)}
              />
            </Card>
          </div>
        </div>

        {/* Key Delay Drivers */}
        <Card title="Key Delay Drivers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { factor: 'Land Disputes', percentage: 28 },
              { factor: 'Documentation Issues', percentage: 22 },
              { factor: 'Environmental Clearance', percentage: 20 },
              { factor: 'Legal Proceedings', percentage: 18 },
              { factor: 'Administrative Delays', percentage: 15 },
              { factor: 'Financial Constraints', percentage: 12 },
              { factor: 'Local Opposition', percentage: 10 },
              { factor: 'Weather Conditions', percentage: 8 },
            ].map((item) => (
              <div key={item.factor} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{item.factor}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{item.percentage}%</p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
