import { useEffect, useState } from 'react';
import { Select, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

// Filter component
export const FilterComponent = ({ 
  handleSelectValue,
  city,
  age,
  clearFilter,
  setState
}) => {
  // Dummy options for select dropdowns
  const ageOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },

  ];
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentState, setCurrentState] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://childcare-prices.onrender.com/api/get_cities');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('data',data)
      // Modify data structure
      const modifiedData = data?.data?.map(cityData => ({
        label: cityData.city,
        value: cityData.city,
        state: cityData.state
      }));
      setCities(modifiedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
   

    fetchData();
  }, []);

  const handleSearch = (e) => {
    console.log('e',e)
    setSearchTerm(e);
  };

  // Filter cities based on search term
  const filteredCities = cities.filter(city =>
    city.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCityChange = value => {


    handleSelectValue('city', value.split(',')[0]);
    const currentCity = cities.find(city =>
      city.value.toLowerCase() == value.split(',')[0]?.toLowerCase()
    );
    console.log('cureee',currentCity,cities)
    setState(currentCity?.state)
    setCurrentState(currentCity?.state)
  };

  return (
    <div className="flex flex-wrap justify-start items-center gap-3 w-[95vw]">
  <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
      City :
      <Select
        className="min-w-[150px] bg-[#e5e5e5] rounded-xl"
        onChange={handleCityChange}
        variant="filled"
        style={{ flex: 1 }}
        dropdownStyle={{background:'#ffffff',backgroundColor:'#ffffff'}}
        options={cities.map(({ label, state }) => ({ label: `${label}, ${state}`, value:  `${label}, ${state}` }))}
        value={city ? `${city}, ${currentState}` : null} // Display both city and state, but send only city
        onSearch={handleSearch}
        filterOption={(input, option) =>
          option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        showSearch
      />
      {city && (
        <CloseCircleOutlined
          className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
          onClick={() => handleSelectValue('city', '')} // Clear individual filter
        />
      )}
    </div>


      <div className="text-base font-medium items-center gap-2 flex bg-[#e8edf5] p-2 rounded-[8px]">
        Age :
        <Select
          className="min-w-[100px] bg-[#e5e5e5] rounded-xl"
          onChange={(e) => handleSelectValue("age", e)}
          variant="filled"
          style={{ flex: 1 }}
          options={ageOptions}
          value={age}
        />
        {age && (
          <CloseCircleOutlined
            className="bg-[#e8edf5] p-2 rounded-xl text-[#FF0000] cursor-pointer"
            onClick={() => handleSelectValue('age', '')} // Clear individual filter
          />
        )}
      </div>

      {(city || age) && (
        <Button type="primary" onClick={clearFilter}>Clear All Filters</Button> // Button to clear all filters
      )}
    </div>
  );
}
