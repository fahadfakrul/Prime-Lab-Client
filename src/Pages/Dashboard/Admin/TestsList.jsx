import { FaTrashCan } from "react-icons/fa6";
import useTests from "../../../Hooks/useTests";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const TestsList = () => {
  const [tests] = useTests();

  const handleDeleteTest = async(test) => {}
  return (
    <div>
      <div className="overflow-x-auto p-20">
        <div>
          <p className="text-4xl  font-medium text-[#2d3663] ">All tests</p>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Date</th>
              <th>Slots left</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test,index)=> <tr key={test._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={test.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  
                </div>
              </td>
              <td>
                {test.title}
               
              </td>
              <td>{test.date}</td>
              <td>{test.slots}</td>
              <td>${test.price}</td>
              <td>
              <Link to={`/dashboard/updateTests/${test._id}`}><button
                      // onClick={() => handleUpdateItem(item)}
                      className="btn bg-[#2D3663] "
                    >
                      <FaEdit className="text-white"></FaEdit>
                    </button></Link>
              </td>
              <td>
              <button
                      onClick={() => handleDeleteTest(test)}
                      className="btn bg-[#d90429] "
                    >
                      <FaTrashCan className="text-white"></FaTrashCan>
                    </button>
              </td>
            </tr>)}
            
          </tbody>
         
        </table>
      </div>
    </div>
  );
};

export default TestsList;
