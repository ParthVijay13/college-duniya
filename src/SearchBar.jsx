import { useState } from "react";
import collegeData from "./Collegedata";
// import CollegeTable from "./CollegeTable";
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [, setData] = useState(collegeData.slice(0, 10)); // Initially, show 10 rows


    const handleSearch = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        setSearchTerm(searchQuery);
        const filteredData = collegeData.filter(college =>
            college.name.toLowerCase().includes(searchQuery)
        );
        setData(filteredData.slice(0, 10)); // Reset to first 10 results
    };


    return (
        <input
            type="text"
            placeholder="Search by college name..."
            value={searchTerm}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;