export const API_ENDPOINTS = {
  states: '/api/Auth/GetStates',
  districts: '/api/Auth/GetDistrictById',
  leadTypes: '/api/Admin/GetLeadType',
  industries: '/api/Admin/GetIndustryType',
  companies: '/api/Admin/GetCompanyDetail',
  sources: '/api/Admin/GetSourceOfLead',
  submitLead: '/api/Admin/PostLeadDetail',
}

export const LEAD_DEFAULTS = {
  Visibility: 1,
  CreateBy: '1',
  StageId: 1,
  StageUserId: '2',
  StageTags: 'Website enquiry',
  StageDescription: 'Lead submitted through the interior design website',
  StageVisibility: 1,
  LeadStatus: 'Open',
}
