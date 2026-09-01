import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import ChartComponent from '../components/ChartComponent';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import useApi from '../hooks/useApi';
import { dummyDistrictTrends, dummyStateTrends, dummyDelayDrivers, dummyProjects } from '../data/dummyData';

/**
 * Analytics Page
 * Comprehensive analytics and reporting
 */
const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('riskScore');

  const { data: districtTrends, loading: districtLoading } = useApi(
    () => Promise.resolve(dummyDistrictTrends),
    []
  );
  const { data: stateTrends, loading: stateLoading } = useApi(
    () => Promise.resolve(dummyStateTrends),
    []
  );
  const { data: delayDrivers, loading: driversLoading } = useApi(
    () => Promise.resolve(dummyDelayDrivers),
    []
  );
  const { data: projects } = useApi(() => Promise.resolve(dummyProjects), []);

  const timeRangeOptions = [
    { label: 'Last 3 Months', value: '3m' },
    { label: 'Last 6 Months', value: '6m' },
    { label: 'Last Year', value: '1y' },
    { label: 'All Time', value: 'all' },
  ];

  const metricOptions = [
    { label: 'Risk Score', value: 'riskScore' },
    { label: 'Delay Probability', value: 'delayProbability' },
    { label: 'Completion Rate', value: 'completionRate' },
  ];

  // Calculate summary statistics
  const stats = {
    totalProjects: projects?.length || 0,
    completedProjects: projects?.filter((p) => p.status === 'Completed').length || 0,
    ongoingProjects: projects?.filter((p) => p.status === 'Ongoing').length || 0,
    avgDelay: projects?.length
      ? Math.round(projects.reduce((sum, p) => sum + (p.delayDays || 0), 0) / projects.length)
      : 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">
            Detailed analysis of land acquisition trends and predictions
          </p>
        </div>

        {/* Filter Section */}
        <Card className="mb-8" title="Filters">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown
              label="Time Range"
              value={timeRange}
              onChange={setTimeRange}
              options={timeRangeOptions}
            />
            <Dropdown
              label="Metric"
              value={selectedMetric}
              onChange={setSelectedMetric}
              options={metricOptions}
            />
          </div>
        </Card>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProjects}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.completedProjects}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Ongoing</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.ongoingProjects}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Avg Delay</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{stats.avgDelay} days</p>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="space-y-8">
          {/* District Analysis */}
          <ChartComponent
            type="bar"
            title="District-wise Risk Analysis"
            data={districtTrends}
            xAxisKey="district"
            dataKey={['averageRisk', 'completionRate']}
            colors={['#ef4444', '#22c55e']}
            loading={districtLoading}
            height={350}
          />

          {/* State Analysis */}
          <ChartComponent
            type="line"
            title="State-wise Trends"
            data={stateTrends}
            xAxisKey="state"
            dataKey={['projectCount', 'avgRiskScore']}
            colors={['#0ea5e9', '#f59e0b']}
            loading={stateLoading}
            height={350}
          />

          {/* Delay Drivers */}
          <ChartComponent
            type="bar"
            title="Primary Delay Drivers"
            data={delayDrivers}
            xAxisKey="driver"
            dataKey="frequency"
            colors={['#8b5cf6']}
            loading={driversLoading}
            height={350}
          />

          {/* Project Type Distribution */}
          <ChartComponent
            type="pie"
            title="Project Distribution by Type"
            data={[
              { name: 'Residential', value: projects?.filter((p) => p.type === 'Residential').length || 0 },
              { name: 'Commercial', value: projects?.filter((p) => p.type === 'Commercial').length || 0 },
              { name: 'Industrial', value: projects?.filter((p) => p.type === 'Industrial').length || 0 },
              { name: 'Agricultural', value: projects?.filter((p) => p.type === 'Agricultural').length || 0 },
              { name: 'Mixed Use', value: projects?.filter((p) => p.type === 'Mixed Use').length || 0 },
            ].filter((item) => item.value > 0)}
            dataKey="value"
            colors={['#0ea5e9', '#f59e0b', '#ef4444', '#22c55e', '#8b5cf6']}
            height={350}
          />
        </div>

        {/* Export Section */}
        <Card className="mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Export Report</h3>
              <p className="text-sm text-gray-600 mt-1">Download analytics data in various formats</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">CSV</Button>
              <Button variant="outline" size="sm">PDF</Button>
              <Button variant="outline" size="sm">Excel</Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;
