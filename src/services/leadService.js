import { API_ENDPOINTS, LEAD_DEFAULTS } from '../constants/api'
import { apiClient, lookupApiClient } from './apiClient'

function extractCollection(payload) {
  if (Array.isArray(payload)) return payload
  const nested = payload?.data ?? payload?.result ?? payload?.response ?? payload?.items
  return Array.isArray(nested) ? nested : nested ? extractCollection(nested) : []
}

function toOptions(payload, valueKeys, labelKeys) {
  return extractCollection(payload).map((item) => ({
    value: String(valueKeys.map((key) => item[key]).find((value) => value != null) ?? ''),
    label: String(labelKeys.map((key) => item[key]).find(Boolean) ?? 'Unnamed option'),
  })).filter((option) => option.value)
}

let lookupRequest

export async function getLeadLookups() {
  if (lookupRequest) return lookupRequest

  lookupRequest = Promise.all([
    lookupApiClient.get(API_ENDPOINTS.states),
    lookupApiClient.get(API_ENDPOINTS.leadTypes),
    apiClient.get(API_ENDPOINTS.industries),
    apiClient.get(API_ENDPOINTS.companies, { params: { CompanyId: 0 } }),
    apiClient.get(API_ENDPOINTS.sources),
  ]).then(([states, leadTypes, industries, companies, sources]) => ({
    states: toOptions(states.data, ['StateId', 'stateId', 'stateID', 'Id', 'id'], ['StateName', 'stateName', 'Name', 'name']),
    leadTypes: toOptions(leadTypes.data, ['LeadTypeId', 'leadTypeId', 'Id', 'id'], ['LeadTypeName', 'leadTypeName', 'leadtype', 'Name', 'name']),
    industries: toOptions(industries.data, ['IndustryId', 'industryId', 'Id', 'id'], ['IndustryName', 'industryName', 'industryTypes', 'Name', 'name']),
    companies: toOptions(companies.data, ['CompanyId', 'companyId', 'Id', 'id'], ['CompanyName', 'companyName', 'Name', 'name']),
    sources: toOptions(sources.data, ['SourceId', 'sourceId', 'Id', 'id'], ['SourceName', 'sourceName', 'Name', 'name']),
  })).catch((error) => {
    lookupRequest = undefined
    throw error
  })

  return lookupRequest
}

export async function getDistricts(stateId) {
  const response = await lookupApiClient.get(API_ENDPOINTS.districts, { params: { StateId: stateId } })
  return toOptions(response.data, ['DistrictId', 'districtId', 'Id', 'id'], ['DistrictName', 'districtName', 'Name', 'name'])
}

export async function submitLead(values) {
  const payload = {
    LeadName: values.leadName.trim(),
    LeadTypeId: Number(values.leadTypeId),
    CompanyId: Number(values.companyId),
    ValueAmt: Number(values.budget || 0),
    PersonName: values.leadName.trim(),
    ContactNo: values.contactNo.trim(),
    EmailId: values.email.trim(),
    SourceId: Number(values.sourceId),
    IndustryId: Number(values.industryId),
    Tags: 'Interior design,Website enquiry',
    Description: values.description.trim(),
    Address: values.address.trim(),
    StateId: Number(values.stateId),
    DistrictId: Number(values.districtId),
    Pincode: Number(values.pincode),
    ...LEAD_DEFAULTS,
  }
  const response = await apiClient.post(API_ENDPOINTS.submitLead, payload)
  if (response.data?.status !== true) {
    throw new Error(response.data?.message || 'The enquiry could not be submitted.')
  }
  return response.data
}
