import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import DashboardCard from '../components/DashboardCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useApi from '../hooks/useApi';
import projectService from '../services/projectService';
import { dummyProjects } from '../data/dummyData';
import { formatDate, getRiskColor, getRiskLevel } from '../utils/helpers';
import { PROJECT_TYPES } from '../utils/constants';

/**
 * Projects Page
 * Manage and view land acquisition projects
 */
const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: '',
    status: '',
    riskScore: 0,
  });

  const { data: projects, loading, refetch } = useApi(
    () => Promise.resolve(dummyProjects),
    []
  );

  // Filter projects
  const filteredProjects = projects?.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || project.type === selectedType;
    return matchesSearch && matchesType;
  }) || [];

  const typeOptions = PROJECT_TYPES.map((type) => ({
    label: type,
    value: type,
  }));

  const handleEdit = (project) => {
    setFormData(project);
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      console.log('Delete project:', id);
      refetch();
    }
  };

  const handleSave = async () => {
    console.log('Save project:', formData);
    setShowForm(false);
    setFormData({
      name: '',
      location: '',
      type: '',
      status: '',
      riskScore: 0,
    });
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">
              Manage land acquisition projects and track progress
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                name: '',
                location: '',
                type: '',
                status: '',
                riskScore: 0,
              });
            }}
          >
            <Plus size={20} />
            <span>New Project</span>
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8" title="Search & Filter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Search Projects"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dropdown
              label="Project Type"
              value={selectedType}
              onChange={setSelectedType}
              options={typeOptions}
              placeholder="All Types"
            />
          </div>
        </Card>

        {/* Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md" title={editingId ? 'Edit Project' : 'New Project'}>
              <div className="space-y-4">
                <Input
                  label="Project Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter project name"
                />
                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                />
                <Dropdown
                  label="Project Type"
                  value={formData.type}
                  onChange={(type) => setFormData({ ...formData, type })}
                  options={typeOptions}
                />
                <Input
                  label="Risk Score (%)"
                  type="number"
                  value={formData.riskScore}
                  onChange={(e) => setFormData({ ...formData, riskScore: parseInt(e.target.value) })}
                  placeholder="0-100"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredProjects.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No projects found</p>
              <Button variant="primary" onClick={() => setShowForm(true)}>
                <Plus size={20} />
                <span>Create First Project</span>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{project.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-600">Type</p>
                      <p className="text-sm font-medium text-gray-900">{project.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Status</p>
                      <p className="text-sm font-medium text-gray-900">{project.status}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Risk Score</span>
                      <span className={`text-lg font-bold ${getRiskColor(project.riskScore)}`}>
                        {project.riskScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all"
                        style={{ width: `${project.riskScore}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{getRiskLevel(project.riskScore)} Risk</p>
                  </div>

                  <div className="flex space-x-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => console.log('View:', project.id)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
