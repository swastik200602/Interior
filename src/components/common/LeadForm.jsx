import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, RefreshCw, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getDistricts, getLeadLookups, submitLead } from '../../services/leadService'
import { leadSchema } from '../../utils/leadSchema'
import Button from '../ui/Button'
import { FormField, SelectField } from '../ui/FormField'

const defaultValues = {
  leadName: '',
  email: '',
  contactNo: '',
  leadTypeId: '',
  companyId: '',
  sourceId: '',
  industryId: '',
  budget: '',
  address: '',
  stateId: '',
  districtId: '',
  pincode: '',
  description: '',
}

const emptyLookups = {
  states: [],
  leadTypes: [],
  industries: [],
  companies: [],
  sources: [],
}

function LeadForm() {
  const [lookups, setLookups] = useState(emptyLookups)
  const [districts, setDistricts] = useState([])
  const [isLoadingLookups, setIsLoadingLookups] = useState(true)
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false)
  const [lookupError, setLookupError] = useState('')
  const districtRequest = useRef(0)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(leadSchema), defaultValues })
  const stateRegistration = register('stateId')

  async function loadLookups() {
    setIsLoadingLookups(true)
    setLookupError('')
    try {
      setLookups(await getLeadLookups())
    } catch (error) {
      setLookupError(error.message)
    } finally {
      setIsLoadingLookups(false)
    }
  }

  useEffect(() => {
    let isCurrent = true
    getLeadLookups()
      .then((items) => {
        if (isCurrent) setLookups(items)
      })
      .catch((error) => {
        if (isCurrent) setLookupError(error.message)
      })
      .finally(() => {
        if (isCurrent) setIsLoadingLookups(false)
      })

    return () => { isCurrent = false }
  }, [])

  async function handleStateChange(event) {
    stateRegistration.onChange(event)
    const stateId = event.target.value
    const requestId = ++districtRequest.current
    setValue('districtId', '')
    setDistricts([])
    setIsLoadingDistricts(Boolean(stateId))
    if (!stateId) return

    try {
      const items = await getDistricts(stateId)
      if (requestId === districtRequest.current) setDistricts(items)
    } catch (error) {
      toast.error(error.message)
    } finally {
      if (requestId === districtRequest.current) setIsLoadingDistricts(false)
    }
  }

  async function onSubmit(values) {
    try {
      const result = await submitLead(values)
      toast.success(result?.message || 'Your enquiry has been submitted successfully.')
      reset(defaultValues)
      setDistricts([])
    } catch (error) {
      toast.error(error.message)
    }
  }

  const selectsDisabled = isLoadingLookups || Boolean(lookupError)

  return (
    <form
      className="rounded-lg bg-surface p-5 sm:p-8"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-wider text-primary uppercase">
          Project enquiry
        </p>
        <h2 className="mt-2 font-display text-4xl">Tell us about your space</h2>
        <p className="mt-3 leading-7 text-muted">
          Fields marked by validation are required before submission.
        </p>
      </div>

      {isLoadingLookups && (
        <p
          className="mb-6 flex items-center gap-2 rounded-md bg-background p-4 text-sm text-muted"
          role="status"
        >
          <LoaderCircle className="animate-spin" aria-hidden="true" size={18} />
          Loading form options…
        </p>
      )}

      {lookupError && (
        <div className="mb-6 rounded-md border border-destructive/30 bg-background p-4">
          <p className="text-sm text-destructive">{lookupError}</p>
          <Button
            className="mt-3"
            size="sm"
            variant="outline"
            onClick={loadLookups}
          >
            <RefreshCw aria-hidden="true" size={16} /> Retry
          </Button>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="leadName"
          label="Full name"
          placeholder="Your name"
          error={errors.leadName}
          {...register('leadName')}
        />
        <FormField
          id="contactNo"
          label="Mobile number"
          inputMode="numeric"
          placeholder="10-digit mobile number"
          error={errors.contactNo}
          {...register('contactNo')}
        />
        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          error={errors.email}
          {...register('email')}
        />
        <SelectField
          id="leadTypeId"
          label="Project type"
          options={lookups.leadTypes}
          disabled={selectsDisabled}
          error={errors.leadTypeId}
          {...register('leadTypeId')}
        />
        <SelectField
          id="companyId"
          label="Company"
          options={lookups.companies}
          disabled={selectsDisabled}
          error={errors.companyId}
          {...register('companyId')}
        />
        <SelectField
          id="industryId"
          label="Industry"
          options={lookups.industries}
          disabled={selectsDisabled}
          error={errors.industryId}
          {...register('industryId')}
        />
        <SelectField
          id="sourceId"
          label="How did you find us?"
          options={lookups.sources}
          disabled={selectsDisabled}
          error={errors.sourceId}
          {...register('sourceId')}
        />
        <FormField
          id="budget"
          label="Estimated budget (₹)"
          inputMode="numeric"
          placeholder="Optional"
          error={errors.budget}
          {...register('budget')}
        />
        <div className="sm:col-span-2">
          <FormField
            id="address"
            label="Project address"
            placeholder="Area and street"
            error={errors.address}
            {...register('address')}
          />
        </div>
        <SelectField
          id="stateId"
          label="State"
          options={lookups.states}
          disabled={selectsDisabled}
          error={errors.stateId}
          {...stateRegistration}
          onChange={handleStateChange}
        />
        <SelectField
          id="districtId"
          label="District"
          options={districts}
          placeholder={isLoadingDistricts ? 'Loading districts…' : 'Select a district'}
          disabled={isLoadingDistricts || !districts.length}
          error={errors.districtId}
          {...register('districtId')}
        />
        <FormField
          id="pincode"
          label="Pincode"
          inputMode="numeric"
          placeholder="6-digit pincode"
          error={errors.pincode}
          {...register('pincode')}
        />
        <div className="sm:col-span-2">
          <FormField
            id="description"
            label="Project brief"
            multiline
            placeholder="Tell us about the space, scope, timeline, and what you hope to create…"
            error={errors.description}
            {...register('description')}
          />
        </div>
      </div>

      <Button
        className="mt-7 w-full sm:w-auto"
        disabled={isSubmitting || selectsDisabled}
        size="lg"
        type="submit"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="animate-spin" aria-hidden="true" size={18} />
            Submitting…
          </>
        ) : (
          <>
            Send enquiry <Send aria-hidden="true" size={18} />
          </>
        )}
      </Button>
    </form>
  )
}

export default LeadForm
