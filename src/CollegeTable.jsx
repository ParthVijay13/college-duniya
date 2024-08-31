import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import collegeData from './Collegedata';
import './collegetable.css';

const CollegeTable = () => {
  const [data, setData] = useState(collegeData.slice(0, 10)); // Initially, show 10 rows
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc'); // Track the sort order
  const [sortByRating, setSortByRating] = useState(false); // Track if sorting by rating
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

  const handlesortByFees = () => {
    let sortedData = [...collegeData]; // Create a copy of the data to sort

    sortedData.sort((a, b) => {
      const feeA = parseFloat(a.fees.replace(/[^0-9.-]+/g, ""));
      const feeB = parseFloat(b.fees.replace(/[^0-9.-]+/g, ""));
      return sortOrder === 'asc' ? feeA - feeB : feeB - feeA;
    });

    setData(sortedData.slice(0, data.length)); // Update the displayed data
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle the sort order
    setSortByRating(false); // Ensure sorting by rating is disabled
  };

  const handlesortByRating = () => {
    let sortedData = [...collegeData]; // Create a copy of the data to sort

    sortedData.sort((a, b) => {
      const ratingA = parseFloat(a.placement.split(' ')[0]); // Extract the rating number
      const ratingB = parseFloat(b.placement.split(' ')[0]);
      return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
    });

    setData(sortedData.slice(0, data.length)); // Update the displayed data
    setSortByRating(true); // Set the sortByRating flag
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle the sort order
  };

  const fetchMoreData = () => {
    if (data.length >= collegeData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setData(data.concat(collegeData.slice(data.length, data.length + 10)));
    }, 1500);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredData = collegeData.filter(college => college.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setData(filteredData.slice(0, 10)); // Reset to show only the first 10 results
    setHasMore(filteredData.length > 10); // Update 'hasMore' based on filtered results
  };

  return (
    <div className="max-w-[100vw] mx-auto px-4 sm:px-6 lg:px-8 mt-5 bg-gradient-to-r from-teal-800 to-teal-100">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by College Name"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-2 px-4 py-2 border rounded mr-2"
        />
        <button
          onClick={handlesortByFees}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Sort by Fees ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
        <button
          onClick={handlesortByRating}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Sort by Placement Rating ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>
      {data.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-xl">No colleges found that match your search criteria.</h3>
        </div>
      )}
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p className="text-center text-gray-500 text-xs">No more colleges to display.</p>}
      >
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-5 text-left">College Name</th>
              <th className="py-3 px-5 text-left">Rank</th>
              <th className="py-3 px-5 text-left">Location</th>
              <th className="py-3 px-5 text-left">Approval</th>
              <th className="py-3 px-5 text-left">Fees</th>
              <th className="py-3 px-5 text-left">Course</th>
              <th className="py-3 px-5 text-left">Avg Package</th>
              <th className="py-3 px-5 text-left">High Package</th>
              <th className="py-3 px-5 text-left">Placement</th>
              <th className="py-3 px-5 text-left">Specialty</th>
              <th className="py-3 px-5 text-left">Ranking</th>
              <th className="py-3 px-5 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.map((college, index) => (
              <CollegeRow key={index} college={college} />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

const CollegeRow = ({ college }) => {
  if (!college) {
    return null; // Or handle the case where college is missing
  }

  const { name, rank, location, approval, fees, course, average_package, highest_package, placement, specialty, ranking, rating } = college;

  return (
    <tr>
      <td className='table-cell ranking-cell'>{name}</td>
      <td className='table-cell ranking-cell'>{rank}</td>
      <td className='table-cell'>{location}</td>
      <td className='table-cell'>{approval}</td>
      <td className='table-cell'>{fees}</td>
      <td className='table-cell'>{course}</td>
      <td className='table-cell'>{average_package}</td>
      <td className='table-cell'>{highest_package}</td>
      <td className='table-cell'>{placement}</td>
      <td className='table-cell'>{specialty}</td>
      <td className='table-cell'>{ranking}</td>
      <td className='table-cell'>{rating}</td>
    </tr>
  );
};

export default CollegeTable;
