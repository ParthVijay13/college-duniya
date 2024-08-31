import { useState } from "react";
import collegeData from "./Collegedata";

const SortOptions = () => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [data, setData] = useState(collegeData.slice(0, 10)); // Initially, show 10 rows

    const handleSort = (key) => {
        const sortedData = [...data].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
        setData(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div>
            <button onClick={() => handleSort('rating')}>Sort by Rating</button>
            <button onClick={() => handleSort('fees')}>Sort by Fees</button>
            <button onClick={() => handleSort('userReview')}>Sort by User Review</button>

            <ul>
                {data.map((college, index) => (
                    <li key={index}>
                        {college.name} - Rating: {college.rating}, Fees: {college.fees}, User Review: {college.userReview}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SortOptions;
