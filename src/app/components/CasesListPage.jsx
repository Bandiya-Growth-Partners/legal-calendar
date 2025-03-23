import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronRight, Calendar, Mail, Phone, Clock } from 'lucide-react';

const CasesListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCases, setFilteredCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Mock data for cases
  const cases = [
    { 
      id: 1, 
      applicationNumber: "TM-2025-001",
      clientName: "Smith Corporation",
      clientEmail: "contact@smithcorp.com",
      clientPhone: "(555) 123-4567",
      applicationType: "Trademark",
      applicationDate: "2025-02-15",
      status: "Active",
      nextDeadline: "2025-04-20"
    },
    { 
      id: 2, 
      applicationNumber: "PT-2025-042",
      clientName: "Jane Wilson",
      clientEmail: "jwilson@example.com",
      clientPhone: "(555) 987-6543",
      applicationType: "Patent",
      applicationDate: "2025-01-28",
      status: "Pending",
      nextDeadline: "2025-03-29"
    },
    { 
      id: 3, 
      applicationNumber: "CR-2025-103",
      clientName: "Media Studios LLC",
      clientEmail: "legal@mediastudios.com",
      clientPhone: "(555) 456-7890",
      applicationType: "Copyright",
      applicationDate: "2025-03-05",
      status: "Active",
      nextDeadline: "2025-04-02"
    },
    { 
      id: 4, 
      applicationNumber: "PT-2025-078",
      clientName: "TechFirm Inc",
      clientEmail: "patents@techfirm.com",
      clientPhone: "(555) 234-5678",
      applicationType: "Patent",
      applicationDate: "2025-02-10",
      status: "Under Review",
      nextDeadline: "2025-04-10"
    },
    { 
      id: 5, 
      applicationNumber: "TM-2025-094",
      clientName: "Brand Masters Co",
      clientEmail: "info@brandmasters.com",
      clientPhone: "(555) 876-5432",
      applicationType: "Trademark",
      applicationDate: "2025-01-15",
      status: "Pending",
      nextDeadline: "2025-04-15"
    }
  ];

  // Filter function
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredCases([]);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = cases.filter(
      item => 
        item.applicationNumber.toLowerCase().includes(lowercaseQuery) ||
        item.clientName.toLowerCase().includes(lowercaseQuery) ||
        item.clientEmail.toLowerCase().includes(lowercaseQuery) ||
        item.applicationType.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredCases(filtered);
  };

  const casesToDisplay = searchQuery ? filteredCases : cases;

  // Handle case selection
  const toggleCaseSelection = (caseItem) => {
    if (selectedCase && selectedCase.id === caseItem.id) {
      setSelectedCase(null);
    } else {
      setSelectedCase(caseItem);
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get application type badge color
  const getTypeColor = (type) => {
    switch(type) {
      case 'Trademark':
        return 'bg-purple-100 text-purple-800';
      case 'Patent':
        return 'bg-indigo-100 text-indigo-800';
      case 'Copyright':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Cases</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage all your intellectual property cases</p>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by case number, client, email, or type..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="mr-2 h-5 w-5 text-gray-500" />
                Filter
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Filter options (collapsed by default) */}
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Type</label>
                  <select className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">All Types</option>
                    <option value="trademark">Trademark</option>
                    <option value="patent">Patent</option>
                    <option value="copyright">Copyright</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="review">Under Review</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="flex gap-2">
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <span className="text-gray-500 self-center">to</span>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-500">
                  Clear Filters
                </button>
                <button className="ml-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Cases List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {casesToDisplay.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {casesToDisplay.map((caseItem) => (
                <li key={caseItem.id}>
                  <div 
                    className={`px-6 py-4 cursor-pointer hover:bg-gray-50 ${selectedCase && selectedCase.id === caseItem.id ? 'bg-gray-50' : ''}`}
                    onClick={() => toggleCaseSelection(caseItem)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {selectedCase && selectedCase.id === caseItem.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="font-medium text-gray-900">{caseItem.applicationNumber}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(caseItem.applicationType)}`}>
                          {caseItem.applicationType}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <span className="truncate">{caseItem.clientName}</span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>
                          Deadline: {new Date(caseItem.nextDeadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded case details */}
                  {selectedCase && selectedCase.id === caseItem.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 py-4 bg-gray-50 border-t border-gray-100"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Client Details</h4>
                          <p className="mt-1 flex items-center text-sm text-gray-900">
                            {caseItem.clientName}
                          </p>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <Mail className="mr-1.5 h-4 w-4 text-gray-400" />
                            {caseItem.clientEmail}
                          </p>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <Phone className="mr-1.5 h-4 w-4 text-gray-400" />
                            {caseItem.clientPhone}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Application Details</h4>
                          <p className="mt-1 flex items-center text-sm text-gray-900">
                            {caseItem.applicationNumber} ({caseItem.applicationType})
                          </p>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                            Filed: {new Date(caseItem.applicationDate).toLocaleDateString()}
                          </p>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
                            Next Deadline: {new Date(caseItem.nextDeadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end space-x-3">
                        <button className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-500 border border-transparent rounded-md hover:border-indigo-300">
                          View Details
                        </button>
                        <button className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-500 border border-transparent rounded-md hover:border-indigo-300">
                          Edit Case
                        </button>
                        <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                          Manage Reminders
                        </button>
                      </div>
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          ) : searchQuery ? (
            <div className="px-6 py-10 text-center">
              <p className="text-gray-500">No cases found matching your search criteria.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-indigo-600 hover:text-indigo-500"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="px-6 py-10 text-center">
              <p className="text-gray-500">No cases available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CasesListPage;