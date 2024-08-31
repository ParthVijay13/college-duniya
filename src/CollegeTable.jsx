
import  { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import collegeData from './Collegedata';
import SortOptions from './SortOptions';
import SearchBar from './SearchBar';

const CollegeTable = () => {
  const [data, setData] = useState(collegeData.slice(0, 10)); // Initially, show 10 rows
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (data.length >= collegeData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setData(data.concat(collegeData.slice(data.length, data.length + 10)));
    }, 1500);
  };

  return (
    <div>
      <SearchBar />
      <SortOptions />

      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more colleges to display.</p>}
      >
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>College Name</th>
              <th>Rank</th>
              <th>Location</th>
              <th>Approval</th>
              <th>Fees</th>
              <th>Course</th>
              <th>Average Package</th>
              <th>Highest Package</th>
              <th>Placement</th>
              <th>Specialty</th>
              <th>Ranking</th>
            </tr>
          </thead>
          <tbody>
            {data.map((college, index) => (
              <CollegeRow key={index} college={college} />
              
            ))
            }
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

const CollegeRow = ({ college }) => {
  // Ensure college prop is defined
  if (!college) {
    return null; // Or handle the case where college is missing
  }

  const { name, rank, location, approval, fees, course, average_package, highest_package, placement, specialty, ranking } = college;

  return (
    <tr>
      <td>{name}</td>
      <td>{rank}</td>
      <td>{location}</td>
      <td>{approval}</td>
      <td>{fees}</td>
      <td>{course}</td>
      <td>{average_package}</td>
      <td>{highest_package}</td>
      <td>{placement}</td>
      <td>{specialty}</td>
      <td>{ranking}</td>
    </tr>
  );
};

export default CollegeTable;