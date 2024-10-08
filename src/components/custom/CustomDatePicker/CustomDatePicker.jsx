import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-datepicker.css';
import PropTypes from 'prop-types';

const CustomDatePicker = ({ selectedDate, onDateChange, placeholder, maxDate, disabled, minDate  }) => {
    useEffect(() => {
        // Apply custom styles to the DatePicker dropdown
        const datePickerDropdown = document.querySelector('.react-datepicker');
        if (datePickerDropdown) {
            datePickerDropdown.style.backgroundColor = '#27272a'; // zinc-800 background
            datePickerDropdown.style.color = '#ffffff'; // white text
        }

        // Apply custom styles to the arrows
        const datePickerArrows = document.querySelectorAll('.react-datepicker__navigation-icon');
        datePickerArrows.forEach((arrow) => {
            arrow.style.borderColor = '#ffffff'; // white arrow
        });
    }, [selectedDate]);

    return (
        <DatePicker
            selected={selectedDate ? new Date(selectedDate) : null}
            onChange={(date) => onDateChange(date)}
            dateFormat="MMMM, yyyy" 
            className="bg-transparent border-b-2 text-gray-100 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
            placeholderText={placeholder}
            showMonthYearPicker 
            showFullMonthYearPicker
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={25}
            dropdownMode="select"
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
        />
    );
};


CustomDatePicker.propTypes = {
    selectedDate: PropTypes.string.isRequired,
    onDateChange: PropTypes.func.isRequired,   
    placeholder: PropTypes.string,             
    maxDate: PropTypes.instanceOf(Date),       
    disabled: PropTypes.bool,                  
    minDate: PropTypes.instanceOf(Date),       
};

export default CustomDatePicker;
