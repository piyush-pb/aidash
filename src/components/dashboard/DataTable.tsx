'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  MoreHorizontal,
  Edit,
  Pause,
  Play,
  Trash2
} from 'lucide-react';
import { CampaignTableProps } from '@/types/dashboard';
import { formatCurrency, formatNumber, formatPercentage, getStatusColor, sortData, searchData, paginateData } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function DataTable({
  data,
  loading = false,
  error,
  sortBy: initialSortBy,
  sortDirection: initialSortDirection,
  currentPage: initialCurrentPage = 1,
  itemsPerPage = 10,
  onSort,
  onPageChange,
  onSearch,
  className
}: CampaignTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(initialSortBy || 'name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(initialSortDirection || null);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = data;
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = searchData(result, searchQuery, ['name']);
    }
    
    // Apply sorting
    if (sortDirection) {
      result = sortData(result, sortBy as keyof typeof data[0], sortDirection);
    }
    
    return result;
  }, [data, searchQuery, sortBy, sortDirection]);

  // Paginate data
  const { data: paginatedData, meta } = useMemo(() => {
    return paginateData(filteredData, currentPage, itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Handle sorting
  const handleSort = useCallback((column: string) => {
    const newDirection = 
      sortBy === column && sortDirection === 'asc' ? 'desc' :
      sortBy === column && sortDirection === 'desc' ? null : 'asc';
    
    setSortBy(column);
    setSortDirection(newDirection);
    setCurrentPage(1); // Reset to first page when sorting
    
    if (onSort) {
      onSort(column);
    }
  }, [sortBy, sortDirection, onSort]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
    
    if (onSearch) {
      onSearch(query);
    }
  }, [onSearch]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    
    if (onPageChange) {
      onPageChange(page);
    }
  }, [onPageChange]);

  // Get sort icon
  const getSortIcon = (column: string) => {
    if (sortBy !== column) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp className="w-4 h-4 text-primary-600" />;
    }
    if (sortDirection === 'desc') {
      return <ChevronDown className="w-4 h-4 text-primary-600" />;
    }
    return <ChevronUp className="w-4 h-4 text-gray-400" />;
  };

  if (loading) {
    return (
      <div className={cn(
        "bg-white rounded-xl shadow-soft border border-gray-100",
        "animate-pulse",
        className
      )}>
        <div className="p-6">
          <div className="w-64 h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(
        "bg-white rounded-xl shadow-soft border border-gray-100 p-6",
        "flex items-center justify-center",
        className
      )}>
        <div className="text-center">
          <div className="text-error-500 text-sm mb-1">Table Error</div>
          <div className="text-text-secondary text-xs">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-soft border border-gray-100",
      className
    )}>
      {/* Table Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Campaign Performance</h3>
            <p className="text-sm text-text-secondary">
              Showing {meta.totalItems} campaigns
            </p>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Campaign Name
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('clicks')}
              >
                <div className="flex items-center justify-end gap-2">
                  Clicks
                  {getSortIcon('clicks')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('conversions')}
              >
                <div className="flex items-center justify-end gap-2">
                  Conversions
                  {getSortIcon('conversions')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('cost')}
              >
                <div className="flex items-center justify-end gap-2">
                  Cost
                  {getSortIcon('cost')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('cpc')}
              >
                <div className="flex items-center justify-end gap-2">
                  CPC
                  {getSortIcon('cpc')}
                </div>
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedData.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text-primary">
                        {campaign.name}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {campaign.conversionRate}% conv. rate
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text-primary">
                  {formatNumber(campaign.clicks)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text-primary">
                  {formatNumber(campaign.conversions)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text-primary">
                  {formatCurrency(campaign.cost)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text-primary">
                  {formatCurrency(campaign.cpc)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={cn(
                    "inline-flex px-2 py-1 text-xs font-medium rounded-full",
                    getStatusColor(campaign.status)
                  )}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <Edit className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      {campaign.status === 'active' ? (
                        <Pause className="w-4 h-4 text-warning-500" />
                      ) : (
                        <Play className="w-4 h-4 text-success-500" />
                      )}
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, meta.totalItems)} of {meta.totalItems} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!meta.hasPreviousPage}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-text-primary">
                Page {currentPage} of {meta.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!meta.hasNextPage}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {paginatedData.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-text-secondary text-sm">
            {searchQuery ? 'No campaigns match your search.' : 'No campaigns available.'}
          </div>
        </div>
      )}
    </div>
  );
} 