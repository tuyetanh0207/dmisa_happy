import React from 'react';
import Select from 'react-select';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

const StatusFilter = (props) => {
  const { options, value, onChange, fieldName } = props;
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: '10px',
      background: state.isSelected ? '#3182ce' : 'white', // Adjust as needed
      color: state.isSelected ? 'white' : 'black', // Adjust as needed
    
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      marginRight: '20px', // Adjust the paddingRight as needed
    }),
  };

  const selectOptions = options.map((option) => ({ value: option, label: option }));
  const placeholder = value ? value : fieldName;
  return (
    <Select
      options={selectOptions}
      value={value}
      onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : null)}
      styles={customStyles}
      placeholder={placeholder}
      className='w-32'
      components={{
        IndicatorSeparator: () => null, // Removes indicator separator
        DropdownIndicator: () => <AdjustmentsHorizontalIcon className="w-4 h-4 text-blue-600" />,
      }}
    />
  );
};

export default StatusFilter;
