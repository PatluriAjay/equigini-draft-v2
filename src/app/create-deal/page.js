'use client'
import { useState } from 'react'
import { FiInfo, FiFileText, FiUpload, FiToggleLeft, FiDelete } from 'react-icons/fi'
import { MdAdd, MdDelete } from 'react-icons/md';
import Select from 'react-select'

function DealDocuments() {
  const [docs, setDocs] = useState([
    { id: 1, type: '', file: null }
  ]);

  const docTypeOptions = [
    { value: '', label: 'Select Type' },
    { value: 'Pitch Deck', label: 'Pitch Deck' },
    { value: 'IM', label: 'IM' },
    { value: 'Financials', label: 'Financials' }
  ];

  const handleTypeChange = (selected, idx) => {
    setDocs(docs => docs.map((d, i) => i === idx ? { ...d, type: selected.value } : d));
  };
  const handleFileChange = (e, idx) => {
    const file = e.target.files[0];
    setDocs(docs => docs.map((d, i) => i === idx ? { ...d, file } : d));
  };
  const handleAdd = () => {
    setDocs(docs => [...docs, { id: Date.now(), type: '', file: null }]);
  };
  const handleDelete = idx => {
    setDocs(docs => docs.length > 1 ? docs.filter((_, i) => i !== idx) : docs);
  };

  return (
    <div className="space-y-3">
      {docs.map((doc, idx) => (
        <div key={doc.id} className="flex items-center gap-2 bg-gray-50 border rounded-lg px-2 py-2">
          <div className="w-1/4 min-w-[150px]">
            <Select
              classNamePrefix="react-select"
              options={docTypeOptions}
              value={docTypeOptions.find(opt => opt.value === doc.type)}
              onChange={selected => handleTypeChange(selected, idx)}
              styles={{
                      control: (base, state) => ({
                        ...base,
                        backgroundColor: 'transparent',
                        borderColor: state.isFocused ? '#a330ae' : '#ededed',
                        boxShadow: state.isFocused
                          ? '0 0 0 2px #e9d6fa'
                          : 'none',
                        minHeight: '44px',
                        color: '#111'
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? '#e9d6fa'
                          : state.isFocused
                          ? '#f3eafd'
                          : '#fff',
                        color: '#111',
                        fontWeight: state.isSelected ? 600 : 400,
                        cursor: 'pointer'
                      }),
                      singleValue: base => ({ ...base, color: '#111' }),
                      menu: base => ({ ...base, zIndex: 20 })
                    }}
                    theme={theme => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary25: '#f3eafd', // hover
                        primary: '#a330ae', // active
                        neutral0: '#fff',
                        neutral80: '#111'
                      }
                    })}
            />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <span className="flex-1 text-black">
              {doc.file ? doc.file.name : 'No file selected'}
            </span>
            <input
              type="file"
              className="hidden"
              id={`deal-doc-upload-${doc.id}`}
              onChange={e => handleFileChange(e, idx)}
            />
            <label htmlFor={`deal-doc-upload-${doc.id}`} className="bg-black text-white px-4 py-1 rounded cursor-pointer">Browse</label>
            <button type="button" className="text-2xl text-[#a330ae]" onClick={handleAdd} title="Add"><MdAdd size={25} /></button>
            <button type="button" className="text-2xl text-red-700" onClick={() => handleDelete(idx)} title="Delete"><MdDelete size={25} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

const steps = [
  { label: 'Basic Details', icon: FiInfo },
  { label: 'Deal Details', icon: FiFileText },
  { label: 'Document Upload', icon: FiUpload }
]

export default function CreateDealPage () {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    title: '',
    geography: '',
    sector: '',
    stage: ''
  })
  const [formData, setFormData] = useState({
    priority: { value: false, label: 'No' },
    visibility: { value: '', label: 'Select Visibility' }
  })
  const priorityOptions = [
    { value: false, label: 'No' },
    { value: true, label: 'Yes' }
  ]
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData(prev => ({
      ...prev,
      [name]: selectedOption
    }))
  }
  const visibilityOptions = [
    { value: '', label: 'Select Visibility' },
    { value: 'Public', label: 'Public' },
    { value: 'Private', label: 'Private' }
  ]
  const handleVisibilityChange = selectedOption => {
    setFormData(prev => ({
      ...prev,
      visibility: selectedOption
    }))
  }
  const handlePriorityChange = selectedOption => {
    setFormData(prev => ({
      ...prev,
      priority: selectedOption
    }))
  }
  const handleSectorChange = selectedOption => {
    setForm(f => ({ ...f, sector: selectedOption.value }))
  }
  const handleStageChange = selectedOption => {
    setForm(f => ({ ...f, stage: selectedOption.value }))
  }

  // Step 1: Basic Details
  return (
    <div
      className='px-10 py-1'
      style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
    >
      <div className='rounded-2xl shadow px-8 py-4 overflow-visible'>
        <h2 className='text-2xl font-bold mb-6'>Create Deal</h2>
        {/* Stepper */}
        <div className='flex items-center justify-between mb-10'>
          {steps.map((s, i) => (
            <div
              key={s.label}
              className='flex-1 flex flex-col items-center relative'
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full shadow transition-all mb-2 z-10
                ${
                  step === i
                    ? 'bg-white border-2 border-[#a330ae]'
                    : 'bg-gray-100'
                }
              `}
              >
                <s.icon
                  className={`text-2xl ${
                    step === i ? 'text-[#a330ae]' : 'text-gray-400'
                  }`}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  step === i ? 'text-[#a330ae]' : 'text-gray-500'
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className='absolute top-6 right-0 left-1/2 w-full h-1 flex items-center'>
                  <div
                    className={`h-1 w-full mx-auto ${
                      step > i ? 'bg-gray-200' : 'bg-gray-200'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Step 1 Form */}
        {step === 0 && (
          <form className='space-y-6'>
            <div>
              <label className='block font-semibold mb-1'>Deal Title</label>
              <input
                type='text'
                className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a330ae40]'
                placeholder='Enter deal title'
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
            </div>
            <div>
              <label className='block font-semibold mb-1'>Geography</label>
              <input
                type='text'
                className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a330ae40]'
                placeholder='Enter geography'
                value={form.geography}
                onChange={e =>
                  setForm(f => ({ ...f, geography: e.target.value }))
                }
              />
            </div>
            <div>
              <label className='block font-semibold mb-1'>Sector</label>
              <Select
                id='sector-select'
                className='mb-3'
                classNamePrefix='react-select'
                options={[
                  { value: '', label: 'Select Sector' },
                  { value: 'Finance', label: 'Finance' }
                  // { value: 'Technology', label: 'Technology' },
                  // { value: 'Healthcare', label: 'Healthcare' },
                  // { value: 'Real Estate', label: 'Real Estate' },
                ]}
                value={[
                  { value: '', label: 'Select Sector' },
                  { value: 'Finance', label: 'Finance' }
                  // { value: 'Technology', label: 'Technology' },
                  // { value: 'Healthcare', label: 'Healthcare' },
                  // { value: 'Real Estate', label: 'Real Estate' },
                ].find(opt => opt.value === form.sector)}
                onChange={opt => setForm(f => ({ ...f, sector: opt.value }))}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    borderColor: state.isFocused ? '#a330ae' : '#111111',
                    boxShadow: state.isFocused ? '0 0 0 2px #e9d6fa' : 'none',
                    minHeight: '44px',
                    color: '#111'
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? '#e9d6fa'
                      : state.isFocused
                      ? '#f3eafd'
                      : '#fff',
                    color: '#111',
                    fontWeight: state.isSelected ? 600 : 400,
                    cursor: 'pointer'
                  }),
                  singleValue: base => ({ ...base, color: '#111' }),
                  menu: base => ({ ...base, zIndex: 20 })
                }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary25: '#f3eafd', // hover
                    primary: '#a330ae', // active
                    neutral0: '#fff',
                    neutral80: '#111'
                  }
                })}
              />
            </div>
            <div>
              <label className='block font-semibold mb-1'>Stage</label>
              <Select
                id='stage-select'
                classNamePrefix='react-select'
                options={[
                  { value: '', label: 'Select Stage' },
                  { value: 'Seed', label: 'Seed' }
                  // { value: 'Series A', label: 'Series A' },
                  // { value: 'Series B', label: 'Series B' },
                  // { value: 'Growth', label: 'Growth' },
                ]}
                value={[
                  { value: '', label: 'Select Stage' },
                  { value: 'Seed', label: 'Seed' }
                  // { value: 'Series A', label: 'Series A' },
                  // { value: 'Series B', label: 'Series B' },
                  // { value: 'Growth', label: 'Growth' },
                ].find(opt => opt.value === form.stage)}
                onChange={opt => setForm(f => ({ ...f, stage: opt.value }))}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    borderColor: state.isFocused ? '#a330ae' : '#111111',
                    boxShadow: state.isFocused ? '0 0 0 2px #e9d6fa' : 'none',
                    minHeight: '44px',
                    color: '#111'
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? '#e9d6fa'
                      : state.isFocused
                      ? '#f3eafd'
                      : '#fff',
                    color: '#111',
                    fontWeight: state.isSelected ? 600 : 400,
                    cursor: 'pointer'
                  }),
                  singleValue: base => ({ ...base, color: '#111' }),
                  menu: base => ({ ...base, zIndex: 20 })
                }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary25: '#f3eafd', // hover
                    primary: '#a330ae', // active
                    neutral0: '#fff',
                    neutral80: '#111'
                  }
                })}
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='button'
                className='bg-[#ededed] text-black px-8 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform me-7'
                onClick={() => setStep(1)}
              >
                Save
              </button>
              <button
                type='button'
                className='bg-[#a330ae] text-white px-8 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform'
                onClick={() => setStep(1)}
              >
                Next
              </button>
            </div>
          </form>
        )}
        {/* Placeholder for Step 2 and 3 */}
        {step === 1 && (
          <form className='space-y-6'>
            <div>
              <label className='block font-semibold mb-1'>
                Ticket Size Range
              </label>
              <Select
                id='ticket-size-select'
                classNamePrefix='react-select'
                options={[
                  { value: '', label: 'Select Range' },
                  { value: '0-1M', label: '0 - 1M' }
                ]}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    borderColor: state.isFocused ? '#a330ae' : '#111111',
                    boxShadow: state.isFocused ? '0 0 0 2px #e9d6fa' : 'none',
                    minHeight: '44px',
                    color: '#111'
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? '#e9d6fa'
                      : state.isFocused
                      ? '#f3eafd'
                      : '#fff',
                    color: '#111',
                    fontWeight: state.isSelected ? 600 : 400,
                    cursor: 'pointer'
                  }),
                  singleValue: base => ({ ...base, color: '#111' }),
                  menu: base => ({ ...base, zIndex: 20 })
                }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary25: '#f3eafd', // hover
                    primary: '#a330ae', // active
                    neutral0: '#fff',
                    neutral80: '#111'
                  }
                })}
              />
            </div>
            <div>
              <label className='block font-semibold mb-1'>Status</label>
              <Select
                id='status-select'
                classNamePrefix='react-select'
                options={[
                  { value: '', label: 'Select Status' },
                  { value: 'Open', label: 'Open' },
                  { value: 'Closed', label: 'Closed' }
                ]}
                // value and onChange logic to be added as needed
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    borderColor: state.isFocused ? '#a330ae' : '#111111',
                    boxShadow: state.isFocused ? '0 0 0 2px #e9d6fa' : 'none',
                    minHeight: '44px',
                    color: '#111'
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? '#e9d6fa'
                      : state.isFocused
                      ? '#f3eafd'
                      : '#fff',
                    color: '#111',
                    fontWeight: state.isSelected ? 600 : 400,
                    cursor: 'pointer'
                  }),
                  singleValue: base => ({ ...base, color: '#111' }),
                  menu: base => ({ ...base, zIndex: 20 })
                }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary25: '#f3eafd', // hover
                    primary: '#a330ae', // active
                    neutral0: '#fff',
                    neutral80: '#111'
                  }
                })}
              />
            </div>
            <div>
              <label className='block font-semibold mb-1'>Summary</label>
              <textarea
                className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a330ae40]'
                placeholder='Brief summary for listing'
                rows={2}
              />
            </div>
            <div className='flex gap-4'>
              <div style={{ flex: 1 }}>
                <label className='font-semibold'>Deal Priority Flag</label>
                <div className='mt-3' style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    type="button"
                    aria-pressed={formData.priority?.value === true}
                    onClick={() =>
                      handleSelectChange(
                        priorityOptions[
                          formData.priority?.value === true ? 1 : 0
                        ],
                        { name: "priority" }
                      )
                    }
                    className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out bg-gray-200 border ${
                      formData.priority?.value === true
                        ? "border-primary"
                        : "border-gray-300"
                    }`}
                    style={{
                      boxShadow:
                        formData.priority?.value === true
                          ? "0 0 0 2px #a330ae55"
                          : undefined,
                    }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                        formData.priority?.value === true ? "translate-x-5" : ""
                      }`}
                      style={{
                        backgroundColor:
                          formData.priority?.value === true
                            ? "#a330ae"
                            : "#ffffff",
                      }}
                    ></div>
                  </button>
                  <span className='text-gray-600 ms-2'>High Priority</span>
                </div>
              </div>
              <div style={{ width: '60%' }}>
                <div>
                  <label className='block font-semibold mb-1'>Visibility</label>
                  <Select
                    id='visibility-select'
                    classNamePrefix='react-select'
                    options={[
                      { value: '', label: 'Select Visibility' },
                      { value: 'Public', label: 'Public' },
                      { value: 'Private', label: 'Private' }
                    ]}
                    // value and onChange logic to be added as needed
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        backgroundColor: 'transparent',
                        borderColor: state.isFocused ? '#a330ae' : '#111111',
                        boxShadow: state.isFocused
                          ? '0 0 0 2px #e9d6fa'
                          : 'none',
                        minHeight: '44px',
                        color: '#111'
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? '#e9d6fa'
                          : state.isFocused
                          ? '#f3eafd'
                          : '#fff',
                        color: '#111',
                        fontWeight: state.isSelected ? 600 : 400,
                        cursor: 'pointer'
                      }),
                      singleValue: base => ({ ...base, color: '#111' }),
                      menu: base => ({ ...base, zIndex: 20 })
                    }}
                    theme={theme => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary25: '#f3eafd', // hover
                        primary: '#a330ae', // active
                        neutral0: '#fff',
                        neutral80: '#111'
                      }
                    })}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className='block font-semibold mb-1'>
                Detailed Description
              </label>
              <textarea
                className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#a330ae40]'
                placeholder='Provide a comprehensive description of the deal...'
                rows={3}
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='button'
                className='bg-[#ededed] text-black px-8 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform me-7'
                onClick={() => setStep(0)}
              >
                Back
              </button>
              <button
                type='button'
                className='bg-[#a330ae] text-white px-8 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform'
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form className="space-y-8">
            <div>
              <label className="block font-semibold mb-1">Teaser Document</label>
              <div className="flex items-center gap-2 bg-transparent border rounded-lg px-4 py-3">
                <span className="flex-1 text-black">No file selected</span>
                <input type="file" className="hidden" id="teaser-upload" />
                <label htmlFor="teaser-upload" className="bg-black text-white px-4 py-1 rounded cursor-pointer">Browse</label>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Deal Collateral Documents</label>
              <DealDocuments />
            </div>
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="bg-[#ededed] text-black px-8 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="bg-[#ededed] text-black px-8 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="bg-[#a330ae] text-white px-8 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
